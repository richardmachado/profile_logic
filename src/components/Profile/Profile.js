import React, { useEffect, useState } from "react";
import axios from "axios";
// import { userID, name } from "../../utils/decode_jwt";

const BACKEND_API = process.env.REACT_APP_BACKEND;

function Profile(props) {
  const [profile, setProfile] = useState([]);

  let token = localStorage.getItem("token");
  let tokenData = JSON.parse(window.atob(token.split(".")[1]));

  const userID = tokenData.userId;
  const name = tokenData.username;

  useEffect(() => {
    axios
      .get(`${BACKEND_API}/profile/${userID}`)
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
    <div className="body">
      <div className="container">
        <h1 className="display-4 my3">
          <span> </span> Profile for user : {name}
        </h1>
        {profile.map((profile_info) => {
          return (
            <div key={profile_info.id}>
              <h2>{profile_info.first_name} </h2>
              <p>{profile_info.last_name}</p>
              <p>{profile_info.age}</p>
              <p>{profile_info.body3}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Profile;
