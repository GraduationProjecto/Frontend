import React, { createContext, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { storeContext } from "../../context/StoreContextProvider";
import { toast } from "react-toastify";
import car1 from "../../assets/images/car1.png";

export default function HomeNewCar({ item }) {
  let { setCounter, addToCart, addToWishlist, getWishlist } =
    useContext(storeContext);
  let [loading, setLoading] = useState(true);
  let [loadingWishlist, setLoadingWishlist] = useState(true);
  let [favPro, setFavPro] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  let [iconColor, setIconColor] = useState("white");
  // const [iconColor, setIconColor] = useState(() => {
  //   // Check local storage for saved color, default to black if not found
  //   return localStorage.getItem("wishlistIconColor") || "black";
  // });

 
 
  return (
    <>
      <div className="col-md-3 g-3">
        <div className="product  p-2 rounded-3 cursor-pointer">
          <Link to={"/productDetails/" + item._id}>
            <div className="imgCover w-100  ">
              <img src={car1} className="w-100 homeImg " />
            </div>
            <hr></hr>
            <div className="infoCar-head ">
              <div className="carTitle ">
                <h5 className=" my-1 ">
                  {item.title.split(" ").slice(0, 2).join(" ")}
                </h5>
              </div>
              <hr></hr>
              <div className="d-flex  p-1 justify-content-between">
                <div className=" price">
                  <span>Min.Installment</span>
                  <p>720,000 EGP</p>
                </div>
                <div className=" price">
                  <span>Min.Deposit</span>
                  <p>1,400,000 EGP</p>
                </div>
              </div>
              <div className="d-flex  p-1 justify-content-between">
                <div className=" price">
                  <span>From</span>
                  <p>2,900,000 EGP</p>
                </div>
                <div className=" price">
                  <span>To</span>
                  <p>5,500,000 EGP</p>
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
