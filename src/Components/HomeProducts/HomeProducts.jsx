import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import Loading from "../Loading/Loading";
import HomeProduct from './../HomeProduct/HomeProduct';

export default function HomeProducts() {

    const [newData, setNewData] = useState([]);
    let [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
  
    async function getProducts() {
      setLoading(false);
      let data = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/products"
      );
      if (data.status == 200) {
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
       <div className="row">
        {newData
          .filter((item) => {
            return search.toLowerCase() === ""
              ? item
              : item.title.toLowerCase().includes(search);
          })
          .map((item) => {
            return <HomeProduct item={item} key={item.id} />;
          })}
      </div>
    </>
  )
}
