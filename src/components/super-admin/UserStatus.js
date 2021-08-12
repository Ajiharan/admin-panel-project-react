import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { selectusersIds } from "../../features/auth/userOnlineList";
import { selectuserslist } from "../../features/auth/userListSlice";
const UserStatus = () => {
  const userIds = useSelector(selectusersIds);
  const userList = useSelector(selectuserslist);
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    if (userList.length > 0) {
      setUserData(userList.filter((r) => userIds.includes(r.uid)));
    }
    // console.log(userIds);
  }, [userIds, userList]);
  return (
    <UserStatusList>
      {userData.map((res) => (
        <Wrap key={res.uid}>
          <img src={res.photoURL} alt="" />
          <div className="inner">
            <p>{res.displayName}</p>
          </div>
        </Wrap>
      ))}
    </UserStatusList>
  );
};

const UserStatusList = styled.div``;
const Wrap = styled.div``;
export default UserStatus;
