import React from "react";
import styled from "styled-components";
import LoadingIcon from "./LoadingIcon";
const LoadingSvg = () => {
  return (
    <LoadingContainer>
      <LoadingIcon />
    </LoadingContainer>
  );
};

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  background-color: lightgray;
`;
export default React.memo(LoadingSvg);
