import React, { createContext, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { storeContext } from "../../context/StoreContextProvider";
import { toast } from "react-toastify";
import axios from "axios";
export default function HomeProduct({ item }) {
  return (
    <>
      <div className="col-md-2 product m-3 rounded-3 p-2 cursor-pointer">
        <Link to={"/productDetails/" + item._id}>
          <div className="imgCover w-100 ">
            <img src={item.imageCover} className="w-100 homeImg " />
          </div>
          <div className="infoCar">
            <h5 className=" my-2 ">
              {item.title.split(" ").slice(0, 2).join(" ")}
            </h5>
            <div className="d-flex justify-content-between">
              <div className=" price">{item.price} EGP</div>
            </div>
            
          </div>
        </Link>
        
      </div>
    </>
  );
}
