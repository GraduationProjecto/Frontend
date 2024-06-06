import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

export default function RatingModal({ show, handleClose, handleSubmit }) {
  const [rating, setRating] = useState(0);

  const handleStarClick = (starIndex) => {
    setRating(starIndex + 1); // starIndex is 0-based, so add 1
  };

  const renderStars = () => {
    const totalStars = 5;
    return Array.from({ length: totalStars }, (_, index) => (
      <i
        key={index}
        className={`fa fa-star${index < rating ? "" : "-o"} text-warning`}
        onClick={() => handleStarClick(index)}
        style={{ cursor: "pointer", fontSize: "24px", marginRight: "4px" }}
      ></i>
    ));
  };

  const submitRating = () => {
    handleSubmit(rating);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Rate This Car</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex justify-content-center">{renderStars()}</div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={submitRating}>
          Submit Rating
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
