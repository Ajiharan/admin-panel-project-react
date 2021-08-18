import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { TiUpload } from "react-icons/all";
const AdminEntry = () => {
  const [images, setImages] = useState([]);
  const [fileObj, setFileObj] = useState([]);

  const uploadSingleFile = (e) => {
    setFileObj([...e.target.files]);
    // console.log(fileObj);
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
      <UploadForm>
        <label htmlFor="upload" className="AddProduct__file">
          <TiUpload className="upload-image" />
          <input
            type="file"
            id="upload"
            multiple
            className="form-control"
            onChange={uploadSingleFile}
          />
        </label>
        <button>Upload</button>
      </UploadForm>
    </Upload>
  );
};

const Upload = styled.div``;
const UploadImages = styled.div`
  margin-top: 1rem;
  border: 1px solid lightcoral;
  border-radius: 8px;
  display: flex;
  flex-wrap: wrap;
  padding: 1rem;
  margin-left: 0.1rem;
  width: 50%;
  height: 100%;
  .outfit-layer {
  }
  img {
    min-width: 10rem;
    width: 14rem;
    min-height: 10rem;
    height: 15rem;
    margin-top: 0.5rem;
    margin-right: 1rem;
    object-fit: contain;
  }
`;
const UploadForm = styled.form`
  .AddProduct__file {
    padding: 10px;
    background-color: coral;
    display: flex;
    margin: 1rem 0.5rem;
    box-shadow: 1px 1px 10px #141524;
    border-radius: 10px;
    width: 60px;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    #upload {
      display: none;
    }
    .upload-image {
      font-size: 1.3rem;
      color: white;
    }
  }
`;
export default AdminEntry;
