// src/AuctionCard.js
import React from "react";
import { Link } from "react-router-dom";

const AuctionCard = ({ auction }) => {
  const { _id, status, startingTime, endingTime, title, carId } = auction;
  const carImage =
    carId.images.length > 0 ? carId.images[0].secure_url : "default-image-url"; // Replace with a default image URL if necessary

  return (
    <div className="auction-card text-start shadow">
      <img src={carImage} alt="Car" className="car-image" />
      <h2 className="fw-bold text-center">{title}</h2>
      <p>
        <span className="fw-bold fs-5">Status</span>: <span className="fs-6 fw-bold text-body-tertiary">{status}</span>
      </p>
      <p>
        <span className="fw-bold fs-5">Starting Time: </span><br></br>
        <span className="fs-6 fw-bold text-body-tertiary">{startingTime}</span>
      </p>
      <p>
        <span className="fw-bold fs-5">Ending Time: </span> <br></br> <span className="fs-6 fw-bold text-body-tertiary">{endingTime}</span>
      </p>
      <Link to={`/Auction/${_id}`}>
        <button>Join Auction</button>
      </Link>
    </div>
  );
};

export default AuctionCard;
