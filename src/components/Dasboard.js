import React, { useState, useEffect } from "react";
import axios from "axios";

const BACKEND_API = process.env.REACT_APP_BACKEND;

export default function Dasboard(props) {
  const [profile, setProfile] = useState([]);

  let token = localStorage.getItem("token");
  let tokenData = JSON.parse(window.atob(token.split(".")[1]));

  const userID = tokenData.userId;
  const name = tokenData.username;

  useEffect(() => {
    axios
      .get(`${BACKEND_API}/glucose`)
      .then((res) => {
        setProfile(res.data);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          // Request made and server responded
          props.history.push("/addprofile");
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
      <h1>Dashboard. Hi {name}</h1>
      <h2>My Readings</h2>
      {profile.map((profile_info) => {
        return (
          <div key={profile_info.id}>
            <h2>{profile_info.glucose_reading} </h2>
            <p>{new Date(profile_info.taken_at).toLocaleString()} </p>
          </div>
        );
      })}
    </div>
  );
}
