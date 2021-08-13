import React from "react";
import styled from "styled-components";
import SearchContainer from "../common/search/SearchContainer";
import FormContainer from "./FormContainer";
import UserListContainer from "./UserListContainer";
import UserStatus from "./UserStatus";
const BodyContainer = () => {
  const searchHandler = (value) => {};
  return (
    <ContainerBody>
      <div className="form-container">
        <FormContainer />
        <UserListContainer />
      </div>
      <div className="search">
        <SearchContainer
          onchange={searchHandler}
          placeholder="search by name"
        />
      </div>
      <div className="userlist">
        <UserStatus />
      </div>
    </ContainerBody>
  );
};

const ContainerBody = styled.div`
  display: grid;
  overflow-x: hidden;
  background-color: white;
  width: 100vw;
  min-height: calc(100vh - 60px);
  grid-template-rows: 0.1fr 1fr 0.7fr;
  grid-template-columns: 30vw 35vw 34.9vw;
  background-color: #f2f2f2;
  padding: 0.5rem 0;
  grid-template-areas:
    "form form  search"
    "form form userlist"
    "form form userlist";

  .form-container {
    grid-area: form;
    padding: 5px;
    display: flex;
  }

  .search {
    grid-area: search;
    padding: 1rem;
    margin-top: 5rem;
    background-color: white;
    box-shadow: 1px 1px 8px lightgray;
  }
  .userlist {
    grid-area: userlist;
    background-color: white;
  }
  @media only screen and (max-width: 1150px) {
    grid-template-columns: 35vw 35vw 29.9vw;
  }
  @media only screen and (max-width: 970px) {
    grid-template-rows: 0.32fr 0.4fr 0.1fr 0.3fr;
    grid-template-areas:
      "form form  form"
      "form form form"
      "search search ."
      "userlist userlist .";

    .search {
      grid-area: search;
      padding: 1rem;
      margin-top: 0.1rem;
      background-color: white;
      box-shadow: 1px 1px 8px lightgray;
    }
  }
`;
export default BodyContainer;
