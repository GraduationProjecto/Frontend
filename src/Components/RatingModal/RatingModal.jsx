import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

export default function RatingModal({ show, handleClose, handleSubmit }) {
  const [rating, setRating] = useState(0);

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
        <Form>
          <Form.Group>
            <Form.Label>Rating</Form.Label>
            <Form.Control
              type="number"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              min="1"
              max="5"
            />
          </Form.Group>
        </Form>
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
