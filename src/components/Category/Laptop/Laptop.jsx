import React, { useContext } from "react";
import style from "./Laptop.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { GlobalState } from "../../../GlobalState";

function Apple() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  const state = useContext(GlobalState);
  const productsLaptop = state.ProductsLaptop.productsLaptop[0];
  return (
    <div className={style.wrapper}>
      <div className={style.head}>
        <h3>Laptop</h3>
        <Link to="#">
          See all
          <i className="fa fa-angle-double-right"></i>
        </Link>
      </div>
      <Slider {...settings}>
        {productsLaptop.map((product, index) => (
          //
          <div className={style.item} key={index}>
            <Link to={`/detail/${product.id}`} className={style["item-image"]}>
              <img src={product.image} alt="Apple" />
            </Link>
            <span className={style["item-manufactory"]}>
              <img src='./images/Manufactory/laptop.png' alt="" />
            </span>
            <h4 className={style["item-name"]}>{product.title}</h4>
            <span className={style["item-price"]}>{product.price}</span>
            <span className={style["btn-addCart"]}>Add To Cart</span>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Apple;
