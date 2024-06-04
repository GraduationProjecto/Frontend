import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const [newData, setNewData] = useState([]);
  const [specificModels, setSpecificModels] = useState([]);
  const [years, setYears] = useState([]);
  const [response, setResponse] = useState([]);
  const [brandImage, setBrandImage] = useState([]);
  const [selectedMake, setSelectedMake] = useState("");

  let navigate = useNavigate();

  async function getBrands() {
    let data = await axios.get(
      "https://backend-c6zw.onrender.com/Brand/getBrands"
    );

    if (data?.data?.message === "All brands fetched successfully") {
      setNewData(data?.data?.response);
    }
  }

  async function getYears() {
    let data = await axios.get(
      "https://backend-c6zw.onrender.com/Brand/getYears"
    );

    if (data?.data?.message === "All years fetched successfully") {
      setYears(data?.data?.response);
    }
  }
  async function getBRandsImage() {
    let data = await axios.get(
      "https://backend-c6zw.onrender.com/car/get-all-category?limit=12"
    );
    console.log(data.data?.data.category);

    if (data?.status == 200) {
      setBrandImage(data.data?.data.category);
      console.log(brandImage);
    }
  }

  console.log(brandImage);

  async function getSpecificModel(make) {
    let data = await axios.get(
      `https://backend-c6zw.onrender.com/Brand/getModelsToBrand?brandType=${make}`
    );

    if (data?.data?.message === "All models fetched successfully") {
      setSpecificModels(data?.data?.response);
    }
  }

  const handleMakeChange = (event) => {
    const selectedMake = event.target.value;
    setSelectedMake(selectedMake);
    getSpecificModel(selectedMake);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const queryParams = new URLSearchParams();

    for (let [key, value] of formData.entries()) {
      // Convert minPrice and maxPrice to numbers before appending
      if (key === "minPrice" || key === "maxPrice") {
        queryParams.append(key, Number(value));
      } else {
        queryParams.append(key, value);
      }
    }

    const queryString = queryParams.toString();
    const url = `https://backend-c6zw.onrender.com/car/search?${queryString}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data
        setResponse(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    getBrands();
    getBRandsImage();
    getYears();
  }, []);

  return (
    <>
      <div className="searchDiv">
        <div className="homeHead text-center">
          <h3 className="fw-bold p-3">Buy / Sell a car in Egypt</h3>
        </div>
        <div className="row-fluid d-flex">
          <div className="span right">
            <div className="searchInputs">
              <div className="searchBlock">
                <h6 className="mx-3 fw-bold">
                  Find used car (41677 Cars for sale)
                </h6>
                <hr className="line" />
              </div>
              <div className="Inputs">
                <form className="formFilter" onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-5">
                      <select
                        name="make"
                        className="selectionFilter p-2"
                        onChange={handleMakeChange}
                      >
                        <option value="">Select a make</option>
                        {newData.map((make) => (
                          <option key={make} value={make}>
                            {make}
                          </option>
                        ))}
                      </select>
                      <select name="model" className="selectionFilter p-2">
                        <option value="">Select a model</option>
                        {specificModels.map((model) => (
                          <option key={model} value={model}>
                            {model}
                          </option>
                        ))}
                      </select>
                      <select name="city" className="selectionFilter p-2">
                        <option value="">Select a city</option>
                        {/* Add cities here */}
                      </select>

                      <input
                        name="minPrice"
                        className="inputsFilter rounded-3 p-2 m-1"
                        placeholder="Min Price"
                        type="number"
                      />
                    </div>
                    <div className="col-md-5">
                      <select name="maxYear" className="selectionFilter p-2">
                        <option value="">Max Year</option>
                        {years.map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                      <select name="minYear" className="selectionFilter p-2">
                        <option value="">Min Year</option>
                        {years.map((minyear) => (
                          <option key={minyear} value={minyear}>
                            {minyear}
                          </option>
                        ))}
                      </select>
                      <input
                        name="maxPrice"
                        className="inputsFilter rounded-3 p-2 m-1"
                        placeholder="Max price"
                        type="number"
                      />
                    </div>
                  </div>
                  <input className="btnFilter" type="submit" value="Search" />
                </form>
              </div>
            </div>
          </div>
          <div className="span">
            <div className="filter">
              <div className="filterHead">
                <ul className="nav nav-pills">
                  <li className="nav-item m-0">
                    <a className="nav-link active" aria-current="page" href="#">
                      Top Brands
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Price
                    </a>
                  </li>
                </ul>
              </div>
              <hr className="line" />
              <div className="aboutFilter">
                <div className="row">
                  {brandImage.map((brand) => {
                    <div className="col-md-3 bg-black">
                      <img
                        src={brand.image.source}
                        className="brand-logo w-100"
                        alt={"brand._id"}
                      />
                    </div>;
                  })}

                  {/* Add the rest of the logos similarly */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
