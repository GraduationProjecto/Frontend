import React from "react";
import { Link } from "react-router-dom";

export default function HomeProduct({ item }) {
  return (
    <>
      <div className="col-md-3">
        <div className=" p-2">
          <div className="rounded-3 product p-2 my-3 cursor-pointer">
            <Link to={"/productDetails/" + item._id}>
              <div className="imgCover w-100 ">
                <img
                  src={item?.images[0]?.secure_url}
                  className="w-100 text-center homeImg "
                />
              </div>
              <div className="infoCar ">
                <h5 className=" my-2 text-warning fw-bold">{item?.type}</h5>
                <div className="d-flex justify-content-between ">
                  <div className=" price m-auto fw-bolder">{item.price} <small className="text-dark fs-6">EGP</small></div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
