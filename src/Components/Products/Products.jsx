import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import Loading from "../Loading/Loading";
import Product from "../Product/Product";
import Footer from './../Footer/Footer';

export default function Products() {
  let [loading, setLoading] = useState(true);
  const [newCar, setNewCar] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  async function fetchUsedCars(page) {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://backend-c6zw.onrender.com/car/newCars?page=${page}`
      );
      console.log(response);
      if (response.status === 200) {
        setNewCar(response.data.response);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching used cars:", error);
    }
  }

  useEffect(() => {
    fetchUsedCars(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) return <Loading />;

  return (
    <>
     <div className="container road text-light p-4 rounded-4 mt-5 d-flex">
      <img src="	https://media.hatla2eestatic.com/images/general/road.png"/>
      <div>
      <p>Shorten the road in less than 1 minute</p>
      <h2 className="text-light fw-bold">Sell your car faster than ever before</h2>
      <a className="p-3 bg-warning m-3 d-inline-block rounded-3 text-light fw-bold " href="/#/sellCar">Sell Your Car</a>
      </div>
    </div>
      <div className="container">
        <div className="home p-5">
          <div className="firstSection">
            <div className="my-5">
              <p className="titleHome">Last Added</p>
              <hr></hr>
            </div>
          </div>
          <div className="row">
            {newCar.map((item) => {
                return <Product item={item} key={item._id} />;
              })}
          </div>
          <div className="pagination">
            <button
              className="pagination-button px-2 border-0 rounded-2 "
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <i className="fas fa-chevron-left"></i> Previous
            </button>
            <span className="px-2 fw-bold">Page {currentPage}</span>
            <button
              className="pagination-button px-2 border-0 rounded-2 "
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}
