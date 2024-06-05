// src/AuctionDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const AuctionDetails = () => {
  const { id } = useParams();
  const [auction, setAuction] = useState(null);
console.log(id);
  useEffect(() => {
    // Fetch auction details from the backend
    axios.get(`http://localhost:8080/auction/specificAuction/${id}`)
      .then(response => {
        console.log(response);
        setAuction(response.data.response);
      })
      .catch(error => {
        console.error('Error fetching auction details:', error);
      });
  }, [id]);

  if (!auction) {
    return <div>Loading...</div>;
  }

  const { status, startingTime, endingTime, title, description, startingPrice, carId } = auction;
  const carImages = carId.images.map((img, index) => (
    <img key={index} src={img.secure_url} alt={`Car ${index}`} className="car-image" />
  ));

  return (
    <div className="auction-details">
      <h2>{title}</h2>
      <p>Status: {status}</p>
      <p>Starting Time: {startingTime}</p>
      <p>Ending Time: {endingTime}</p>
      <p>Starting Price: ${startingPrice}</p>
      <p>Description: {description}</p>
      <div className="car-images">
        {carImages}
      </div>
    </div>
  );
};

export default AuctionDetails;
