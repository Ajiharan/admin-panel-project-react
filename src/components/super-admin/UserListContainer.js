import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import {
  selectuserslist,
  selectLoading,
} from "../../features/auth/userListSlice";
import Button from "../../components/common/Button";
const UserListContainer = () => {
  const [userData, setUserData] = useState([]);
  const userList = useSelector(selectuserslist);
  const userListLoading = useSelector(selectLoading);

  useEffect(() => {
    if (userList.length > 0) {
      setUserData(userList);
    }
  }, [userList]);

  return (
    <Container>
      {userListLoading && "loading"}
      {userData.map((res) => (
        <Wrap key={res.uid}>
          <img src={res.photoURL} alt="" />
          <div className="inner">
            <p>{res.displayName}</p>
            <p>{res.email}</p>
            <p>{res.uid}</p>
          </div>
          <div className="inner-button">
            <Button children="Deactivate Account" buttonColor="coral" />
          </div>
        </Wrap>
      ))}
    </Container>
  );
};

const Container = styled.div`
  background-color: #f2f3f2;
  border: 1px solid lightgray;
  min-height: 30rem;
  max-height: calc(100vh - 70px);
  flex: 1 1;
  margin-left: 1rem;
  padding: 0.5rem;
`;

const Wrap = styled.div`
  display: flex;
  padding: 0.5rem;
  box-shadow: 1px 2px 5px lightgray;
  margin-bottom: 1rem;
  align-items: center;
  border-bottom: 1px solid lightgray;
  color: gray;
  cursor: pointer;
  background-image: white;
  img {
    width: 50px;
    height: 50px;
    object-fit: contain;
    margin-right: 10px;
    border-radius: 50%;
    border: 1px solid gray;
    padding: 2px;
  }
  .inner {
    flex: 1 1;
  }
  .inner-button {
  }
`;

export default UserListContainer;
