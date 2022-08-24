import React from "react";
import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isFiveChar = (value) => value.trim().length === 5;

function Checkout(props) {
  const [formInputValiditi, setFormInputValiditi] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });
  const nameRef = useRef();
  const streetlRef = useRef();
  const postalCodeRef = useRef();
  const cityRef = useRef();

  const confirmCheckout = (event) => {
    event.preventDefault();
    const enteredName = nameRef.current.value;
    const enteredStreet = streetlRef.current.value;
    const enteredPostalCode = postalCodeRef.current.value;
    const enteredCity = cityRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredPostalCodeIsValid = !isEmpty(enteredPostalCode);
    const enteredCityIsValid = isFiveChar(enteredCity);

    setFormInputValiditi({
        name: enteredNameIsValid,
        street: enteredStreetIsValid,
        postalCode: enteredPostalCodeIsValid,
        city: enteredCityIsValid,
    });

    const formIsValid =
        enteredNameIsValid && enteredStreetIsValid && enteredPostalCodeIsValid && enteredCityIsValid;
    if(!formIsValid){
        return;
    }


    props.onConfirm({
        name: enteredName, 
        street: enteredStreet, 
        city: enteredPostalCode, 
        postalCode: enteredCity
    });
  };

  const nameControlClasses = `${classes.control} ${formInputValiditi.name ? '' : classes.invalid}`
  const streetControlClasses = `${classes.control} ${formInputValiditi.street ? '' : classes.invalid}`
  const postalCodeControlClasses = `${classes.control} ${formInputValiditi.postalCode ? '' : classes.invalid}`
  const cityControlClasses = `${classes.control} ${formInputValiditi.city ? '' : classes.invalid}`


  return (
    <form className={classes.form} onSubmit={confirmCheckout}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input ref={nameRef} type="text" id="name" />
        {!formInputValiditi.name && <p>Please enter your name</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input ref={streetlRef} type="text" id="street" />
        {!formInputValiditi.street && <p>Please enter your street</p>}
      </div>
      <div className={postalCodeControlClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input ref={postalCodeRef} type="text" id="postal" />
        {!formInputValiditi.postalCode && <p>Please enter your postal code</p>}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input ref={cityRef} type="text" id="city" />
        {!formInputValiditi.city && <p>Please enter your city</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
}
export default Checkout;
