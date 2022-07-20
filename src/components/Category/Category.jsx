import React from "react";
import { Link } from "react-router-dom";
import style from "./Category.module.css";

function CategoryProduct() {
  return (
    <div className={`l-10 ${style["header-menu"]}`}>
      <div className="row no-gutters">
        <div className={style.menu}>
          <div className={style["menu-left"]}>
            <i className="fas fa-bars"></i>
            Category
          </div>
          <div className={style["menu-nav"]}>
            <ul className={style["menu-list"]}>
              <li className={style["menu-item"]}>
                <img src="./images/Icon/MTXT.png" alt="MTXT" />
                <Link to="">Laptop</Link>
                {/* <div className={style["sub-menu"]}>
                        <ul className={style["sub-menu-list"]}>
                          <li className={style["sub-menu-list-item"]}>
                            <Link to="">Máy tính Dell</Link>
                          </li>
                          <li className={style["sub-menu-list-item"]}>
                            <Link to="">Máy tính Asus</Link>
                          </li>
                          <li className={style["sub-menu-list-item"]}>
                            <Link to="">Máy tính Acer</Link>
                          </li>
                          <li className={style["sub-menu-list-item"]}>
                            <Link to="">Máy tính HP</Link>
                          </li>
                          <li className={style["sub-menu-list-item"]}>
                            <Link to="">Máy tính Lenovo</Link>
                          </li>
                        </ul>
                    </div> */}
              </li>
              <li className={style["menu-item"]}>
                <img src="./images/Icon/AppleCenter.png" alt="AppleCenter" />
                <Link to="">Apple Center</Link>
                {/* <div className={style["sub-menu"]}>
                        <ul className={style["sub-menu-list"]}>
                          <li className={style["sub-menu-list-item"]}>
                            <Link to="">Macbook Air</Link>
                          </li>
                          <li className={style["sub-menu-list-item"]}>
                            <Link to="">Macbook Pro</Link>
                          </li>
                        </ul>
                    </div> */}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryProduct;
