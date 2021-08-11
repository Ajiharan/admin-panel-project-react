import React from "react";
import styled from "styled-components";

const LoadingIcon = () => {
  return (
    <Wrap>
      <img src="/images/spinner.svg" alt="spinner" className="spinner" />
    </Wrap>
  );
};
const Wrap = styled.div`
  .spinner {
    width: 50px;
    object-fit: contain;
    color: gray;
    animation: spinner 0.8s linear infinite;
  }

  @keyframes spinner {
    to {
      transform: rotate(360deg);
    }
  }
`;
export default LoadingIcon;
