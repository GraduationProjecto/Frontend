import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";
import axios from "axios";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function SignIn() {
  let navigate = useNavigate();

  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(true);

  // Yup Library

  function validationSchema() {
    let schema = new yup.object({
      email: yup.string().email().required(),
      password: yup
        .string()
        .matches(/^[A-Z][A-Za-z0-9@]{6,}$/, "Password InValid")
        .required(),
    });
    return schema;
  }

  let Login = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      setLoading(false);
      axios
        .post("https://backend-c6zw.onrender.com/user/login", values)
        .then((data) => {
          localStorage.setItem("token", data.data.data);
          navigate("/");
        })
        .catch((err) => {
          setErrorMsg(err.response.data.message);
          setLoading(true);
        });
    },
  });
  return (
    <>
      <div className="container">
        <div className="w-75 m-auto bg-body p-4 rounded-3 my-5 loginPage">
          <h2>Login Now :</h2>
          <form onSubmit={Login.handleSubmit}>
            <label htmlFor="name" className="my-1 mt-3">
              Email :
            </label>
            <input
              onBlur={Login.handleBlur}
              id="email"
              name="email"
              type="email"
              className="form-control"
              onChange={Login.handleChange}
              value={Login.values.email}
            />

            {Login.errors.email && Login.touched.email ? (
              <div className="alert alert-danger my-2 p-4">
                {Login.errors.email}
              </div>
            ) : (
              ""
            )}
            <label htmlFor="password" className="my-1 mt-3">
              Password :
            </label>
            <input
              id="password"
              onBlur={Login.handleBlur}
              name="password"
              type="password"
              className="form-control"
              onChange={Login.handleChange}
              value={Login.values.password}
            />

            {Login.errors.password && Login.touched.password ? (
              <div className="alert alert-danger my-2 p-4">
                {Login.errors.password}
              </div>
            ) : (
              ""
            )}

            {errorMsg ? (
              <div className="alert alert-danger my-2 p-4">{errorMsg}</div>
            ) : (
              ""
            )}
            <div className="d-flex justify-content-between align-items-center">
              <button
                disabled={!(Login.dirty && Login.isValid)}
                type="submit"
                className="btn submitBtn my-4 "
              >
                {loading ? (
                  "signin"
                ) : (
                  <i className="fa  fa-spinner fa-spin"></i>
                )}
              </button>
              <NavLink
                className="text-main fw-bold fs-6 bg-main text-light p-2 rounded-2"
                to="/signUp"
              >
                SignUp
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
