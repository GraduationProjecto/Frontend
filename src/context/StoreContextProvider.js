import axios from "axios";
import React, { useState } from "react";
import { createContext } from "react";

export let storeContext = createContext(0);

export default function StoreContextProvider({ children }) {
  const [response, setResponse] = useState([]);

  function pay(cartId, shippingAddress) {
    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/orders/checkout-session/" +
          cartId,
        { shippingAddress },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      )
      .then((data) => data)
      .catch((err) => err);
  }

  const handleSubmit = async (event) => {
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
    console.log(queryString);
    const url = `https://backend-c6zw.onrender.com/car/search?${queryString}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setResponse(data);
      return data; // Return the data here
    } catch (error) {
      console.error("Error fetching data:", error);
      return null; // Return null or an empty object if there's an error
    }
  };

  return (
    <storeContext.Provider
      value={{
        pay,

        response,
        setResponse,
        handleSubmit,
      }}
    >
      {children}
    </storeContext.Provider>
  );
}
