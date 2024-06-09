import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import UsedCar from "./../UsedCar/UsedCar";
import Footer from './../Footer/Footer';

export default function UsedCars() {
  const [usedCars, setUsedCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { id } = useParams();
  const location = useLocation();

  useEffect(() => {
    if (id) {
      fetchUsedCarsByBrand(id);
    } else if (location.state && location.state.response) {
      setUsedCars(location.state.response);
      setLoading(false);
    } else {
      fetchUsedCars(currentPage);
    }
  }, [currentPage, location.state, id]);

  async function fetchUsedCarsByBrand(brandId) {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8080/car/allCarsUsed/${brandId}`);
      if (response.status === 200) {
        setUsedCars(response.data.response);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching used cars by brand:", error);
    }
  }

  async function fetchUsedCars(page) {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8080/car/usedCars?page=${page}`);
      if (response.status === 200) {
        setUsedCars(response.data.response);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching used cars:", error);
    }
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  if (loading) return <Loading />;

  return (
    <>
      <div className="container road text-light p-4 rounded-4 mt-5 d-flex">
        <img src="https://media.hatla2eestatic.com/images/general/road.png" alt="Road" />
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
              <p className="titleHome">Used Cars</p>
              <hr />
            </div>
          </div>
          <div className="row">
            {usedCars
              .filter((item) => item.title.toLowerCase().includes(search.toLowerCase()))
              .map((item) => (
                <UsedCar item={item} key={item._id} />
              ))}
          </div>
          <div className="pagination">
            <button
              className="pagination-button px-2 border-0 rounded-2"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <i className="fas fa-chevron-left"></i> Previous
            </button>
            <span className="px-2 fw-bold">Page {currentPage}</span>
            <button
              className="pagination-button px-2 border-0 rounded-2"
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
