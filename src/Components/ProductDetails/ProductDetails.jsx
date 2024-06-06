import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import { toast } from "react-toastify";
import Slider from "react-slick";
import RatingModal from "../RatingModal/RatingModal.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "../Footer/Footer";
import NewRecomnded from "../NewRecomnded/NewRecomnded";
import UsedRecommended from "../UsedRecommend/UsedReccomend.jsx";

export default function ProductDetails() {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [sameBrandCars, setSameBrandCars] = useState([]);
  const [sameBrandCarsUsed, setSameBrandCarsUsed] = useState([]);
  let token = localStorage.getItem("token");
  let { id } = useParams();

  async function getSingleProduct() {
    setLoading(true);
    try {
      let { data } = await axios.get(
        `https://backend-c6zw.onrender.com/car/get-car-by-id/${id}`
      );
      setProduct(data?.response);
      getSameBrand(data?.response?.category);
      getSameBrandUse(data?.response?.category); // Call getSameBrand with the category ID
    } catch (error) {
      console.error("Error fetching product:", error);
      toast.error("Failed to fetch product data.");
    } finally {
      setLoading(false);
    }
  }

  async function getSameBrand(categoryId) {
    try {
      let { data } = await axios.get(
        `https://backend-c6zw.onrender.com/car/allCarsNew/${categoryId}`
      );
      setSameBrandCars(data?.response);
    } catch (error) {
      console.error("Error fetching same brand cars:", error);
      toast.error("Failed to fetch same brand cars data.");
    }
  }

  async function getSameBrandUse(categoryId) {
    try {
      let { data } = await axios.get(
        `https://backend-c6zw.onrender.com/car/allCarsUsed/${categoryId}`
      );
      console.log(data?.response);
      setSameBrandCarsUsed(data?.response);
    } catch (error) {
      console.error("Error fetching same brand cars:", error);
      toast.error("Failed to fetch same brand cars data.");
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
      rating = Number(rating); // Convert rating to a number
      if (isNaN(rating)) {
        throw new Error("Invalid rating value"); // Handle invalid rating value
      }

      await axios.post(
        `https://backend-c6zw.onrender.com/car/rating/${id}`,
        { rating }, // Send numeric rating in the request body
        {
          headers: {
            authorization: `Bearer__${localStorage.getItem("token")}`, // Note the capitalization "Authorization"
          },
        }
      );

      toast.success("Thank you for your rating!");
    } catch (error) {
      console.error("Error submitting rating:", error.response?.data || error);
      toast.error("Failed to submit rating. Please try again.");
    }
  }

  useEffect(() => {
    getSingleProduct();
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, [id]); // Re-fetch product when 'id' parameter changes

  if (loading) return <Loading />;

  // Function to render stars based on rating
  const renderStars = (rating) => {
    const totalStars = 5;
    const solidStars = Math.round(rating); // Round to nearest whole number for stars
    const emptyStars = totalStars - solidStars;

    return (
      <div>
        {Array.from({ length: solidStars }, (_, index) => (
          <i key={index} className="fa fa-star text-warning"></i>
        ))}
        {Array.from({ length: emptyStars }, (_, index) => (
          <i key={index} className="fa fa-star-o text-warning"></i>
        ))}
      </div>
    );
  };

  return (
    <>
      {product.type ? (
        <>
          <div className="container my-5 productDetailsSection rounded-2">
            <div className="productDetailsContainer p-3">
              <div className="sectionHead p-3">
             <div className="mb-4">
             <h3 className="text-warning">CarDetails</h3>
              <hr className="w-75 text-warning fw-bold" ></hr>
             </div>
                <div className="d-flex mt-2 justify-content-between">
                  <h3>{product?.title || product?.brand}</h3>
                  <span>{product?.price} EGP</span>
                </div>
              </div>
              <div className="row d-flex justify-content-between">
                <div className="col-md-7 my-5">
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
                </div>
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
                  </div>
                  <div className="d-flex align-items-center justify-content-center my-3">
                    <span className="me-2">Average Rating:</span>
                    {renderStars(product?.totalRating || 0)}
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
            </div>
          </div>
          <div className="container my-5 bg-white p-5 sameBrandSection rounded-2">
            <h3 className="fw-bold">Cars from the same brand</h3>
            <hr className="w-25 text-info fw-bold"></hr>
            <div className="row">
              {sameBrandCarsUsed.map((car) => {
                return <UsedRecommended item={car} key={car._id} />;
              })}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="container my-5 productDetailsSection rounded-2">
            <div className="productDetailsContainer p-3">
              <div className="sectionHead p-3 text-center w-100">
                <h3>{product?.type || product?.Model}</h3>
                <p>
                  All New {product?.Model} Prices, Installments And Availability
                  In Showrooms.
                </p>
              </div>
              <div className="row d-flex justify-content-between">
                <div className="col-md-7 my-5">
                  <img
                    className="text-center w-100"
                    src={product.image}
                    alt="Product"
                  />
                </div>
                <div className="col-md-5 my-5 bg-body-tertiary d-flex align-items-center rounded-2 productDetailsSide p-4">
                  <div className="w-100">
                    <h3 className="my-4 fw-bold fs-5 text-center titleDescription">
                      {product?.brand} {product?.year}
                    </h3>
                    <div className="p-2">
                      <p className="fs-5 p-0 m-0 text-warning fw-bold">
                        Official Price:{" "}
                      </p>
                      <p className="fw-bolder d-inline fs-4 predictPrice">
                        {product.price} <small>EGP</small> <br />{" "}
                        <span className="text-warning fw-bold">To</span> <br />{" "}
                        {product.price + 145235} <small>EGP</small>
                      </p>
                    </div>
                    <div className="d-flex align-items-center justify-content-center mt-3">
                      <span className="me-2">Average Rating:</span>
                      {renderStars(product?.totalRating || 0)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container my-5 bg-white p-5 sameBrandSection rounded-2">
            <h3 className="fw-bold">Cars from the same brand</h3>
            <hr className="w-25 text-info fw-bold"></hr>
            <div className="row">
              {sameBrandCars.map((car) => {
                return <NewRecomnded item={car} key={car._id} />;
              })}
            </div>
          </div>
        </>
      )}
      <RatingModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleSubmit={submitRating}
      />

      <Footer />
    </>
  );
}
