import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import Loading from "../Loading/Loading";
import HomeNewCar from './../HomeNewCar/HomeNewCar';

export default function HomeNewCars() {
    let [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [newCar, setNewCar] = useState([]);

    async function fetchNewCars(page) {
      setLoading(false);
      try {
        const response = await axios.get(
          `https://backend-c6zw.onrender.com/car/newCars?page=2`
        );
        console.log(response);
        if (response.status === 200) {
          setNewCar(response.data.response);
          setLoading(true);
        }
      } catch (error) {
        console.error("Error fetching used cars:", error);
      }
    }

    useEffect(() => {
      fetchNewCars();
      }, []);
    
      if (!loading) return <Loading />;
    
  return (
    <>
       <div className="row">
        {newCar.map((item) => {
            return <HomeNewCar item={item} key={item._id} />;
          })}
      </div>
    </>
  )
}
