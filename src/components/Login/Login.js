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
  PwdContainer,
  PwdImage,
} from "./styles";

import showPwdImg from "./show-password.svg";
import hidePwdImg from "./hide-password.svg";
// import Nav from "./Nav/Nav";

const BACKEND_API = process.env.REACT_APP_BACKEND;


export default function LoginForm(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isLoading, setLoading] = useState(false);
  const [isRevealPwd, setIsRevealPwd] = useState(false);

  const onSubmit = ( data ) => {
    setLoading(true);
    axiosWithAuth()
      .post(`${BACKEND_API}/api/auth/login`, data)
      .then( ( res ) => {
        // console.log(res)
        localStorage.setItem("token", res.data.token);
        props.history.push(`/profile/`);
      })
      .catch(handleErrors);
  };
  function handleErrors(err) {
    if (err.response) {
      // console.log("There was a problem", err.response.status);
      return <h1>'Invalid username or password', {err.response.status}</h1>;
    } else if (err.request) {
      console.log("There was a big problem with the request");
    } else {
      console.log("error", err.message);
    }
  }

  return (
    <div>
      {/* <Nav /> */}

      <Container>
        <Login>Login</Login>
        <Body>Enter your username and password.</Body>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Styledform>
            <Formgroup>
              {/* Start of UserName field */}
              {/* <Labels htmlFor="username"> */}
              User Name
              <Inputs
                type="text"
                name="username"
                placeholder="username"
                {...register("username", {
                  required: true,
                  minLength: 3,
                  maxLength: 10,
                })}
              />
              {/* </Labels> */}
              {errors.username && errors.username.type === "required" && (
                <h2 style={{ color: "red", marginBottom: "30px" }}>
                  Please enter a username
                </h2>
              )}
              {errors.username && errors.username.type === "minLength" && (
                <h2 style={{ color: "red", marginBottom: "30px" }}>
                  Username is too short
                </h2>
              )}
              {errors.username && errors.username.type === "maxLength" && (
                <h2 style={{ color: "red", marginBottom: "30px" }}>
                  Username is too long
                </h2>
              )}
              {/* End of UserName Field */}
              {/* Start of Password Field */}
              <Labels htmlFor="password">
                <span> </span>
                Password
              </Labels>
              <PwdContainer>
                <Inputs
                  type={isRevealPwd ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  {...register("password", {
                    required: true,
                    minLength: 7,
                    maxLength: 7,
                  })}
                />
                {errors.password && errors.password.type === "required" && (
                  <h3 style={{ color: "red", marginBottom: "30px" }}>
                    Password is required
                  </h3>
                )}
                {errors.password && errors.password.type === "minLength" && (
                  <h3 style={{ color: "red", marginBottom: "30px" }}>
                    Password is too short - 7 characters
                  </h3>
                )}
                {/* End of password field  */}
                <PwdImage
                  title={isRevealPwd ? "Hide password" : "Show password"}
                  src={isRevealPwd ? hidePwdImg : showPwdImg}
                  onClick={() => setIsRevealPwd((prevState) => !prevState)}
                />
              </PwdContainer>
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