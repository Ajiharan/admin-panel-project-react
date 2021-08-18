import React from "react";
import styled from "styled-components";
import AdminEntry from "./AdminEntry";
import AdminEntryList from "./AdminEntryList";

const AminHomeContainer = () => {
  return (
    <Container>
      <AdminEntry />
      <AdminEntryList />
    </Container>
  );
};
const Container = styled.div`
  overflow-x: hidden;
`;

export default AminHomeContainer;
