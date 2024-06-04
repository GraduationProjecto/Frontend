import React from "react";
import { Link } from "react-router-dom";


export default function UsedCar({ item }) {

  return (
    <>
      <div className="col-md-12 product my-3 p-1 rounded-3 cursor-pointer">
        <Link to={"/productDetails/" + item._id}>
          <div className="row">
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-2 BIGiMG">
                  <div className="image_cover text-center">
                    <img src={item?.images[0]?.secure_url} width="75%" className="manner"></img>
                  </div>
                </div>
                <div className="col-md-10  p-4">
                  <div className="car_head">
                    <div className="title_head">
                      <h4 className="fw-bold">{item?.modelCar}</h4>
                    </div>
                    <div className="info_head ">
                     <div className="spans my-3">
                     <span className="aboutInfo_head fw-bold  bg-body-tertiary rounded-4 p-1">{item?.type}</span>
                      <span className="aboutInfo_head fw-bold  bg-body-tertiary rounded-4 p-1 m-1"> {item?.color}</span>
                      <span className="aboutInfo_head fw-bold  bg-body-tertiary rounded-4 p-1 m-1">{item?.Km} KM</span>
                      <span className="aboutInfo_head fw-bold  bg-body-tertiary rounded-4 p-1 m-1">{item?.city}</span>
                     </div>
                      <div className="Date p-0">
                        <span className="rounded-4 p-2 fw-bold  bg-body-tertiary"><i className="fa-solid fa-calendar-days mx-1"></i>25-10-2024</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-2 smallImage d-flex justify-content-between text-center">
                  
                    <div className="smallImg mx-1">
                      <img src={item?.images[0]?.secure_url} width="50px"></img>
                    </div>
                  
                  
                    <div className="smallImg mx-1">
                      <img src={item?.images[1]?.secure_url} width="50px"></img>
                    </div>
                  
                  
                    <div className="smallImg mx-1">
                      <img src={item?.images[2]?.secure_url} width="50px"></img>
                    </div>
                  
                </div>
                <div className="col-md-10 bg-body-tertiary">
                  <div className="car_price p-3 fw-bold fs-5">{item?.price} EGP</div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}
