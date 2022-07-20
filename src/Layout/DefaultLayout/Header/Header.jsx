import axios from "axios";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../../../GlobalState";
import style from "./Header.module.css";

function Header() {
  const state = useContext(GlobalState);
  const [isLogged, setIsLogged] = state.UserAPI.isLogged;
  const user = state.UserAPI.user[0];
  console.log(user);
  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:8000/account/logout");
      localStorage.clear();
      setIsLogged(false);
      alert("Logout successfully");
      setTimeout(() => {
        window.location.href = "/";
      }, 500);
    } catch (error) {
      alert(error.response.massage);
    }
  };
  return (
    <div className={style.header}>
      <div className={style["header-container"]}>
        <div className={style.logo}>
          <Link to="/">
            <img src="../../../../images/Logo/logo.png" alt="Logo" />
          </Link>
        </div>
        <div className={style.search}>
          <input type="text" placeholder="search products..." />
          <span className={style["btn-search"]}>
            <i className="fas fa-search"></i>
          </span>
        </div>

        <ul className={style["header-right"]}>
          <li className={style.cart}>
            <Link to="/cart">
              <i className="fa-solid fa-cart-shopping"></i>
            </Link>
            <Link to="/cart" className={style["cart-item"]}>
              Cart
            </Link>
          </li>
          {isLogged ? (
            <li className={style.logged}>
              <Link to="#">
                <img
                  src={
                    user.avatar === null
                      ? "./images/Avatar/avatar.jpg"
                      : `http://localhost:8000/images/${user.avatar}`
                  }
                />
              </Link>
              {user.username}
              <div className={style["sub-logged"]}>
                <ul className={style["sub-logged-list"]}>
                  <li className={style["sub-logged-item"]}>
                    <Link to="/profile">My Account</Link>
                  </li>
                  <li
                    className={style["sub-logged-item"]}
                    onClick={handleLogout}
                  >
                    Logout
                  </li>
                </ul>
              </div>
            </li>
          ) : (
            <li>
              <Link to="/login">
                <i className="fa-solid fa-right-to-bracket"></i>
              </Link>
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Header;
