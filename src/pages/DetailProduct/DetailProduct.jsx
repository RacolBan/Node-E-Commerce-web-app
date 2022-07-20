import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GlobalState } from "../../GlobalState";
import style from "./DetailProduct.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function DetailProduct() {
  const params = useParams();
  const state = useContext(GlobalState);
  const products = state.ProductsAll.productsAll[0];
  const [productDetail, setProductDetail] = useState([]);

  const getOneProduct = async () => {
    const res = await axios.get(
      `https://fakestoreapi.com/products/${params.id}`
    );

    setProductDetail(res.data);
  };

  useEffect(() => {
    if (params.id) {
      getOneProduct();
    }
  }, [params.id]);

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
  return (
    <div className={style.detail}>
      <div className={style.container}>
        <div className={style["container-left"]}>
          <img src={productDetail.image} alt="image-product" />
        </div>
        <div className={style["container-right"]}>
          <h3 className={style["container-right-title"]}>
            {productDetail.title}
          </h3>
          <p className={style["container-right-description"]}>
            {productDetail.description}
          </p>
          <p className={style["container-right-price"]}>
            {`${productDetail.price} đ`}
          </p>
          <button>Add To Cart</button>
        </div>
      </div>
      <div className={style.wrapper}>
        <div className={style.head}>
          <h3>Related Products</h3>
        </div>
        <div className={style["listItem"]}>
          <Slider {...settings}>
            {products.map((product, index) =>
              product.category === productDetail.category ? (
                <div className={style.item} key={index}>
                  <Link
                    to={`/detail/${product.id}`}
                    className={style["item-image"]}
                  >
                    <img src={product.image} alt="Apple" />
                  </Link>
                  <span className={style["item-manufactory"]}>
                    <img src="./images/Manufactory/apple.png" alt="" />
                  </span>
                  <h4 className={style["item-name"]}>{product.title}</h4>
                  <span className={style["item-price"]}>{product.price}</span>
                  <span className={style["btn-addCart"]}>Add To Cart</span>
                </div>
              ) : null
            )}
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default DetailProduct;
