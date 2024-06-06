import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./Navigation.css";
import Footer from "./../Footer/Footer";

const Navigation = () => {
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
              <NavLink
                activeclassname="active"
                to={"sell-your-car"}
                className="text-decoration-none aNAv"
              >
                <span className="p-0 spanNAv">Sell Used Car</span>
              </NavLink>
            </li>
            <li className="navlink link3 liNav">
              <NavLink to={"new"} className="text-decoration-none aNAv">
                <span className="p-0 spanNav">Sell New Car</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
      <Outlet />
      <Footer />
    </>
  );
};

export default Navigation;
