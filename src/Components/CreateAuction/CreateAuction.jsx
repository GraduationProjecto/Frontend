// src/CreateAuction.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const CreateAuction = () => {
    let {id } = useParams()
    console.log(id);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startingPrice: '',
    startingTime: '',
    endingTime: ''
  });
  let navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        formData.startingPrice = Number(formData.startingPrice)
        console.log(formData);
      const response = await axios.post(`http://localhost:8080/auction/createAuction/${id}`, formData,  {
        headers: {
          authorization: `Bearer__${localStorage.getItem("token")}`,
        },
      });
      navigate('/Auction')
      console.log('Auction created:', response.data);
    } catch (error) {
      console.error('Error creating auction:', error);
    }
  };

  return (
    <div className="create-auction">
      <h2>Create a Car Auction</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="startingPrice">Starting Price</label>
          <input
            type="number"
            id="startingPrice"
            name="startingPrice"
            value={formData.startingPrice}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="startingTime">Start Date</label>
          <input
            type="datetime-local"
            id="startingTime"
            name="startingTime"
            value={formData.startingTime}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="endingTime">End Date</label>
          <input
            type="datetime-local"
            id="endingTime"
            name="endingTime"
            value={formData.endingTime}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="create-auction-button">Create Auction</button>
      </form>
    </div>
  );
};

export default CreateAuction;
