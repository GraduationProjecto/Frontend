// src/AuctionCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const AuctionCard = ({ auction }) => {
  const { _id, status, startingTime, endingTime, title, carId } = auction;
  const carImage = carId.images.length > 0 ? carId.images[0].secure_url : 'default-image-url'; // Replace with a default image URL if necessary

  return (
    <div className="auction-card">
      <img src={carImage} alt="Car" className="car-image" />
      <h2>{title}</h2>
      <p>Status: {status}</p>
      <p>Starting Time: {startingTime}</p>
      <p>Ending Time: {endingTime}</p>
      <Link to={`/Auction/${_id}`}>
        <button>Join Auction</button>
      </Link>
    </div>
  );
};

export default AuctionCard;
