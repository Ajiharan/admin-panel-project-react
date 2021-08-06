import React from "react";
import { Modal, Spinner } from "react-bootstrap";
import "./LoadingModal.css";
const LodingModal = ({
  show,
  message = "Please wait we are checking your creditionals...",
  width = "100%",
}) => {
  return (
    <Modal
      show={show}
      backdrop="static"
      keyboard={false}
      centered
      dialogClassName="loadingModal"
      style={{ width: width }}
    >
      <Modal.Body>
        <div className="modalContainer__body">
          <Spinner animation="border" role="status" className="text-warning">
            <span className="sr-only">Loading...</span>
          </Spinner>
          <p className="text-lead fw-bold text-warning">{message}</p>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default LodingModal;
