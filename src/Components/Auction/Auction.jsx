// src/AuctionList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AuctionCard from './AuctionCard';
import io from 'socket.io-client'
const Auction = () => {

  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    console.log("here");
    // Fetch auctions from the backend
    axios.get('http://localhost:8080/Auction/auctionsView')
      .then(response => {
        console.log(response);
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
   <div className='container bg-white rounded-3 p-2 my-5 shadow'>
     <div className="auction-list">
      <h1 className='text-warning fw-bold'>Upcoming Live Auctions</h1>
      <div className="auction-cards">
        {auctions.map((auction) => (
          <AuctionCard key={auction._id} auction={auction} />
        ))}
      </div>
    </div>
   </div>
  );
};

export default Auction;

