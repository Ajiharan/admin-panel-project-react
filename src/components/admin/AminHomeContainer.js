import React, { useState } from "react";
import styled from "styled-components";
import LodingModal from "../common/LodingModal";
import AdminEntry from "./AdminEntry";
import AdminEntryList from "./AdminEntryList";

const AminHomeContainer = () => {
  const [loading, setLoading] = useState(false);

  return (
    <React.Fragment>
      {loading && (
        <LodingModal show={loading} message="updating user entries.." />
      )}
      <Container>
        <AdminEntry loading={loading} setLoading={setLoading} />
        <AdminEntryList />
      </Container>
    </React.Fragment>
  );
};
const Container = styled.div`
  overflow-x: hidden;
`;

export default AminHomeContainer;
