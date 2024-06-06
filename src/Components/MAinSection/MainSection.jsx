import React, { useEffect, useState } from "react";
import axios from "axios";
import HomeProducts from "./../HomeProducts/HomeProducts";
import Search from "../Search/Search";
import HomeNewCars from "../HomeNewCars/HomeNewCars";
import Footer from './../Footer/Footer';



export default function MainSection() {
  return (
    <>
    <div className="container road text-light p-4  rounded-4 mt-5 d-flex">
      <img src="	https://media.hatla2eestatic.com/images/general/road.png"/>
      <div>
      <p>Shorten the road in less than 1 minute</p>
      <h2 className="text-light fw-bold">Sell your car faster than ever before</h2>
      <a className="p-3 bg-warning m-3 d-inline-block rounded-3 text-light fw-bold " href="/#/sellCar">Sell Your Car</a>
      </div>
    </div>
      <div className="container">
        <div className="home">
          <div className="firstSection">
            <Search/> 
            <div className="my-5">
              <p className="titleHome">Buy Used Car</p>
              <hr></hr>
            </div>
           
            <HomeProducts />
            <div className="my-5">
              <p className="titleHome">Buy New Car</p>
              <hr></hr>
            </div>
            <HomeNewCars/>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}
