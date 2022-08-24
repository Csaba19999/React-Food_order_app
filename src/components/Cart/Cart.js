import { Fragment, useContext, useState } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout";
import React from "react";

function Cart(props) {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;
  console.log(cartCtx);
  const cartItemRemoveHandeler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandeler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const orederHandeler = () => {
    setIsCheckout(true);
  };
  const submitOrderHandeler = async (userData) => {
    setIsSubmiting(true);
    await fetch(
      "https://costume-hooks-default-rtdb.europe-west1.firebasedatabase.app/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }
    );
    setIsSubmiting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandeler.bind(null, item.id)}
          onAdd={cartItemAddHandeler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Bezárás
      </button>
      <button
        onClick={orederHandeler}
        disabled={!hasItems}
        className={classes.button}
      >
        Order
      </button>
    </div>
  );

  const cartModalContent = (
    <Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Végösszeg : </span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onConfirm={submitOrderHandeler} onCancel={props.onClose} />
      )}
      {!isCheckout && modalActions}
    </Fragment>
  );

  const isSubmitingModalContent = <p>Sending orderData</p>;

  const didSubmitModalContent = (
    <Fragment>
      <p>Successfully sent order.</p>
      <div className={classes.actions}>
      <button className={classes.button} onClick={props.onClose}>
        Bezárás
      </button>
    </div>
    </Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmiting && !didSubmit && cartModalContent}
      {isSubmiting && isSubmitingModalContent}
      {!isSubmiting && didSubmit && didSubmitModalContent}
    </Modal>
  );
}

export default Cart;
