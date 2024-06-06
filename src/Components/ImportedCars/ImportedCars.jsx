import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import Loading from "../Loading/Loading";
import ImportedCar from "../ImportedCar/ImportedCar";

export default function ImportedCars() {
  const [newData, setNewData] = useState([]);
  let [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  async function getProducts() {
    setLoading(false);
    let data = await axios.get(
      "http://localhost:8080/car/Home", {
        headers: {
          authorization: `Bearer__${localStorage.getItem("token")}`,
        },
      }
    );
    console.log(data.data);
    if (data?.status == 200) {
      setNewData(data?.data?.data);
      setLoading(true);
    }
  }
  useEffect(() => {
    getProducts();
  }, []);

  if (!loading) return <Loading />;

  return (
    <>
      <div className="container">
        <div className="home p-5">
          <div className="firstSection">
            <div className="my-5">
              <p className="titleHome">RecommendedCar Cars</p>
              <hr></hr>
            </div>
          </div>
          <div className="row">
            {newData.map((item) => {
                return <ImportedCar item={item} key={item.id} />;
              })}
          </div>
        </div>
      </div>
    </>
  );
}
