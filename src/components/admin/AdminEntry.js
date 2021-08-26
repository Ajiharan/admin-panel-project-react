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
  selectEntryUpdateData,
  selectUpdateDataError,
  selectUpdateDataLoading,
  resetupdateData,
} from "../../features/admin/AdminSlice";
import { selectUid } from "../../features/auth/UserSlice";
import toast from "react-hot-toast";
import { selectEntryDatas } from "../../features/admin/AdminEntrySlice";
const AdminEntry = ({
  loading,
  setLoading,
  formData,
  eid,
  isUpdate,
  setEid,
  setisUpdate,
}) => {
  const [images, setImages] = useState([]);
  const [fileObj, setFileObj] = useState([]);
  const dispatch = useDispatch();

  const userId = useSelector(selectUid);
  const dataError = useSelector(selectDataError);
  const entryData = useSelector(selectEntryData);
  const dataloading = useSelector(selectDataLoading);
  const entries = useSelector(selectEntryDatas);

  const UpdatedataError = useSelector(selectUpdateDataError);
  const UpdateentryData = useSelector(selectEntryUpdateData);
  const Updatedataloading = useSelector(selectUpdateDataLoading);

  const { formik } = useAdminHandler(
    fileObj,
    setFileObj,
    setImages,
    storage,
    userId,
    setLoading,
    isUpdate,
    eid
  );

  useEffect(() => {
    formik.setValues(formData);
    if (entries.find(({ id }) => id === eid)?.entry?.imageArr.length > 0) {
      setImages(entries.find(({ id }) => id === eid)?.entry?.imageArr);
    } else {
      setImages([]);
    }
  }, [formData]);

  useEffect(() => {
    if ((dataError !== null || entryData !== null) && !dataloading) {
      setLoading(false);
      if (dataError) {
        toast.error("Oops something wrong");
      } else {
        toast.success("entry sucessfully updated");
      }
      dispatch(resetData());
    } else if (
      (UpdatedataError !== null || UpdateentryData !== null) &&
      !Updatedataloading
    ) {
      setLoading(false);
      setisUpdate(false);
      formik.resetForm({});
      if (UpdatedataError) {
        toast.error("Oops something wrong");
      } else {
        toast.success("entry sucessfully updated");
      }
      dispatch(resetupdateData());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    dataError,
    entryData,
    dataloading,
    UpdatedataError,
    Updatedataloading,
    UpdateentryData,
  ]);

  const uploadSingleFile = (e) => {
    setFileObj([...e.target.files]);
  };
  useEffect(() => {
    // console.log(
    //   "fileObjsssss",
    //   fileObj.map((data) => URL.createObjectURL(data))
    // );
    setImages(fileObj.map((data) => URL.createObjectURL(data)));
  }, [fileObj]);

  const cancelHandler = () => {
    console.log("triggered");
    setEid(null);
    setImages([]);
    setisUpdate(false);
    formik.resetForm({});
  };
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
          <input name="fname" placeholder='eg:-peter' type="text" {...formik.getFieldProps("fname")} />
          {formik.touched.fname && formik.errors.fname ? (
            <p>{formik.errors.fname}</p>
          ) : (
            <p style={{ opacity: 0 }}>{"null"}</p>
          )}
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input name="lname" placeholder='eg:-parker' type="text" {...formik.getFieldProps("lname")} />
          {formik.touched.lname && formik.errors.lname ? (
            <p>{formik.errors.lname}</p>
          ) : (
            <p style={{ opacity: 0 }}>{"null"}</p>
          )}
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input name="pno" placeholder='eg:-772599631' type="number" {...formik.getFieldProps("pno")} />
          {formik.touched.pno && formik.errors.pno ? (
            <p>{formik.errors.pno}</p>
          ) : (
            <p style={{ opacity: 0 }}>{"null"}</p>
          )}
        </div>
        <div className="form-group">
          <label>Address</label>
          <textarea placeholder='eg:-Washington Dc,America' {...formik.getFieldProps("address")} />
          {formik.touched.address && formik.errors.address ? (
            <p>{formik.errors.address}</p>
          ) : (
            <p style={{ opacity: 0 }}>{"null"}</p>
          )}
        </div>
        <div className="btn-grp">
          <Button
            type="submit"
            buttonColor={isUpdate && "coral"}
            buttonSize="primary"
            children={isUpdate ? "Update" : "Add Entry"}
          />
          {isUpdate && (
            <Button
              type="button"
              buttonColor="#62ea62"
              buttonSize="primary"
              children="Cancel"
              onclick={cancelHandler}
            />
          )}
        </div>
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
    @media only screen and (max-width: 780px) {
      min-width: 8rem;
      width: 11rem;
      min-height: 7rem;
      height: 12rem;
    }
    @media only screen and (max-width: 480px) {
      min-width: 6rem;
      width: 9rem;
      min-height: 6.5rem;
      height: 10rem;
    }
  }
`;
const UploadForm = styled.form`
  border-bottom: 1px solid lightgray;
  border-right: 1px solid lightgray;
  border-left: 1px solid lightgray;
  padding: 1rem;
  .btn-grp {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    button {
      margin-top: 0.25rem;
      margin-right: 0.1rem;
    }
  }
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
  @media only screen and (max-width: 780px) {
    .form-group {
      padding: 0.28rem;
      input,
      textarea {
        border: 1px solid lightgray;
        padding: 0.28rem;
        margin: 0.3rem 0;
      }
      label:not(.AddProduct__file) {
        font-size: 0.75rem;
      }
    }
  }
  @media only screen and (max-width: 480px) {
    .form-group {
      padding: 0.25rem;
      input,
      textarea {
        border: 1px solid lightgray;
        padding: 0.2rem;
        margin: 0.3rem 0;
      }
      label:not(.AddProduct__file) {
        font-size: 0.65rem;
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
    @media only screen and (max-width: 780px) {
      width: 80px;
      margin: 0.7rem 0.3rem;
      font-size: 0.65rem;
    }
    @media only screen and (max-width: 480px) {
      width: 60px;
      margin: 0.55rem 0.28rem;
      font-size: 0.6rem;
    }
  }
`;
export default AdminEntry;
