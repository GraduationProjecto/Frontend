import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import { storeContext } from "../../context/StoreContextProvider";
import { toast } from "react-toastify";
import Slider from "react-slick";
import RatingModal from "./../RatingModal/RatingModal.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function ProductDetails() {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  let token = localStorage.getItem("token");
  let { id } = useParams();

  async function getSingleProduct() {
    try {
      let { data } = await axios.get(
        `https://backend-c6zw.onrender.com/car/get-car-by-id/${id}`
      );
      setProduct(data?.response);
    } catch (error) {
      console.error("Error fetching product:", error);
      toast.error("Failed to fetch product data.");
    } finally {
      setLoading(false);
    }
  }

  var settings1 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
  };

  async function submitRating(rating) {
    try {
      const response = await axios.post(
        `https://backend-c6zw.onrender.com/car/rating/${id}/rate`,
        { rating }
      );
      toast.success("Thank you for your rating!");
    } catch (error) {
      console.error("Error submitting rating:", error);
      toast.error("Failed to submit rating. Please try again.");
    }
  }

  useEffect(() => {
    getSingleProduct();
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      <div className="container my-5 productDetailsSection rounded-2">
        <div className="productDetailsContainer p-3">
          <div className="sectionHead p-3 ">
            {product.type ? (
              <div className="d-flex justify-content-between">
                {" "}
                <h3>{product?.type || product?.brand}</h3>
                <span>{product?.price} EGP</span>
              </div>
            ) : (
              <div className="text-center w-100">
                {" "}
                <h3>{product?.type || product?.Model}</h3>
                <p>
                  All New {product?.Model} Prices, Installments And Availability
                  In Showrooms.
                </p>
              </div>
            )}
          </div>
          <div className="row d-flex justify-content-between">
            <div className="col-md-7 my-5">
              {product.type ? (
                <Slider {...settings1} className="slider w-100">
                  {product.images.map((image, index) => (
                    <img
                      key={index}
                      className="text-center w-100"
                      src={image.secure_url}
                      alt={`Car ${index}`}
                    />
                  ))}
                </Slider>
              ) : (
                <img
                  className="text-center w-100"
                  src={product.image}
                  alt="Product"
                />
              )}
            </div>
            {product.type ? (
              <div className="col-md-5 my-5 rounded-2 productDetailsSide p-4">
                <h3 className="my-4 fw-bold fs-5 titleDescription">
                  Description
                </h3>
                <div className="row d-flex justify-content-between">
                  <div className="col-md-5 productInfoCar my-2 bg-body p-1 rounded-1">
                    <span>Make</span>
                    <p className="p-0 m-0">{product?.type}</p>
                  </div>
                  <div className="col-md-5 productInfoCar my-2 bg-body p-1 rounded-1">
                    <span>Model</span>
                    <p className="p-0 m-0">{product?.modelCar}</p>
                  </div>
                  <div className="col-md-5 productInfoCar my-2 bg-body p-1 rounded-1">
                    <span>Fuel</span>
                    <p className="p-0 m-0">{product?.fuel}</p>
                  </div>
                  <div className="col-md-5 productInfoCar my-2 bg-body p-1 rounded-1">
                    <span>Used since</span>
                    <p className="p-0 m-0">{product?.year}</p>
                  </div>
                  <div className="col-md-5 productInfoCar my-2 bg-body p-1 rounded-1">
                    <span>Km</span>
                    <p className="p-0 m-0">{product?.Km} Km</p>
                  </div>
                  <div className="col-md-5 productInfoCar my-2 bg-body p-1 rounded-1">
                    <span>Transmission</span>
                    <p className="p-0 m-0">{product?.Transmission}</p>
                  </div>
                  <div className="col-md-5 productInfoCar my-2 bg-body p-1 rounded-1">
                    <span>City</span>
                    <p className="p-0 m-0">{product?.city}</p>
                  </div>
                  <div className="col-md-5 productInfoCar my-2 bg-body p-1 rounded-1">
                    <span>Color</span>
                    <p className="p-0 m-0">{product?.color}</p>
                  </div>
                  <div className="btnPhone col-md-12 productInfoCar my-2 bg-body p-4 rounded-2 text-center my-5">
                    <i className="fa-solid fa-phone px-2"></i>
                    {token ? (
                      <span className="px-2">+20{product?.phone}</span>
                    ) : (
                      <div className="d-inline">
                        <span className="px-2">+20xxxxxxxx</span>
                        <NavLink to={"/signIn"} className="px-1 text-light">
                          Show Number
                        </NavLink>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="col-md-5 my-5 bg-body-tertiary d-flex align-items-center rounded-2 productDetailsSide p-4">
                <div className="w-100">
                  <h3 className="my-4 fw-bold fs-5 text-center titleDescription">
                    {product?.brand} {product?.year}
                  </h3>
                  <div className="p-2">
                    <p className="fs-5 p-0 m-0">Official Price: </p>
                    <p className="fw-bolder d-inline fs-4">{product.price} EGP To {product.price+145235} EGP</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <RatingModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleSubmit={submitRating}
      />
    </>
  );
}
