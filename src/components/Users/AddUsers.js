import React, { useRef, useState } from "react";

import Wrapper from "../Helpers/Wrapper";
import ErrorModal from "../UI/ErrorModal";
import Card from "../UI/Card";
import Button from "../UI/Button";

import classes from "./AddUsers.module.css";

const AddUser = (props) => {
  const nameInput = useRef();
  const ageInput = useRef();

  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();
    const nameInputValue = nameInput.current.value;
    const ageInputValue = ageInput.current.value;

    if (
      nameInputValue.trim().length === 0 ||
      ageInputValue.trim().length === 0
    ) {
      setError({
        title: "Invalid input",
        message: "Please enter a valid name & age.",
      });
      return;
    }
    if (+ageInputValue < 1) {
      setError({
        title: "Invalid age",
        message: "Please enter a valid age.",
      });
      return;
    }
    props.onAddUser(nameInputValue, ageInputValue);
    nameInput.current.value = "";
    ageInput.current.value = "";
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <Wrapper>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input id="username" type="text" ref={nameInput} />
          <label htmlFor="age">Age (Years)</label>
          <input id="age" type="text" ref={ageInput} />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </Wrapper>
  );
};

export default AddUser;
