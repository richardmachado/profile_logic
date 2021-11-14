import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { axiosWithAuth } from "../../utils/axiosWithAuth";

import "./styles";

const BACKEND_API = process.env.REACT_APP_BACKEND;

export default function AddReading(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // setLoading(true);
    axiosWithAuth()
      .post(`${BACKEND_API}/glucose`, data)
      .then((res) => {
        // console.log(res)
        props.history.push(`/profile/`);
      })
      .catch(handleErrors);
  };
  function handleErrors(err) {
    if (err.response.status === 403) {
      console.log("There was a problem", err.response.status);
      // setError(err.response.data);
    } else if (err.response.status === 401) {
      console.log("There was a problem", err.response.status);
      // setBadLogin(err.response.data);
    } else if (err.request) {
      console.log("There was a big problem with the request");
    } else {
      console.log("error", err.message);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" name="glucose_reading" placeholder="reading" />
      </form>
    </div>
  );
}
