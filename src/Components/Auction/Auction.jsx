// src/AuctionList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AuctionCard from './AuctionCard';

const Auction = () => {
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    // Fetch auctions from the backend
    axios.get('http://localhost:8080/auction/auctionsView')
      .then(response => {
        setAuctions(response.data.response);
      })
      .catch(error => {
        console.error('Error fetching auctions:', error);
      });
  }, []);

  return (
    <div className="auction-list">
      <h1>Upcoming Live Auctions</h1>
      <div className="auction-cards">
        {auctions.map((auction) => (
          <AuctionCard key={auction._id} auction={auction} />
        ))}
      </div>
    </div>
  );
};

export default Auction;
