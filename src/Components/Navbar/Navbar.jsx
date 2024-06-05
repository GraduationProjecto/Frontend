import React, { useContext, useEffect } from "react";
import logo from "../../assets/images/logo.jpg";
import { NavLink } from "react-router-dom";
import { storeContext } from "../../context/StoreContextProvider";
export default function Navbar() {
  let { counter, getCart, setCounter } = useContext(storeContext);
  let token = localStorage.getItem("token");
  useEffect(() => {
   
    }, [token]);
  return (
    <>
      <nav className="navbar navNav navbar-expand-lg bg-body-tertiary p-3">
        <div className="container">
          <a className="navbar-brand" href="#">
            <img src={logo} width={"150px"}/>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item ">
                <NavLink
                  className="nav-link fw-bold "
                  aria-current="page"
                  to="/usedCar"
                >
                  Used Cars
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link fw-bold"
                  aria-current="page"
                  to="/newCar"
                >
                  New Cars
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link fw-bold "
                  aria-current="page"
                  to="/importedCar"
                >
                Imported cars
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link fw-bold "
                  aria-current="page"
                  to="/SellCar"
                >
                Sell car
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link fw-bold "
                  aria-current="page"
                  to="/RateCar"
                >
                Rate Car
                </NavLink>
              </li>
            </ul>

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-ite">
                <NavLink
                  className="nav-link  position-relative mx-4"
                  aria-current="page"
                  to="/signIn"
                >
                  {token ? "LogOut" : "LogIn"}
                  <i className="fa-solid fa-right-from-bracket iconLogo mx-2"></i>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
