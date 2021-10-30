import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { axiosWithAuth } from "../../utils/axiosWithAuth";

import {
  Login,
  Container,
  Button,
  Body,
  Formgroup,
  Styledform,
  Labels,
  Inputs,
} from "./styles";

const BACKEND_API = process.env.REACT_APP_BACKEND;

export default function AddProfile(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isLoading, setLoading] = useState(false);

  const onSubmit = (data) => {
    setLoading(true);
    axiosWithAuth()
      .post(`${BACKEND_API}/profile`, data)
      .then((res) => {
        console.log(res);
        props.history.push(`/profile`);
      })
      .catch(handleErrors);
  };
  function handleErrors(err) {
    if (err.response) {
      console.log("There was a problem", err.response.status);
      // return <h1>'Invalid username or password', {err.response.status}</h1>;
    } else if (err.request) {
      console.log("There was a big problem with the request");
    } else {
      console.log("error", err.message);
    }
  }

  return (
    <div>
      <Container>
        <Login>You currently don't have a profile, please add one</Login>
        <Body>Enter your info.</Body>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Styledform>
            <Formgroup>
              {/* Start of UserName field */}
              {/* <Labels htmlFor="username"> */}
              First Name
              <Inputs
                type="text"
                name="first_name"
                placeholder="First Name"
                {...register("first_name", {
                  required: true,
                })}
              />
              {/* </Labels> */}
              {errors.first_name && errors.first_name.type === "required" && (
                <h2 style={{ color: "red", marginBottom: "30px" }}>
                  Please enter your First Name
                </h2>
              )}
              {/* End of First Name Field */}
              {/* Start of last name Field */}
              <Labels htmlFor="last_name">
                <span> </span>
                Last Name
              </Labels>
              <Inputs
                placeholder="Last Name"
                name="password"
                {...register("last_name", {
                  required: true,
                })}
              />
              {errors.last_name && errors.last_name.type === "required" && (
                <h3 style={{ color: "red", marginBottom: "30px" }}>
                  Please enter your last name
                </h3>
              )}
              {/* End of last name field  */}
              {/* Start of last name Field */}
              <Labels htmlFor="last_name">
                <span> </span>
                Age
              </Labels>
              <Inputs
                placeholder="Age"
                name="age"
                {...register("age", {
                  required: true,
                })}
              />
              {errors.age && errors.age.type === "required" && (
                <h3 style={{ color: "red", marginBottom: "30px" }}>
                  Please enter your age
                </h3>
              )}
              {/* End of age field  */}
            </Formgroup>

            <div className="footer">
              {!isLoading && <Button>Login</Button>}

              {isLoading && (
                <>
                  <Button>
                    <i disabled={isLoading}>Logging in..</i>
                  </Button>

                  <p>Please allow a few seconds while server wakes up</p>
                </>
              )}
            </div>
          </Styledform>
        </form>
      </Container>
    </div>
  );
}
