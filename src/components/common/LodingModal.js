import React from "react";
import { Modal } from "react-bootstrap";

import "./LoadingModal.css";

const LodingModal = ({
  show,
  message = "Please wait we are checking your creditionals...",
  width = "100%",
  height = "auto",
}) => {
  return (
    <Modal
      show={show}
      backdrop="static"
      keyboard={false}
      centered
      dialogClassName="loadingModal"
      style={{ width: width, height: height }}
    >
      <Modal.Body>
        <div className="modalContainer__body">
          <p>loading...</p>
          <p className="text-lead fw-bold text-warning">{message}</p>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default LodingModal;
