import React from "react";
import icon1 from "../../assets/images/selectcar.png";
import icon2 from "../../assets/images/getcaravgprice.png";
import icon3 from "../../assets/images/placeadsellfaster.png";
import img from "../../assets/images/carevlu.png";
import { useFormik } from "formik";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { Button } from "react-bootstrap";
import Footer from './../Footer/Footer';

export default function RateCar() {
  const [errorMsg, setErrorMsg] = useState("");
  const [predict, setPredict] = useState("");
  const [model, setModel] = useState("");
  const [loading, setLoading] = useState(true);
  const [newData, setNewData] = useState([]);
  const [years, setYears] = useState([]);
  const [specificModels, setSpecificModels] = useState([]);

  let navigate = useNavigate();

  async function getBrands() {
    setLoading(false);
    let data = await axios.get(
      "http://localhost:8080/Brand/getBrands"
    );
    if (data?.data?.message === "All brands fetched successfully") {
      setNewData(data?.data?.response);
      setLoading(true);
    }
  }

  async function getYears() {
    setLoading(false);
    let data = await axios.get(
      "http://localhost:8080/Brand/getYears"
    );
    if (data?.data?.message === "All years fetched successfully") {
      setYears(data?.data?.response);
      setLoading(true);
    }
  }

  async function turn() {
    navigate("/sellCar");
  }

  async function getSpecificModel(make) {
    setLoading(false);
    let data = await axios.get(
      `http://localhost:8080/Brand/getModelsToBrand?brandType=${make}`
    );
    if (data?.data?.message === "All models fetched successfully") {
      setSpecificModels(data?.data?.response);
      setLoading(true);
    }
  }

  const rateCar = useFormik({
    initialValues: {
      year: 0,
      company: "",
      name: "",
      kms_driven: "",
      fuel_type: "",
    },
    onSubmit: async (values) => {
      values.year = Number(values.year);
      console.log(values);
      setLoading(false);
      try {
        console.log("Sending request to backend...");
        const response = await axios.post(
          "https://machine-learning-7okw.onrender.com/predict",
          values,
          {
            headers: {
              authorization: `Bearer__${localStorage.getItem("token")}`,
            },
          }
        );
        console.log("Response from backend:", response);
        setModel(JSON.parse(response.config.data).name);
        if (response.data.prediction) {
          setPredict(response.data.prediction);
        } else {
          setPredict("notFound  ");
        }
      } catch (error) {
        console.log("Error during request:", error);
        setErrorMsg(error.response?.data?.message || "An error occurred");
        setLoading(true);
      }
    },
  });

  const options4 = [
    { value: "gas", label: "gas" },
    { value: "Solar", label: "Solar" },
    { value: "Diesel", label: "Diesel" },
  ];

  const handleMakeChange = (selectedOption) => {
    rateCar.setFieldValue("company", selectedOption.value);
    getSpecificModel(selectedOption.value);
  };

  const handleModelChange = (selectedOption) => {
    rateCar.setFieldValue("name", selectedOption.value);
  };

  const handleYearChange = (selectedOption) => {
    rateCar.setFieldValue("year", selectedOption.value);
  };

  const handleFuelChange = (selectedOption) => {
    rateCar.setFieldValue("fuel_type", selectedOption.value);
  };

  useEffect(() => {
    getBrands();
    getYears();
  }, []);

  return (
    <>
 <div className="container">
      <div className="upperContent">
        <div className="withSideBarHolder">
          <div className="priceEva_contain">
            <div className="priceEva_wrap">
              {!predict ? (
                <div>
                  <div className="priceEva_head">
                    <div className="priceEva_head_text">
                      <h1 className="priceEva_title">
                        Evaluates Your Car Prices
                      </h1>
                      <p className="priceEva_text">
                        Know how much you can sell your car cash!
                      </p>
                      <div className="priceEva_head_list">
                        <ul>
                          <li>
                            <img src={icon1} alt="select car icon" />
                            <p>Select your car terms</p>
                          </li>
                          <li>
                            <img src={icon2} alt="get car avg price icon" />
                            <p>
                              Get your car average price along with minimum to
                              maximum car price
                            </p>
                          </li>
                          <li>
                            <img src={icon3} alt="place ad sell faster icon" />
                            <p>Place your Ad. to sell your car faster</p>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="priceEva_head_img">
                      <img src={img} alt="car evaluation" />
                    </div>
                  </div>
                  <div className="priceEva_body">
                    <div className="newSite_form">
                      <form onSubmit={rateCar.handleSubmit}>
                        <div className="form-row">
                          <div className="form-col">
                            <div>
                              <Select
                                required
                                id="company"
                                name="company"
                                onChange={handleMakeChange}
                                options={newData.map((opt) => ({
                                  value: opt,
                                  label: opt,
                                }))}
                                placeholder="Select a Make"
                              />
                            </div>
                          </div>
                          <div className="form-col">
                            <div>
                              <Select
                                required
                                id="name"
                                name="name"
                                onChange={handleModelChange}
                                options={specificModels.map((model) => ({
                                  value: model,
                                  label: model,
                                }))}
                                placeholder="Select a model"
                              />
                            </div>
                          </div>
                          <div className="form-col">
                            <div>
                              <Select
                                required
                                id="year"
                                name="year"
                                onChange={handleYearChange}
                                options={years.map((opt) => ({
                                  value: opt,
                                  label: opt,
                                }))}
                                placeholder="Select Year"
                              />
                            </div>
                          </div>
                          <div className="form-col site-input-style">
                            <input
                              required
                              onChange={rateCar.handleChange}
                              name="kms_driven"
                              type="text"
                              className="form-control p-3"
                              id="kms_driven"
                              placeholder="How many kilometers?"
                            />
                          </div>
                          <div className="form-col">
                            <div>
                              <Select
                                required
                                id="fuel_type"
                                name="fuel_type"
                                onChange={handleFuelChange}
                                options={options4}
                                placeholder="Select Fuel"
                              />
                            </div>
                          </div>
                          <div className="form-col">
                            <div className="form-action center">
                              <button
                                type="submit"
                                className="form-action-btn orange"
                              >
                                {loading ? (
                                  "+ Sell Your Car"
                                ) : (
                                  <i className="fa  fa-spinner fa-spin"></i>
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              ) : predict >= 0 ? (
                <div>
                  <h2 className="head-Title fw-bold p-2">
                    Your Car Price Evaluation
                  </h2>
                  <div className="sucPredict w-75 fs-6 p-4">
                    <h1 className="my-2 fw-bolder p-2">{model}</h1>
                    <div className="fw-bold p-2 fs-4">
                      Predicted Price for Your Car: <h2 className="fw-bold text- p-2 predictPrice">{predict}</h2>
                    </div>
                    <Button
                      onClick={turn}
                      className="PredictPtn text-light w-100 p-3 my-3 border-0 rounded-3 fw-bold"
                    >
                      + Sell Your Car
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  <h2 className="head-Title fw-bold p-2">
                    Your Car Price Evaluation
                  </h2>
                  <div className="notPredict w-75 fs-6 p-4">
                    <h3>{model}</h3>
                    <div>
                      We can't find any average prices for your car because no
                      or very little number of your car are sold every month.
                    </div>
                    <button
                      onClick={turn}
                      className="notPredictPtn text-light w-100 p-3 my-3 border-0 rounded-3 fw-bold"
                    >
                      + Sell Your Car
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
   
  );
}
