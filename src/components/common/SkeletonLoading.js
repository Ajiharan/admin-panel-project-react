import React from "react";
import Skeleton from "react-loading-skeleton";
import styled from "styled-components";
const SkeletonLoading = () => {
  return (
    <SkeletonLoadingContainer>
      <Skeleton count={1} height="0.7rem" width="40%" />
      <Skeleton count={3} height="1rem" width="100%" />
      <Skeleton count={1} height="0.7rem" width="80%" />
    </SkeletonLoadingContainer>
  );
};

const SkeletonLoadingContainer = styled.div`
  width: 100%;
  display: block;
  flex-direction: row;
  margin-bottom: 1rem;
`;

export default SkeletonLoading;
