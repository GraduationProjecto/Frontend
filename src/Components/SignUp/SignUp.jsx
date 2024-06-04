import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  let navigate = useNavigate();

  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(true);

  // Yup Library

  function validationSchema() {
    let schema = new yup.object({
      name: yup.string().min(2).max(20).required(),
      email: yup.string().email().required(),
      password: yup
        .string()
        .matches(/^[A-Z][A-Za-z0-9@]{6,}$/, "Password InValid")
        .required(),
    });
    return schema;
  }

  let register = useFormik({
    initialValues: {
      password: "",
      name: "",
      email: "",
    },
    validationSchema,
    onSubmit: (values) => {
      setLoading(false);
      axios
        .post("https://backend-c6zw.onrender.com/user/SignUp", values)
        .then((data) => {
          console.log(data);
          navigate("/signIn");
        })
        .catch((err) => {
          setErrorMsg(err.response.data.message);
          setLoading(true);
        });
    },
  });
  // console.log(register.errors);
  return (
    <>
      <div className="container">
        <div className="w-75 my-5 p-4 m-auto  bg-body rounded-3">
          <h2>Register Now :</h2>
          <form onSubmit={register.handleSubmit}>
            <label htmlFor="name" className="my-1 mt-3">
              Name :
            </label>
            <input
              id="name"
              onBlur={register.handleBlur}
              onChange={register.handleChange}
              name="name"
              type="text"
              className="form-control"
              value={register.values.name}
            />
            {register.errors.name && register.touched.name ? (
              <div className="alert alert-danger my-2 p-4">
                {register.errors.name}
              </div>
            ) : (
              ""
            )}
            <label htmlFor="name" className="my-1 mt-3">
              Email :
            </label>
            <input
              id="email"
              onBlur={register.handleBlur}
              name="email"
              type="email"
              className="form-control"
              onChange={register.handleChange}
              value={register.values.email}
            />
            {register.errors.email && register.touched.email ? (
              <div className="alert alert-danger my-2 p-4">
                {register.errors.email}
              </div>
            ) : (
              ""
            )}
            <label htmlFor="password" className="my-1 mt-3">
              Password :
            </label>
            <input
              id="password"
              onBlur={register.handleBlur}
              name="password"
              type="password"
              className="form-control"
              onChange={register.handleChange}
              value={register.values.password}
            />
            {register.errors.password && register.touched.password ? (
              <div className="alert alert-danger my-2 p-4">
                {register.errors.password}
              </div>
            ) : (
              ""
            )}

            {errorMsg ? (
              <div className="alert alert-danger my-2 p-4">{errorMsg}</div>
            ) : (
              ""
            )}
            <button
              disabled={!(register.dirty && register.isValid)}
              type="submit"
              className="btn submitBtn my-4 "
            >
              {loading ? "signUp" : <i className="fa  fa-spinner fa-spin"></i>}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
