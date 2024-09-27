import React from "react";

const ConfirmationModal = ({ onConfirm, onClose }) => {
  return (
    <div className="modal">
      <h2>Are you sure you want to delete this task?</h2>
      <button className="save-btn" onClick={onConfirm}>
        Yes
      </button>
      <button className="cancel-btn" onClick={onClose}>
        No
      </button>
    </div>
  );
};

export default ConfirmationModal;
