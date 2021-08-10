import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {
  selectuserslist,
  selectLoading,
} from "../../features/auth/userListSlice";
import Button from "../../components/common/Button";
import axios from "../../Axios";

import { getAllUsers } from "../../features/auth/userAction";
import { toast } from "react-hot-toast";
import { setLoadingDefault } from "../../features/auth/userListSlice";
const UserListContainer = () => {
  const [userData, setUserData] = useState([]);
  const userList = useSelector(selectuserslist);
  const userListLoading = useSelector(selectLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userList.length > 0) {
      setUserData(userList);
    }
  }, [userList]);

  const deactivateAccount = (uid, isDisable) => {
    console.log(uid);
    dispatch(setLoadingDefault());
    axios
      .post(
        "user/disable",
        { uid, isDisable },
        {
          headers: {
            adminToken: JSON.parse(localStorage.getItem("auth_admin")),
          },
        }
      )
      .then((res) => {
        dispatch(getAllUsers());
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  };

  return (
    <Container>
      <h4 className="mt-4">{userListLoading ? "loading" : "user lists"}</h4>
      {userData.map((res) => (
        <Wrap key={res.uid}>
          <img src={res.photoURL} alt="" />
          <div className="inner">
            <p>{res.displayName}</p>
            <p>{res.email}</p>
            <p>{res.uid}</p>
          </div>
          <div className="inner-button">
            <Button
              children={`${res.disabled ? "Activate" : "Deactivate"}`}
              buttonColor={`${res.disabled ? "#00bfff" : "coral"}`}
              disabled={userListLoading}
              onclick={() => {
                deactivateAccount(res.uid, !res.disabled);
              }}
            />
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
  .mt-4 {
    margin: 10px 0;
    letter-spacing: 1px;
    text-transform: uppercase;
  }
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
    p {
      letter-spacing: 0.8px;
    }
  }
  .inner-button {
  }
`;

export default UserListContainer;
