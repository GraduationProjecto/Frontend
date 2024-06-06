import React from "react";
import { Link } from "react-router-dom";
export default function HomeNewCar({ item }) {
  console.log(item);

  return (
    <>
      <div className="col-md-3 g-3">
        <div className="product h-100  p-2 rounded-3 cursor-pointer">
          <Link to={"/productDetails/" + item._id}>
            <div className="imgCover w-100  ">
              <img src={item?.image} className="w-100 homeImg " />
            </div>
            <hr></hr>
            <div className="infoCar-head ">
              <div className="carTitle ">
                <h5 className=" my-1 text-warning fw-bold">
                  {item.Model.split(" ").slice(0, 2).join(" ")}
                </h5>
              </div>
              <hr></hr>
              <div className="mx-1">
                <div className="d-flex  p-1 justify-content-between">
                  <div className=" price">
                    <span className="text-warning fw-bold fs-6">Min.Installment</span>
                    <p>{item?.Installment} EGP</p>
                  </div>
                  <div className=" price">
                    <span className="text-warning fw-bold fs-6">Min.Deposit</span>
                    <p>{item?.Deposit} EGP</p>
                  </div>
                </div>
                <div className="d-flex p-1 justify-content-between">
                  <div className=" price">
                    <span className="text-warning fw-bold fs-6">From</span>
                    <p>{item?.price} EGP</p>
                  </div>
                  <div className=" price">
                    <span className="text-warning fw-bold fs-6">To</span>
                    <p>{item?.price + 50000} EGP</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="carInfo-logo"></div>
          </Link>
        </div>
      </div>
    </>
  );
}
