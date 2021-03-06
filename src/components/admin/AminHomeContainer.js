import React, { useState } from "react";
import styled from "styled-components";
import LodingModal from "../common/LodingModal";
import AdminEntry from "./AdminEntry";
import AdminEntryList from "./AdminEntryList";

const AminHomeContainer = ({ userlevel }) => {
  const [loading, setLoading] = useState(false);
  const [eid, setEid] = useState(null);
  const [isUpdate, setisUpdate] = useState(false);
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    pno: "",
    upimage: [],
    address: "",
  });
  return (
    <React.Fragment>
      {loading && (
        <LodingModal show={loading} message="updating user entries.." />
      )}
      <Container>
        {!userlevel && (
          <AdminEntry
            loading={loading}
            setLoading={setLoading}
            formData={formData}
            eid={eid}
            isUpdate={isUpdate}
            setEid={setEid}
            setisUpdate={setisUpdate}
          />
        )}

        <AdminEntryList
          setisUpdate={setisUpdate}
          setFormData={setFormData}
          setEid={setEid}
          userlevel={userlevel}
        />
      </Container>
    </React.Fragment>
  );
};
const Container = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: hidden;
  margin-top: 3rem;

  @media only screen and (max-width: 800px) {
    flex-wrap: wrap;
  }
`;

export default AminHomeContainer;
