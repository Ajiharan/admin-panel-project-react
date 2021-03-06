import React, { useState, useEffect, useLayoutEffect } from "react";
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
import SearchContainer from "../common/search/SearchContainer";
import { AiFillDelete } from "react-icons/all";
import SkeletonLoading from "../common/SkeletonLoading";
import Skeleton from "react-loading-skeleton";
const UserListContainer = () => {
  const [userData, setUserData] = useState([]);
  const userList = useSelector(selectuserslist);
  const userListLoading = useSelector(selectLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("userListLoading", userListLoading);
    if (userList.length > 0) {
      setUserData(userList);
    }
  }, [userList]);

  const deactivateAccount = (uid, isDisable) => {
    // console.log(uid);
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

  const onchange = (value) => {
    // console.log(value.toLowerCase());
    if (value !== "") {
      const searchData = userData.filter(
        (res) =>
          res.displayName.toLowerCase().match(value.toLowerCase()) ||
          res.email.toLowerCase().match(value.toLowerCase())
      );
      setUserData(searchData);
    } else {
      setUserData(userList);
    }
  };

  return (
    <Container>
      {userListLoading ? (
        <Skeleton width="100%" height="3rem" />
      ) : (
        <div className="top-header">
          <h4 className="mt-4">{`user lists: (${userData.length})`}</h4>
          <SearchContainer onchange={onchange} />
        </div>
      )}

      <div className="list-container">
        {userData.length === 0 && !userListLoading && (
          <p className="no-record-found">!!Oops no records found</p>
        )}
        {userListLoading ? (
          <React.Fragment>
            <SkeletonLoading />
            <SkeletonLoading />
            <SkeletonLoading />
          </React.Fragment>
        ) : (
          userData.map((res) => (
            <Wrap key={res.uid}>
              <img src={res.photoURL} loading="lazy" alt="" />
              <div className="inner">
                <p>{res.displayName}</p>
                <p>{res.email}</p>
                <p>{res.uid}</p>
              </div>
              <div className="inner-button">
                <div className="text-btn">
                  <Button
                    children={`${res.disabled ? "Activate" : "Deactivate"}`}
                    buttonColor={`${res.disabled ? "#00bfff" : "coral"}`}
                    disabled={userListLoading}
                    onclick={() => {
                      deactivateAccount(res.uid, !res.disabled);
                    }}
                  />
                </div>

                <div className="icon-btn">
                  <Button
                    children={`${res.disabled ? "Activate" : "Deactivate"}`}
                    buttonColor={`${res.disabled ? "#00bfff" : "coral"}`}
                    disabled={userListLoading}
                    childrenIcon={
                      res.disabled ? <AiFillDelete /> : <AiFillDelete />
                    }
                    onclick={() => {
                      deactivateAccount(res.uid, !res.disabled);
                    }}
                  />
                </div>
              </div>
            </Wrap>
          ))
        )}
      </div>
    </Container>
  );
};

const Container = styled.div`
  background-color: #fcfcfc;
  border: 1px solid #fcfcfc;
  min-height: 30rem;

  max-height: calc(100vh - 70px);
  flex: 1 2;
  margin-left: 1rem;
  padding: 0.5rem;

  .top-header {
    display: flex;
    width: 100%;
    align-items: center;
    margin: 10px 0;
    .mt-4 {
      letter-spacing: 1px;
      text-transform: uppercase;
      margin-right: 10px;
    }
  }

  .list-container {
    overflow-y: scroll;
    overflow-x: hidden;
    max-height: 70vh;
    .no-record-found {
      display: flex;
      justify-content: center;
      align-items: center;
      color: red;
    }
  }

  .list-container {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none;
    &::-webkit-scrollbar {
      width: 5px;

      &::-webkit-scrollbar-thumb {
        background-color: #888;
      }

      /* Handle on hover */

      &::-webkit-scrollbar-track {
        background: #f1f1f1;
      }
    }
  }

  .list-container {
    /* Firefox */
  }
  @media only screen and (max-width: 460px) {
    /* max-width: 35rem;
    min-width: 25rem; */
    margin-left: 0rem;
    .mt-4 {
      display: none;
    }
  }
`;

const Wrap = styled.div`
  display: flex;
  flex: 1 1;
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
    .icon-btn {
      display: none;
    }
    @media only screen and (max-width: 460px) {
      .icon-btn {
        display: block;
      }
      .text-btn {
        display: none;
      }
    }
  }
  @media only screen and (max-width: 1150px) {
    img {
      width: 40px;
      height: 40px;
    }
    .inner {
      p {
        letter-spacing: 0.4px;
        font-size: 0.9rem;
      }
    }
  }
  @media only screen and (max-width: 460px) {
    img {
      width: 30px;
      height: 30px;
    }
    .inner {
      p {
        letter-spacing: 0.15px;
        font-size: 0.6rem;
      }
    }
  }
`;

export default React.memo(UserListContainer);
