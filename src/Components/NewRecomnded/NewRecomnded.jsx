import React from "react";
import { Link } from "react-router-dom";

export default function NewRecomnded({ item }) {
  return (
    <>
      <div className="col-md-12 product my-3 p-1 rounded-3 cursor-pointer new-recommended-card">
        <Link to={"/productDetails/" + item._id}>
          <div className="row align-items-center">
            <div className="col-md-3 imgeCover">
              <div className="carImg text-center">
                <img
                  src={item?.image}
                  width={"100%"}
                  className="car-image"
                  alt={item.name}
                />
              </div>
            </div>
            <div className="col-md-6 carInfo p-3">
              <div className="titleInfo">
                <p className="text-main my-2 fw-bold car-title">
                  {item.name} {item.Model}
                </p>
                <p className="dealer-name">{item.dealerName}</p>
              </div>
              <div className="d-flex justify-content-between">
                <div className="priceInfo pt-2">
                  <span className="price-label">Price</span>
                  <p className="fw-bold fs-5 pt-1 price-amount">
                    {item.price} EGP
                  </p>
                </div>
                <div className="depositInfo pt-2">
                  <span className="deposit-label">Deposit</span>
                  <p className="fw-bold fs-5 pt-1 deposit-amount">
                    {item.Deposit} EGP
                  </p>
                </div>
                <div className="installmentInfo pt-2">
                  <span className="installment-label">Installment</span>
                  <p className="fw-bold fs-5 pt-1 installment-amount">
                    {item.Installment || "-"}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-3 text-end">
              <img
                src={item.dealerLogo}
                alt={item.dealerName}
                className="dealer-logo"
              />
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}
