import React from "react";
import styled from "styled-components";
import FormContainer from "./FormContainer";
const BodyContainer = () => {
  return (
    <ContainerBody>
      <div className="form-container">
        <FormContainer />
      </div>
      <div className="search"></div>
      <div className="userlist"></div>
      <div className="user-staus"></div>
    </ContainerBody>
  );
};

const ContainerBody = styled.div`
  display: grid;
  overflow-y: hidden;
  background-color: white;
  width: 100vw;
  min-height: calc(100vh - 60px);
  grid-template-rows: 0.1fr 1fr 0.6fr;
  background-color: #f2f2f2;
  padding: 10px;
  grid-template-areas:
    "form form  search"
    "form form userlist"
    "form form status";

  .form-container {
    border: 1px solid red;
    grid-area: form;
    padding: 5px;
  }

  .search {
    border: 1px solid red;
    grid-area: search;
    padding: 5px;
  }
  .userlist {
    border: 1px solid red;
    grid-area: userlist;
  }
  .user-staus {
    border: 1px solid red;
    grid-area: status;
  }
`;
export default BodyContainer;
