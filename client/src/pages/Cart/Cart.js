import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import style from "./Cart.module.css";

function Cart({ cartItems, setCartItems }) {
  const [total, setTotal] = useState(0);
  const login = JSON.parse(localStorage.getItem("login")) || null;
  useEffect(() => {
    const getTotal = () => {
      const tt = cartItems.reduce((prev, item) => {
        return prev + item.price * item.quantity;
      }, 0);
      setTotal(tt);
    };
    getTotal();
  }, [cartItems]);

  const increase = (id) => {
    cartItems.forEach((element) => {
      if (element.id === id) {
        element.quantity += 1;
      }
    });
    setCartItems([...cartItems]);
  };

  const decrease = (id) => {
    cartItems.forEach((element) => {
      if (element.id === id) {
        element.quantity === 1
          ? (element.quantity = 1)
          : (element.quantity -= 1);
      }
    });
    setCartItems([...cartItems]);
  };

  const handleDelete = async (id) => {
    if (login) {
      if (window.confirm("Do you want to delete this product?")) {
        try {
          const { data } = await axios.delete(
            `http://localhost:8000/cart/users/${login.userId}/products/${id}`
          );
          cartItems.forEach((item, index) => {
            if (item.id === id) {
              cartItems.splice(index, 1);
            }
          });
          setCartItems([...cartItems])
          toast.success(data.message, {
            position: toast.POSITION.TOP_CENTER,
          });
        } catch (error) {
          toast.error(error.response.data.message, {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      }
    }
  };

  return (
    <div className={style.cart}>
      <div className={style.container}>
        <div className={style["list-orders"]}>
          {cartItems.map((cart) => (
            <div className={style["list-orders-item"]} key={cart.id}>
              <div className={style["list-orders-item-img"]}>
                <img src={`http://localhost:8000/${cart.image}`} alt="image" />
              </div>
              <div className={style["list-orders-item-content"]}>
                <span className={style.name}>{cart.name}</span>
                <span className={style.description}>{cart.description}</span>
              </div>
              <div className={style["list-orders-item-price"]}>
                <span>${cart.price}</span>
              </div>
              <div className={style["list-orders-item-quantity"]}>
                <div className={style["list-orders-item-up-down"]}>
                  <span
                    className={style["quantity-change"]}
                    onClick={() => {
                      decrease(cart.id);
                    }}
                  >
                    -
                  </span>
                  <span className={style["quantity"]}>{cart.quantity}</span>
                  <span
                    className={style["quantity-change"]}
                    onClick={() => {
                      increase(cart.id);
                    }}
                  >
                    +
                  </span>
                </div>
                <button
                  onClick={() => {
                    handleDelete(cart.id);
                  }}
                >
                  X
                </button>
              </div>
            </div>
          ))}

          <div className={style["list-orders-total"]}>
            <span className={style["total-left"]}>Total: </span>
            <span className={style["total-right"]}>${total}</span>
          </div>
        </div>
        <div className={style.checkout}>
          <span>Purchase</span>
        </div>
      </div>
    </div>
  );
}

export default Cart;
