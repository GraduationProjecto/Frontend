// src/AuctionList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AuctionCard from './AuctionCard';
import io from 'socket.io-client'
const AuctionList = () => {

  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    // Fetch auctions from the backend
    axios.get('https://92aa-196-221-4-9.ngrok-free.app/auction/auctionsView')
      .then(response => {
        setAuctions(response.data.response);
      })
      .catch(error => {
        console.error('Error fetching auctions:', error);
      });

    // Set up Socket.IO connection
    const socket = io('http://localhost:8080');

    socket.on('connect', () => {
      console.log('Connected to Socket.IO server');
    });

    socket.on('newAuction', (newAuction) => {
      setAuctions((prevAuctions) => [...prevAuctions, newAuction]);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from Socket.IO server');
    });

    socket.on('connect_error', (error) => {
      console.error('Socket.IO connection error:', error);
    });

    // Clean up Socket.IO connection when the component is unmounted
    return () => {
      socket.disconnect();
    };

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

export default AuctionList;

