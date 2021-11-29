import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { selectSearchData } from "../../features/auth/searchSlice";

const UserStatus = () => {
  const searchData = useSelector(selectSearchData);

  return (
    <UserStatusList>
      <h4>online status</h4>
      <Container>
        {searchData?.map((res) => (
          <Wrap key={res.uid}>
            <span></span>
            <img src={res.photoURL} alt="" loading="lazy" />
            <div className="inner">
              <p>{res.displayName}</p>
            </div>
          </Wrap>
        ))}
      </Container>
    </UserStatusList>
  );
};

const UserStatusList = styled.div`
  display: flex;
  align-content: center;
  width: 100%;
  flex-direction: column;

  h4 {
    align-self: center;
  }
`;
const Wrap = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  width: 96%;

  border: 1px solid lightgray;
  background-color: white;
  margin: 5px 10px;
  border-radius: 10px;
  span {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: green;
    margin-right: 10px;
  }
  img {
    width: 35px;
    height: 35px;
    padding: 2px;
    object-fit: contain;
    border-radius: 50%;
    margin-right: 10px;
    border: 1px solid lightgray;
  }
`;
const Container = styled.div``;
export default React.memo(UserStatus);
