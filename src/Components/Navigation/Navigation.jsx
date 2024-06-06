import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./Navigation.css";
import Footer from "./../Footer/Footer";
import ModalLog from './../ModalLog/ModalLog';

const Navigation = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleNavClick = (e, path) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      setShowModal(true);
    } else {
      navigate(path);
    }
  };

  return (
    <>
      <nav>
        <div className="container">
          <div className="text">
            <h1>Sell Your Car In Egypt. Fast </h1>
            <p>
              Free & Just in One minute Choose your car information → Upload you
              car images → Get interested calls instantly{" "}
            </p>
          </div>
          <ul className="list-unstyled ulNav">
            <li className="navlink link1 liNav">
              <a
                href="/sell-your-car"
                onClick={(e) => handleNavClick(e, "sell-your-car")}
                className="text-decoration-none aNAv"
              >
                <span className="p-0 spanNAv">Sell Used Car</span>
              </a>
            </li>
            <li className="navlink link3 liNav">
              <a
                href="/new"
                onClick={(e) => handleNavClick(e, "new")}
                className="text-decoration-none aNAv"
              >
                <span className="p-0 spanNav">Sell New Car</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <ModalLog show={showModal} onClose={() => setShowModal(false)} />
      <Outlet />
      <Footer />
    </>
  );
};

export default Navigation;
