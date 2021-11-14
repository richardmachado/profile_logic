import React, { useState, useEffect } from "react";
import axios from "axios";
import AddReading from "./AddReading/AddReading";

const BACKEND_API = process.env.REACT_APP_BACKEND;

export default function Dasboard(props) {
  const [profile, setProfile] = useState([]);
  const [errors, setError] = useState();

  let token = localStorage.getItem("token");
  let tokenData = JSON.parse(window.atob(token.split(".")[1]));

  const userID = tokenData.userId;
  const name = tokenData.username;

  useEffect(() => {
    axios
      .get(`${BACKEND_API}/glucose/${userID}`)
      .then((res) => {
        setProfile(res.data);
      })
      .catch((error) => {
        if (error.response.status === 404) {
          // Request made and server responded
          // console.log(error.response.data
          setError(error.response.data);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
      });
  }, [userID, props.history]);

  return (
    <div>
      <h1>Dashboard</h1>
      <h1>Hi {name}</h1>

      <AddReading />

      {errors ? (
        <h1>There are no readings, please add your first </h1>
      ) : (
        <h1>Here are your readings</h1>
      )}

      {profile.map((profile_info) => {
        return (
          <div key={profile_info.id}>
            <h2>Reading: {profile_info.glucose_reading} </h2>
            <p>Taken at: {profile_info.taken_at} </p>
          </div>
        );
      })}
    </div>
  );
}
