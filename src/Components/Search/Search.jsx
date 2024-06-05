import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { storeContext } from './../../context/StoreContextProvider';

export default function Search() {
  const [newData, setNewData] = useState([]);
  const [specificModels, setSpecificModels] = useState([]);
  const [years, setYears] = useState([]);
  const [brandImage, setBrandImage] = useState([]);
  const [selectedMake, setSelectedMake] = useState("");
  let { handleSubmit } = useContext(storeContext);
  let navigate = useNavigate();

  async function getBrands() {
    let data = await axios.get("https://backend-c6zw.onrender.com/Brand/getBrands");

    if (data?.data?.message === "All brands fetched successfully") {
      setNewData(data?.data?.response);
    }
  }

  async function getYears() {
    let data = await axios.get("https://backend-c6zw.onrender.com/Brand/getYears");

    if (data?.data?.message === "All years fetched successfully") {
      setYears(data?.data?.response);
    }
  }

  async function getBRandsImage() {
    let data = await axios.get("https://backend-c6zw.onrender.com/car/get-all-category?limit=12");

    if (data?.status === 200) {
      setBrandImage(data.data?.data.category);
    }
  }

  async function getSpecificModel(make) {
    let data = await axios.get(`https://backend-c6zw.onrender.com/Brand/getModelsToBrand?brandType=${make}`);

    if (data?.data?.message === "All models fetched successfully") {
      setSpecificModels(data?.data?.response);
    }
  }

  async function getResponse(event) {
    event.preventDefault();
    let data = await handleSubmit(event);
    console.log(data);

    if (data) {
      navigate("/usedCar", { state: { response: data } });
    }
  }

  const handleMakeChange = (event) => {
    const selectedMake = event.target.value;
    setSelectedMake(selectedMake);
    getSpecificModel(selectedMake);
  };

  const handleBrandClick = (brandId) => {
    navigate(`/usedCar/${brandId}`);
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
                <h6 className="mx-3 fw-bold">Find used car (41677 Cars for sale)</h6>
                <hr className="line" />
              </div>
              <div className="Inputs">
                <form className="formFilter" onSubmit={getResponse}>
                  <div className="row">
                    <div className="col-md-5">
                      <select name="make" className="selectionFilter p-2" onChange={handleMakeChange}>
                        <option value="">Select a make</option>
                        {newData.map((make) => (
                          <option key={make} value={make}>{make}</option>
                        ))}
                      </select>
                      <select name="model" className="selectionFilter p-2">
                        <option value="">Select a model</option>
                        {specificModels.map((model) => (
                          <option key={model} value={model}>{model}</option>
                        ))}
                      </select>
                      <select name="city" className="selectionFilter p-2">
                        <option value="">Select a city</option>
                        {/* Add cities here */}
                      </select>
                      <input name="minPrice" className="inputsFilter rounded-3 p-2 m-1" placeholder="Min Price" type="number" />
                    </div>
                    <div className="col-md-5">
                      <select name="maxYear" className="selectionFilter p-2">
                        <option value="">Max Year</option>
                        {years.map((year) => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                      <select name="minYear" className="selectionFilter p-2">
                        <option value="">Min Year</option>
                        {years.map((minyear) => (
                          <option key={minyear} value={minyear}>{minyear}</option>
                        ))}
                      </select>
                      <input name="maxPrice" className="inputsFilter rounded-3 p-2 m-1" placeholder="Max price" type="number" />
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
                    <a className="nav-link active" aria-current="page" href="#">Top Brands</a>
                  </li>
                </ul>
              </div>
              <hr className="line" />
              <div className="aboutFilter">
                <div className="row">
                  {brandImage.map((brand) => (
                    <div className="col-md-3 p-2" key={brand._id}>
                      <img
                        src={brand.image.source}
                        className="brand-logo w-75"
                        alt={brand._id}
                        onClick={() => handleBrandClick(brand._id)}
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                  ))}
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
