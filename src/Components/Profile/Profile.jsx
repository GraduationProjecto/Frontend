// src/UserProfile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/user/profile', {
          headers: {
            authorization:` Bearer__${localStorage.getItem("token")}`,
          },
        }); 
        setUserData(response.data.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  const handleCreateAuction = (carId) => {
    navigate(`/CreateAuction/${carId}`); // Navigate to CreateAuction with carId
  };

  return (
    <div className="user-profile">
      <div className="user-info">
        <div>
          <h2>{userData.name}</h2>
          <p>{userData.Phone || "+0201554247304"}</p>
        </div>
      </div>
      <div className="cars-for-sale">
        <h3>Used Cars for Sale</h3>
        <div className="car-list">
          {userData.userCars.map((car) => (
            <div className="car-card" key={car._id}>
              {car.images && car.images.length > 0 ? (
                <img src={car.images[0].secure_url} alt={car.title} className="car-image" />
              ) : (
                <img src="default-car-image-url" alt="Default Car" className="car-image" />
              )}
              <h4>{car.modelCar} ({car.year})</h4>
              <p><strong>Price:</strong> ${car.price}</p>
              <p><strong>Km:</strong> {car.Km}</p>
              <p><strong>Transmission:</strong> {car.Transmission}</p>
              <p><strong>Fuel:</strong> {car.fuel}</p>
              <p><strong>Additional Notes:</strong> {car.AdditionalNotes}</p>
              <p><strong>City:</strong> {car.city}</p>
              <button onClick={() => handleCreateAuction(car._id)}>Create Auction</button> 
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
