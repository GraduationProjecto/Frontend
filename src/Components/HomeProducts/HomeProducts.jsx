import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import Loading from "../Loading/Loading";
import HomeProduct from './../HomeProduct/HomeProduct';

export default function HomeProducts() {

    let [loading, setLoading] = useState(true);
    const [usedCars, setUsedCars] = useState([]);

    async function fetchUsedCars() {
      setLoading(false);
      try {
        const response = await axios.get(`http://localhost:8080/car/usedCars?page=1`);
        if (response.status === 200) {
          setUsedCars(response.data.response);
          setLoading(true);
        }
      } catch (error) {
        console.error("Error fetching used cars:", error);
      }
    }

    useEffect(() => {
      fetchUsedCars();  
      }, []);
    
      if (!loading) return <Loading />;
    
  return (
    <>
       <div className="row">
        {usedCars.map((item) => {
            return <HomeProduct item={item} key={item._id} />;
          })}
      </div>
    </>
  )
}
