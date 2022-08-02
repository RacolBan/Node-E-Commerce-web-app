import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import style from "./Search.module.css";

function Search({ handleAddProducts }) {
  const [showResult, setShowResult] = useState([]);
  const { search } = useLocation();
  const { query } = useMemo(() => {
    const query = new URLSearchParams(search).get("query") || "";
    return {
      query: query,
    };
  }, [search]);
  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8000/product/search?query=${query}`
        );
        setShowResult(data.foundProducts);
      } catch (error) {
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    };
    getProducts();
  }, [query]);

  return (
    <div className={style.search}>
      <div className={style.container}>
        <div className={`${style.content} row`}>
          {showResult?.map((product, index) => (
            <div className={`${style.cover} col l-2-4`} key={index}>
              <div className={`${style.item} `}>
                <Link
                  to={`/detail/${product.id}`}
                  className={style["item-image"]}
                >
                  <img
                    src={`http://localhost:8000/${product.image}`}
                    alt="Apple"
                  />
                </Link>
                <span className={style["item-manufactory"]}>
                  {product.manufactureId === 2 && (
                    <img src="../../../images/Manufactory/asus.PNG" alt="" />
                  )}
                  {product.manufactureId === 1 && (
                    <img src="../../../images/Manufactory/dell.PNG" alt="" />
                  )}
                </span>
                <h4 className={style["item-name"]}>{product.name}</h4>
                <span className={style["item-price"]}>${product.price}</span>
                <span
                  className={style["btn-addCart"]}
                  onClick={() => {
                    handleAddProducts(product);
                  }}
                >
                  Add To Cart
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Search;
