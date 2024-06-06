// Modal.js
import React from "react";
import { useNavigate } from "react-router-dom";

const ModalLog = ({ show, onClose }) => {
  const navigate = useNavigate();

  if (!show) {
    return null;
  }

  const handleLoginRedirect = () => {
    onClose();
    navigate("/SignIn");
  };

  return (
    <div className="container">
      <div className="modal-overlayy">
        <div className="modal-contentt">
          <h2 className="fw-bold">Please Login</h2>
          <p>You need to login first to proceed.</p>
          <button className="btn bg-warning text-white fw-bold" onClick={handleLoginRedirect}>Go to Login</button>
        </div>
      </div>
    </div>
  );
};

export default ModalLog;
