import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { TiUpload } from "react-icons/all";
import useAdminHandler from "../useHooks/useAdminHandler";
import Button from "../common/Button";
import { storage } from "../../Firebase";
import { useSelector, useDispatch } from "react-redux";
import {
  selectDataError,
  selectEntryData,
  selectDataLoading,
  resetData,
} from "../../features/admin/AdminSlice";
import { selectUid } from "../../features/auth/UserSlice";
import toast from "react-hot-toast";
const AdminEntry = ({ loading, setLoading }) => {
  const [images, setImages] = useState([]);
  const [fileObj, setFileObj] = useState([]);
  const dispatch = useDispatch();

  const userId = useSelector(selectUid);
  const dataError = useSelector(selectDataError);
  const entryData = useSelector(selectEntryData);
  const dataloading = useSelector(selectDataLoading);

  const { formik } = useAdminHandler(
    fileObj,
    setFileObj,
    setImages,
    storage,
    userId,
    setLoading
  );

  useEffect(() => {
    if ((dataError !== null || entryData !== null) && !dataloading) {
      setLoading(false);
      if (dataError) {
        toast.error("Oops something wrong");
      } else {
        toast.success("entry sucessfully updated");
      }
      dispatch(resetData());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataError, entryData, dataloading]);

  const uploadSingleFile = (e) => {
    setFileObj([...e.target.files]);
  };
  useEffect(() => {
    setImages(fileObj.map((data) => URL.createObjectURL(data)));
  }, [fileObj]);

  return (
    <Upload>
      <UploadImages>
        {images.length > 0 &&
          images.map((imageUrl, i) => <img src={imageUrl} alt="Nic" key={i} />)}
      </UploadImages>
      <UploadForm onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="upload" className="AddProduct__file">
            Upload
            <TiUpload className="upload-image" />
            <input
              type="file"
              id="upload"
              multiple
              name="upimage"
              className="form-control"
              onChange={(e) => {
                const files = e.target.files;
                let myFiles = Array.from(files);
                formik.setFieldValue("upimage", myFiles);
                uploadSingleFile(e);
              }}
            />
          </label>
          {formik.touched.upimage && formik.errors.upimage ? (
            <p>{formik.errors.upimage}</p>
          ) : (
            <p style={{ opacity: 0 }}>{"null"}</p>
          )}
        </div>
        <div className="form-group">
          <label>First Name</label>
          <input name="fname" type="text" {...formik.getFieldProps("fname")} />
          {formik.touched.fname && formik.errors.fname ? (
            <p>{formik.errors.fname}</p>
          ) : (
            <p style={{ opacity: 0 }}>{"null"}</p>
          )}
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input name="lname" type="text" {...formik.getFieldProps("lname")} />
          {formik.touched.lname && formik.errors.lname ? (
            <p>{formik.errors.lname}</p>
          ) : (
            <p style={{ opacity: 0 }}>{"null"}</p>
          )}
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input name="pno" type="number" {...formik.getFieldProps("pno")} />
          {formik.touched.pno && formik.errors.pno ? (
            <p>{formik.errors.pno}</p>
          ) : (
            <p style={{ opacity: 0 }}>{"null"}</p>
          )}
        </div>
        <div className="form-group">
          <label>Address</label>
          <textarea {...formik.getFieldProps("address")} />
          {formik.touched.address && formik.errors.address ? (
            <p>{formik.errors.address}</p>
          ) : (
            <p style={{ opacity: 0 }}>{"null"}</p>
          )}
        </div>
        <Button type="submit" buttonSize="primary" children="Add Entry" />
      </UploadForm>
    </Upload>
  );
};

const Upload = styled.div`
  overflow-x: hidden;
  margin: 1rem 1rem;
  width: 70vw;
  @media only screen and (max-width: 980px) {
    width: 70vw;
  }
  @media only screen and (max-width: 800px) {
    width: 100vw;
  }
`;
const UploadImages = styled.div`
  margin-top: 1rem;
  background-color: lightgray;
  border-top: 1px solid lightgray;
  border-right: 1px solid lightgray;
  border-left: 1px solid lightgray;
  display: flex;
  flex-wrap: wrap;
  padding: 1rem;
  @media only screen and (max-width: 980px) {
    margin-top: 0.8rem;
    padding: 0.8rem;
  }

  .outfit-layer {
  }
  img {
    flex: 1;
    min-width: 10rem;
    width: 14rem;
    min-height: 10rem;
    height: 15rem;
    margin-top: 0.5rem;
    margin-right: 1rem;
    object-fit: contain;
    @media only screen and (max-width: 980px) {
      min-width: 9rem;
      width: 12rem;
      min-height: 8rem;
      height: 13rem;
    }
  }
`;
const UploadForm = styled.form`
  border-bottom: 1px solid lightgray;
  border-right: 1px solid lightgray;
  border-left: 1px solid lightgray;
  padding: 1rem;
  .form-group {
    display: flex;
    flex-direction: column;
    padding: 0.5rem;
    input,
    textarea {
      border: 1px solid lightgray;
      padding: 0.5rem;
      margin: 0.5rem 0;
      border-radius: 5px;
      &:focus {
        outline: none;
      }
    }
    label:not(.AddProduct__file) {
      font-size: 1.1rem;
    }
    p {
      color: red;
      font-weight: 500;
    }
  }
  @media only screen and (max-width: 980px) {
    .form-group {
      padding: 0.38rem;
      input,
      textarea {
        border: 1px solid lightgray;
        padding: 0.4rem;
        margin: 0.4rem 0;
      }
      label:not(.AddProduct__file) {
        font-size: 0.9rem;
      }
    }
  }
  .AddProduct__file {
    color: white;
    padding: 2px;
    background-color: coral;
    display: flex;
    margin: 1rem 0.5rem;
    box-shadow: 0.5px 0.5px 4px #141524;
    border-radius: 5%;
    width: 120px;
    font-size: 0.9rem;
    height: 30px;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    #upload {
      display: none;
    }
    .upload-image {
      font-size: 1.1rem;
      color: white;
    }
    @media only screen and (max-width: 980px) {
      width: 100px;
      margin: 0.9rem 0.4rem;
      font-size: 0.78rem;
    }
  }
`;
export default AdminEntry;
