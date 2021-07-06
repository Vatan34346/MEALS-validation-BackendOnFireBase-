import classes from "./CheckOut.module.css";
import { useRef, useState } from "react";

const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim().length !== 5;

const CheckOut = (props) => {
  const [formInPutValiditi, setFormInputValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });

  const nameInputReference = useRef();
  const streetInputReference = useRef();
  const postalInputReference = useRef();
  const cityInputReference = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputReference.current.value;
    const enteredStreet = streetInputReference.current.value;
    const enteredPosta = postalInputReference.current.value;
    const enteredCity = cityInputReference.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enterePostalCodeIsValid = isFiveChars(enteredPosta);

    setFormInputValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postalCode: enterePostalCodeIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredCityIsValid &&
      enteredStreetIsValid &&
      enterePostalCodeIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConform({
        name: enteredName,
        street: enteredStreet,
        city: enteredCity,
        postalCode: enteredPosta
    })
  };
  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div
        className={`${classes.control} ${
          formInPutValiditi.name ? "" : classes.invalid
        }`}
      >
        <label htmlFor="name">Your Name</label>
        <input ref={nameInputReference} type="text" id="name" />
        {!formInPutValiditi.name && <p>Please enter valid Name</p>}
      </div>

      <div
        className={`${classes.control} ${
          formInPutValiditi.street ? "" : classes.invalid
        }`}
      >
        <label htmlFor="street">Your Street</label>
        <input ref={streetInputReference} type="text" id="street" />
        {!formInPutValiditi.street && <p>Please enter valid Street</p>}
      </div>

      <div
        className={`${classes.control} ${
          formInPutValiditi.postalCode ? "" : classes.invalid
        }`}
      >
        <label htmlFor="code">Postal Code</label>
        <input ref={postalInputReference} type="text" id="code" />
        {!formInPutValiditi.postalCode && <p>Please enter valid Postal code</p>}
      </div>

      <div
        className={`${classes.control} ${
          formInPutValiditi.city ? "" : classes.invalid
        }`}
      >
        <label htmlFor="city">City</label>
        <input ref={cityInputReference} type="text" id="city" />
        {!formInPutValiditi.city && <p>Please enter valid City</p>}
      </div>
      <div className={classes.actions}>
        <button type="submit" className={classes.submit}>
          Confirm
        </button>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CheckOut;
