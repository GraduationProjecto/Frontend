import React, { createContext, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Product({ item }) {
  return (
    <>
      <div className="col-md-12 product my-3 p-1 rounded-3 cursor-pointer">
        <Link to={"/productDetails/" + item._id}>
          <div className="row">
            <div className="col-md-3 imgeCover">
              <div className=" carImg text-center">
                <img src={item?.image} width={"100%"} />
              </div>
            </div>
            <div className="col-md-8 carInfo p-4 ">
              <div className="titleInfo">
                <p className="text-main my-2 fw-bold">
                {item.name}
                  {item.Model}
                </p>
              </div>
              <div className=" priceInfo pt-3 ps-3 pb-1 rounded-3  w-50">
                <span>The official price</span>
                <div>
                  <p className="fw-bold fs-5  pt-2">
                    {item.price} EGP 
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}
