import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import {
  selectuserslist,
  selectLoading,
} from "../../features/auth/userListSlice";
const UserListContainer = () => {
  const [userData, setUserData] = useState([]);
  const userList = useSelector(selectuserslist);
  const userListLoading = useSelector(selectLoading);

  //   useEffect(() => {
  //     setUserData(userData);
  //     console.log("userList", userList);
  //   }, [userList]);

  return (
    <Container>
      {userListLoading && "loading"}
      {userList.map((res) => (
        <Wrap key={res.uid}>
          <p>{res.uid}</p>
          <p>{res.displayName}</p>
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
`;

const Wrap = styled.div``;

export default UserListContainer;
