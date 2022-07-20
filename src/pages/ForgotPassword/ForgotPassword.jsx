import React from "react";
import style from "./ForgotPassword.module.css";

function ForgotPassword() {
  return (
    <div className={style.forgot}>
      <div className={style["forgot-container"]}>
        <div className={style["forgot-head"]}>
          <div className={style["forgot-head-title"]}>
            <h3>Forgot Password</h3>
          </div>
          <div className={style["forgot-head-description"]}>
            <p>No worries,we'll send you reset instructions</p>
          </div>
        </div>
        <div className={style["forgot-body"]}>
          <div className={style["forgot-body-label"]}>Email</div>
          <div className={style["forgot-body-input"]}>
            <input type="text" placeholder="Enter your email" />
          </div>
        </div>
        <div className={style["forgot-btn"]}>
          <button>Reset Password</button>
        </div>
        <div className={style["forgot-back-login"]}>
          <div className={style["forgot-back-icon"]}>
            <i class="fa-solid fa-arrow-left"></i>
          </div>
          <span>Back to login</span>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
