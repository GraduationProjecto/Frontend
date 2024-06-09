import React, { useEffect, useState } from "react";
import "./SellNewCar.css";
import Select from "react-select";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Footer from './../Footer/Footer';

const SellNewCar = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const [newData, setNewData] = useState([]);
  const [specificModels, setSpecificModels] = useState([]);

  let navigate = useNavigate();
  async function getBrands() {
    setLoading(false);
    let data = await axios.get(
      "https://backend-c6zw.onrender.com/Brand/getBrands"
    );

    if (data?.data?.message === "All brands fetched successfully") {
      setNewData(
        data?.data?.response.map((brand) => ({ value: brand, label: brand }))
      );
      setLoading(true);
    }
  }

  async function getSpecificModel(make) {
    setLoading(false);
    let data = await axios.get(
      `https://backend-c6zw.onrender.com/Brand/getModelsToBrand?brandType=${make}`
    );
    if (data?.data?.message === "All models fetched successfully") {
      setSpecificModels(
        data?.data?.response.map((model) => ({ value: model, label: model }))
      );
      setLoading(true);
    }
  }

  const validationSchema = Yup.object().shape({
    brand: Yup.string().required("Brand is required"),
    Model: Yup.string().required("Model is required"),
    price: Yup.number().required("Price is required"),
    Installment: Yup.number().required("Installment is required"),
    Deposit: Yup.number().required("Deposit is required"),
    phone: Yup.string()
      .required("Phone number is required")
      .test("valid-phone", "Invalid phone number", (value) => {
        // Define your phone number format regex
        const phoneRegex = /^[+]?[0-9]{12,}$/;
        // Test if the value matches the regex
        return phoneRegex.test(value);
      }),
  });

  const SellNewCar = useFormik({
    initialValues: {
      brand: "",
      Model: "",
      Installment: "",
      price: "",
      Deposit: "",
      phone: "+2",
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(false);
      console.log(values);
      values.Installment = Number(values.Installment);
      values.Deposit = Number(values.Deposit);
      values.price = Number(values.price);
      try {
        const response = await axios.post(
          "http://localhost:8080/car/sell-new-car",
          values,
          {
            headers: {
              authorization: `Bearer__${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(response);
        navigate("/newCar");
      } catch (error) {
        setErrorMsg(error.response.data.message);
        setLoading(true);
      }
    },
  });
  const handleMakeChange = (selectedOption) => {
    SellNewCar.setFieldValue("brand", selectedOption.value);
    getSpecificModel(selectedOption.value);
  };

  const handleModelChange = (selectedOption) => {
    SellNewCar.setFieldValue("Model", selectedOption.value);
  };

  useEffect(() => {
    getBrands();
  }, []);

  return (
    <>
      <form onSubmit={SellNewCar.handleSubmit}>
        {/* Details */}
        <div className="container mt-5">
          <div className="card">
            <div className="card-header border-0 bg-transparent pt-3 pb-3">
              <div className="">
                <div className="icon d-flex gap-2 align-items-center">
                  <i className="fa-solid fa-circle-info"></i>
                  <div className="name">
                    <strong>Car Details</strong>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="row">
                {/* General */}
                <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                  <div className="mb-3">
                    <label className="form-label">Make*</label>
                    <Select
                      id="brand"
                      name="brand"
                      options={newData}
                      onChange={handleMakeChange}
                    />
                    {SellNewCar.touched.brand && SellNewCar.errors.brand ? (
                      <div className="text-danger alert alert-danger my-2">
                        {SellNewCar.errors.brand}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                  <div className="mb-3">
                    <label className="form-label">Model*</label>
                    <Select
                      id="Model"
                      name="Model"
                      options={specificModels}
                      onChange={handleModelChange}
                      value={specificModels.find(
                        (option) => option.value === SellNewCar.values.Model
                      )}
                    />
                    {SellNewCar.touched.Model && SellNewCar.errors.Model ? (
                      <div className="text-danger alert alert-danger my-2">
                        {SellNewCar.errors.Model}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                  <div className="mb-3">
                    <label htmlFor="price" className="form-label">
                      Price*
                    </label>
                    <input
                      onChange={SellNewCar.handleChange}
                      name="price"
                      type="text"
                      className="form-control p-2"
                      id="price"
                      placeholder="price your car"
                    />{" "}
                    {SellNewCar.touched.price && SellNewCar.errors.price ? (
                      <div className="text-danger alert alert-danger my-2">
                        {SellNewCar.errors.price}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                  <div className="mb-3">
                    <label htmlFor="Installment" className="form-label">
                      Installment *
                    </label>
                    <input
                      onChange={SellNewCar.handleChange}
                      name="Installment"
                      type="text"
                      className="form-control p-2"
                      id="Installment"
                      placeholder="Installment your car"
                    />{" "}
                    {SellNewCar.touched.Installment &&
                    SellNewCar.errors.Installment ? (
                      <div className="text-danger alert alert-danger my-2">
                        {SellNewCar.errors.Installment}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                  <div className="mb-3">
                    <label htmlFor="Deposit" className="form-label">
                      Deposit*
                    </label>
                    <input
                      onChange={SellNewCar.handleChange}
                      name="Deposit"
                      type="text"
                      className="form-control p-2"
                      id="Deposit"
                      placeholder="Deposit your car"
                    />{" "}
                    {SellNewCar.touched.Deposit && SellNewCar.errors.Deposit ? (
                      <div className="text-danger alert alert-danger my-2">
                        {SellNewCar.errors.Deposit}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="container mt-3">
          <div className="card">
            <div className="card-header border-0 bg-transparent pt-3 pb-3">
              <div className="">
                <div className="icon d-flex gap-2 align-items-center">
                  <i className="fa-solid fa-phone"></i>
                  <div className="name">
                    <strong>CONTACT INFORMATION</strong>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-12">
                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label">
                      {" "}
                      Phone *
                    </label>
                    <input
                      type="text"
                      className="form-control disabled"
                      id="phone"
                      name="phone"
                      value={SellNewCar.values.phone}
                      onChange={SellNewCar.handleChange}
                      placeholder="0101212121"
                    />
                    {SellNewCar.touched.phone && SellNewCar.errors.phone ? (
                      <div className="text-danger alert alert-danger my-2">
                        {SellNewCar.errors.phone}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mt-3 mb-3">
          <div className="row">
            <div className="col-12">
              <button
                type="submit"
                class="btn btn-warning w-100"
                style={{
                  color: "#fff",
                  fontWeight: "700",
                  backgroundColor: "#f2a222",
                }}
              >
                 {loading ? (
                  "Save Changes"
                ) : (
                  <i className="fa  fa-spinner fa-spin"></i>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
      
    </>
  );
};

export default SellNewCar;
