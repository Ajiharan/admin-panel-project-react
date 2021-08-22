import React from "react";
import AminHomeContainer from "../admin/AminHomeContainer";
import Header from "../header/Header";

const EntryComponent = () => {
  return (
    <React.Fragment>
      <Header />
      <AminHomeContainer userlevel={1} />
    </React.Fragment>
  );
};

export default EntryComponent;
