import React, { useEffect, useState } from "react";
import "./SellCar.css";
import { useFormik } from "formik";
import axios from "axios";
import photo from "../../assets/images/download.png";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import * as Yup from "yup";
import { colourOptions, cities ,  flavourOptions } from './data';
import Footer from './../Footer/Footer';

const SellCar = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const [newData, setNewData] = useState([]);
  const [specificModels, setSpecificModels] = useState([]);
  const [years, setYears] = useState([]);
  let navigate = useNavigate();
  async function getBrands() {
    let data = await axios.get(
      "https://backend-c6zw.onrender.com/Brand/getBrands"
    );

    if (data?.data?.message === "All brands fetched successfully") {
      setNewData(
        data?.data?.response.map((brand) => ({ value: brand, label: brand }))
      );
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

  async function getSpecificModel(make) {
    let data = await axios.get(
      `https://backend-c6zw.onrender.com/Brand/getModelsToBrand?brandType=${make}`
    );
    if (data?.data?.message === "All models fetched successfully") {
      setSpecificModels(
        data?.data?.response.map((model) => ({ value: model, label: model }))
      );
    }
  }

  const validationSchema = Yup.object().shape({
    modelCar: Yup.string().required("Model is required"),
    color: Yup.string().required("Color is required"),
    price: Yup.number().required("Price is required"),
    city: Yup.string().required("City is required"),
    Km: Yup.number().required("KM is required"),
    Transmission: Yup.string().required("Transmission is required"),
    fuel: Yup.string().required("Fuel is required"),
    phone: Yup.string()
    .required('Phone number is required')
    .test('valid-phone', 'Invalid phone number', (value) => {
      // Define your phone number format regex
      const phoneRegex = /^[+]?[0-9]{12,}$/;
      // Test if the value matches the regex
      return phoneRegex.test(value);
    }),
    year: Yup.number().required("Year is required"),
    type: Yup.string().required("Make is required"),
    AdditionalNotes: Yup.string().required("AdditionalNotes is required"),
  });

  const SellUsedCar = useFormik({
    initialValues: {
      title: "",
      modelCar: "",
      color: "",
      price: "",
      city: "",
      Km: "",
      Transmission: "",
      fuel: "",
      CarAddress: "",
      phone: "+2",
      images: [],
      AdditionalNotes: "",
      year: "",
      type: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(false);
      console.log("Form values:", values);
      values.phone = Number(values.phone);
      values.year = Number(values.year);
      const formData = new FormData();

      // Append each key-value pair from 'values' to the FormData object
      Object.keys(values).forEach((key) => {
        if (key === "images") {
          values[key].forEach((file) => {
            formData.append(key, file); // No need to use an indexed key
          });
        } else {
          formData.append(key, values[key]);
        }
      });

      try {
        console.log("Sending request to backend...");
        const response = await axios.post(
          "https://backend-c6zw.onrender.com/car/sell-used-car",
          formData,
          {
            headers: {
              authorization: `Bearer__${localStorage.getItem("token")}`,
            },
          }
        );
        console.log("Response from backend:", response);
        navigate("/usedCar");
      } catch (error) {
        console.log("Error during request:", error);
        setErrorMsg(error.response?.data?.message || "An error occurred");
        setLoading(true);
      }
    },
  });

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    console.log("Selected files:", files);
    SellUsedCar.setFieldValue("images", [
      ...SellUsedCar.values.images,
      ...files,
    ]);

    // Display selected images in input fields
    const inputId = event.target.id;
    const inputIndex = inputId.split("-")[2];
    const fileReader = new FileReader();
    fileReader.onload = () => {
      const imageElement = document.getElementById(
        `image-preview-${inputIndex}`
      );
      if (imageElement) {
        imageElement.src = fileReader.result;
      }
    };
    fileReader.readAsDataURL(files[0]);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = SellUsedCar.values.images.filter(
      (_, i) => i !== index
    );
    SellUsedCar.setFieldValue("images", updatedImages);

    // Clear input field
    const inputElement = document.getElementById(`file-upload-${index}`);
    if (inputElement) {
      inputElement.value = null;
    }

    // Clear image preview
    const imageElement = document.getElementById(`image-preview-${index}`);
    if (imageElement) {
      imageElement.src = photo;
    }
  };

  const handleMakeChange = (selectedOption) => {
    SellUsedCar.setFieldValue("type", selectedOption.value);
    getSpecificModel(selectedOption.value);
  };

  const handleModelChange = (selectedOption) => {
    SellUsedCar.setFieldValue("modelCar", selectedOption.value);
  };

  const options2 = [
    { value: 2000, label: "2000" },
    { value: 2001, label: "2001" },
    { value: 2003, label: "2003" },
  ];

  const options3 = [
    { value: "Manual", label: "Manual" },
    { value: "Automatic", label: "Automatic" },
  ];

  const options4 = [
    { value: "gas", label: "gas" },
    { value: "Diesel", label: "Diesel" },
    { value: "Solar", label: "Solar" },
    { value: "natural gas", label: "natural gas" },
  ];

  const handleYearChange = (selectedOption) => {
    SellUsedCar.setFieldValue("year", selectedOption.value);
  };

  useEffect(() => {
    getBrands();
    getYears();
  }, []);

  return (
    <>
      <form onSubmit={SellUsedCar.handleSubmit}>
        {/* Images */}
        <div className="container mt-5">
          <div className="card">
            <div className="card-header border-0 bg-transparent pt-3 pb-3">
              <div className="">
                <div className="icon d-flex gap-2 align-items-center">
                  <i className="fa-solid fa-car"></i>
                  <div className="name">
                    <strong>IMAGES</strong>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="row justify-content-around ">
                {[1, 2, 3, 4].map((image, index) => (
                  <div
                    key={index}
                    className="col-xl-2 col-lg-4 col-md-4 col-sm-6 col-6 image p-3"
                  >
                    <label
                      htmlFor={`file-upload-${index}`}
                      className="custom-file-upload "
                    >
                      <img
                        src={photo}
                        id={`image-preview-${index}`}
                        className="uploadImage"
                        alt="Upload Preview"
                      />
                    </label>
                    <input
                      name="images"
                      id={`file-upload-${index}`}
                      type="file"
                      onChange={handleFileChange}
                      multiple
                      style={{ display: "none" }}
                    />
                    {SellUsedCar.values.images[index] && (
                      <button
                        type="button"
                        className="border-0 bg-white text-light mx-1 h-25"
                        onClick={() => handleRemoveImage(index)}
                      >
                        <i className="fa-solid fa-xmark bg-danger p-2 rounded-4"></i>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="container mt-3">
          <div className="card">
            <div className="card-header border-0 bg-transparent pt-3 pb-3">
              <div className="">
                <div className="icon d-flex gap-2 align-items-center">
                  <i className="fa-solid fa-circle-info"></i>
                  <div className="name">
                    <strong>CAR DETAILS</strong>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-12">
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                      Ad. Title
                    </label>
                    <input
                      onChange={SellUsedCar.handleChange}
                      value={SellUsedCar.values.title}
                      name="title"
                      type="text"
                      className="form-control"
                      id="title"
                      placeholder="EX : hyundai accent 2009 cairo automatic"
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                {/* General */}
                <div className="col">
                  <div className="mb-3">
                    <label className="form-label">Make*</label>
                    <Select
                      id="type"
                      name="type"
                      options={newData}
                      onChange={handleMakeChange}
                    />
                    {SellUsedCar.touched.type && SellUsedCar.errors.type ? (
                      <div className="text-danger alert alert-danger my-2">
                        {SellUsedCar.errors.type}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="col">
                  <div className="mb-3">
                    <label className="form-label">Model*</label>
                    <Select
                      id="modelCar"
                      name="modelCar"
                      options={specificModels}
                      onChange={handleModelChange}
                      value={specificModels.find(
                        (option) => option.value === SellUsedCar.values.modelCar
                      )}
                    />
                    {SellUsedCar.touched.modelCar &&
                    SellUsedCar.errors.modelCar ? (
                      <div className="text-danger alert alert-danger my-2">
                        {SellUsedCar.errors.modelCar}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="col-12">
                  <div className="mb-3">
                    <label className="form-label"> Year*</label>
                    <Select
                      id="year"
                      name="year"
                      options={years.map((opt) => ({
                        value: opt,
                        label: opt,
                      }))}
                      className="p-2 w-100 rounded-3"
                      onChange={handleYearChange}
                      placeholder="Year"
                    ></Select>
                    {SellUsedCar.touched.year && SellUsedCar.errors.year ? (
                      <div className="text-danger alert alert-danger my-2">
                        {SellUsedCar.errors.year}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="col">
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                      KM *
                    </label>
                    <input
                      onChange={SellUsedCar.handleChange}
                      name="Km"
                      type="number"
                      className="form-control p-2"
                      id="Km"
                      placeholder="How many Kilometers ?"
                    />{" "}
                    {SellUsedCar.touched.Km && SellUsedCar.errors.Km ? (
                      <div className="text-danger alert alert-danger my-2">
                        {SellUsedCar.errors.Km}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="col">
                  <div className="mb-3">
                    <label className="form-label">City*</label>
                    <Select
                      id="city"
                      name="city"
                      options={cities.map((opt) => ({
                        value: opt,
                        label: opt,
                      }))}
                      onChange={(selectedOption) =>
                        SellUsedCar.setFieldValue("city", selectedOption.value)
                      }
                      value={options2.find(
                        (option) => option.value === SellUsedCar.values.city
                      )}
                    />
                    {SellUsedCar.touched.city && SellUsedCar.errors.city ? (
                      <div className="text-danger alert alert-danger my-2">
                        {SellUsedCar.errors.city}
                      </div>
                    ) : null}
                  </div>
                </div>

                {/* Color Select */}
                <div className="col-12">
                  <div className="mb-3">
                    <label className="form-label">Exterior Color *</label>
                    <Select
                      id="color"
                      name="color"
                      options={colourOptions}
                      onChange={(selectedOption) =>
                        SellUsedCar.setFieldValue("color", selectedOption.value)
                      }
                      value={options2.find(
                        (option) => option.value === SellUsedCar.values.color
                      )}
                    />
                    {SellUsedCar.touched.color && SellUsedCar.errors.color ? (
                      <div className="text-danger alert alert-danger my-2">
                        {SellUsedCar.errors.color}
                      </div>
                    ) : null}
                  </div>
                </div>

                {/* Gearbox */}
                <div className="col">
                  <div className="mb-3">
                    <label className="form-label"> Transmission*</label>
                    <Select
                      id="Transmission"
                      name="Transmission"
                      options={options3}
                      onChange={(selectedOption) =>
                        SellUsedCar.setFieldValue(
                          "Transmission",
                          selectedOption.value
                        )
                      }
                      value={options3.find(
                        (option) =>
                          option.value === SellUsedCar.values.Transmission
                      )}
                    />
                    {SellUsedCar.touched.Transmission &&
                    SellUsedCar.errors.Transmission ? (
                      <div className="text-danger alert alert-danger my-2">
                        {SellUsedCar.errors.Transmission}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="col">
                  <div className="mb-3">
                    <label className="form-label">Fuel*</label>
                    <Select
                      id="fuel"
                      name="fuel"
                      options={options4}
                      onChange={(selectedOption) =>
                        SellUsedCar.setFieldValue("fuel", selectedOption.value)
                      }
                      value={options4.find(
                        (option) => option.value === SellUsedCar.values.fuel
                      )}
                    />{" "}
                    {SellUsedCar.touched.fuel && SellUsedCar.errors.fuel ? (
                      <div className="text-danger alert alert-danger my-2">
                        {SellUsedCar.errors.fuel}
                      </div>
                    ) : null}
                  </div>
                </div>

                {/* Price */}
                <div className="col-12">
                  <div className="mb-3">
                    <label htmlFor="price" className="form-label">
                      Price
                    </label>
                    <input
                      onChange={SellUsedCar.handleChange}
                      name="price"
                      type="number"
                      className="form-control p-2"
                      id="price"
                      placeholder="Price your car"
                    />{" "}
                    {SellUsedCar.touched.price && SellUsedCar.errors.price ? (
                      <div className="text-danger alert alert-danger my-2">
                        {SellUsedCar.errors.price}
                      </div>
                    ) : null}
                    <small>
                      <span className="ps-2">
                        <i className="fa-solid fa-circle-info"></i>
                      </span>
                      Price your car reasonably to ensure a faster sale. Click
                      here for value calculator
                    </small>
                  </div>
                </div>

                {/* Notes */}
                <div className="col-12">
                  <div className="mb-3">
                    <label htmlFor="notes" className="form-label">
                      Additional notes
                    </label>
                    <textarea
                      onChange={SellUsedCar.handleChange}
                      className="form-control"
                      name="AdditionalNotes"
                      id="AdditionalNotes"
                      cols="30"
                      rows="4"
                      placeholder="The more information you provide"
                    ></textarea>
                    {SellUsedCar.touched.AdditionalNotes &&
                    SellUsedCar.errors.AdditionalNotes ? (
                      <div className="text-danger alert alert-danger my-2">
                        {SellUsedCar.errors.AdditionalNotes}
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
                    <label htmlFor="title" className="form-label">
                      Phone*
                    </label>
                    <input
                      required
                      type="text"
                      className="form-control disabled"
                      id="phone"
                      name="phone"
                      value={SellUsedCar.values.phone}
                      onChange={SellUsedCar.handleChange}
                      placeholder="0101212121"
                    />
                    {SellUsedCar.touched.phone && SellUsedCar.errors.phone ? (
                      <div className="text-danger alert alert-danger my-2">
                        {SellUsedCar.errors.phone}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="row">
                  <div className="col-12">
                    <div className="mb-3">
                      <label htmlFor="title" className="form-label">
                        Car address
                      </label>
                      <input
                        id="CarAddress"
                        name="CarAddress"
                        onChange={SellUsedCar.handleChange}
                        type="text"
                        className="form-control"
                        placeholder="The current Address of the car "
                      />
                    </div>
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
                className="btn btn-warning w-100"
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

export default SellCar;
