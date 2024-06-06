import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../Loading/Loading";
import Slider from "react-slick";

const AuctionDetails = () => {
  const { id } = useParams();
  const [auction, setAuction] = useState(null);
  const [bid, setBid] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://backend-c6zw.onrender.com/auction/specificAuction/${id}`, {
        headers: {
          authorization: `Bearer__${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setAuction(response.data.response);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching auction details:", error);
        setLoading(false);
      });

    const socket = new WebSocket(`wss://your-websocket-url/${id}`);
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.newBid) {
        setBid(data.newBid);
      }
    };

    return () => {
      socket.close();
    };
  }, [id]);

  const handleBidSubmit = () => {
    // Add bid submission logic here
    console.log("Bid submitted:", bid);
  };

  if (loading) {
    return <Loading />;
  }

  if (!auction) {
    return <p>No auction found</p>;
  }

  const settings1 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
  };

  const {
    status,
    startingTime,
    endingTime,
    title,
    description,
    startingPrice,
    carId,
  } = auction;

  return (
    <>
      <div className="container my-5 productDetailsSection rounded-2">
        <div className="productDetailsContainer p-3">
          <div className="sectionHead p-3">
            <div className="d-flex justify-content-between">
              <h3>StartingTime</h3>
              <span>{startingTime}</span>
            </div>
          </div>
          <div className="row d-flex justify-content-between">
            <div className="col-md-7 my-5">
              <Slider {...settings1} className="slider w-100">
                {carId.images.map((img, index) => (
                  <div key={index}>
                    <img
                      src={img.secure_url}
                      alt={`Car ${index}`}
                      className="text-center w-100"
                      height={"400px"}
                    />
                  </div>
                ))}
              </Slider>
            </div>
            <div className="col-md-5 my-5 rounded-2 bg-tertiary productDetailsSide p-4">
              <h3 className="my-4 fw-bold fs-5 titleDescription text-warning">
                Description
              </h3>
              <div className="row d-flex justify-content-between">
                <div className="col-md-5 productInfoCar my-2 bg-body p-1 rounded-1">
                  <span className="text-warning fw-bold">status</span>
                  <p className="p-0 m-0 text-body-tertiary">{status}</p>
                </div>
                <div className="col-md-5 productInfoCar my-2 bg-body p-1 rounded-1">
                  <span className="text-warning fw-bold">startingTime</span>
                  <p className="p-0 m-0 text-body-tertiary">{startingTime}</p>
                </div>
                <div className="col-md-5 productInfoCar my-2 bg-body p-1 rounded-1">
                  <span className="text-warning fw-bold">endingTime</span>
                  <p className="p-0 m-0 text-body-tertiary">{endingTime}</p>
                </div>
                <div className="col-md-5 productInfoCar my-2 bg-body p-1 rounded-1">
                  <span className="text-warning fw-bold">startingPrice</span>
                  <p className="p-0 m-0 text-body-tertiary">{startingPrice}</p>
                </div>
                <div className="col-md-5 productInfoCar my-2 bg-body p-1 rounded-1">
                  <span className="text-warning fw-bold">description</span>
                  <p className="p-0 m-0 text-body-tertiary">{description}</p>
                </div>
              </div>
              <div className="bid-section my-4">
                <input
                  type="number"
                  value={bid}
                  onChange={(e) => setBid(e.target.value)}
                  placeholder="Enter your bid"
                  className="form-control mb-3"
                />
                <button
                  onClick={handleBidSubmit}
                  className="btn btn-primary"
                >
                  Submit Bid
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuctionDetails;
