import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../Firebase";
import { setUserLoginDetails } from "../features/auth/UserSlice";
import LodingModal from "./common/LodingModal";
import toast from "react-hot-toast";
import useFormikHandler from "./useHooks/useFormikHandler";
const Login = () => {
  const [loading, setLoading] = useState(false);

  const formik = useFormikHandler(
    setLoading,
    toast,
    auth,
    setUserLoginDetails
  ).formik;
  return (
    <Container>
      {loading && <LodingModal show={loading} />}
      <LoginContainer>
        <Heading>Sign in</Heading>
        <Form onSubmit={formik.handleSubmit}>
          <Wrap>
            <label>Email address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email address"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email ? (
              <p>{formik.errors.email}</p>
            ) : null}
          </Wrap>

          <Wrap>
            <label>Password</label>
            <input
              {...formik.getFieldProps("password")}
              name="password"
              type="password"
              placeholder="**********"
              autoComplete="new-password"
            />
            {formik.touched.password && formik.errors.password ? (
              <p>{formik.errors.password}</p>
            ) : null}
          </Wrap>
          <Bottom>
            <div className="button-design">
              <button type="submit">Login</button>
            </div>

            <Link to="/">Forgot password?</Link>
          </Bottom>
        </Form>
      </LoginContainer>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  place-items: center;
  width: 100vw;
  height: 100vh;
  padding: 1rem;
  position: relative;
`;

const LoginContainer = styled.div`
  display: flex;
  border-top: 4px solid #1ad1ff;
  flex-direction: column;
  align-items: center;
  width: 50vw;
  border-radius: 5px;
  height: 70vh;
  background-color: #f7f7f7;
  box-shadow: rgb(0 0 0 / 20%) 1px 2px 12px 1px;
  @media only screen and (max-width: 760px) {
    width: 70vw;
    height: 75vh;
  }
`;
const Form = styled.form`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  width: 18rem;
  padding: 1rem 0.2rem;
  margin: 1rem 0.5rem;
  @media only screen and (max-width: 760px) {
    width: 16rem;
    padding: 0.8rem 0.1rem;
  }
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
  p {
    margin-top: 2px;
    color: red;
    font-weight: 500;
    font-size: 0.9rem;
  }
  label {
    font-size: 1.2rem;
    color: #585a5a;
  }
  input {
    border-left: 4px solid lightblue;
    letter-spacing: 1.3px;
    border-radius: 4px;
    padding: 0.7rem;
    width: 90%;
    margin-top: 10px;
    &:focus {
      outline: 0;
    }
  }
  @media only screen and (max-width: 760px) {
    p {
      font-weight: 500;
      font-size: 0.8rem;
    }
    label {
      font-size: 0.9rem;
    }
    input {
      border-left: 4px solid lightblue;
      letter-spacing: 1.1px;
      border-radius: 4px;
      padding: 0.5rem;
      width: 90%;
      margin-top: 8px;
    }
  }
`;
const Bottom = styled.div`
  display: flex;
  margin: 1rem 0;
  align-items: center;
  justify-content: space-around;

  button {
    text-transform: uppercase;
    color: white;
    width: 7rem;

    height: 2rem;
    padding: 0.5rem 0.5rem;
    border: none;
    background-color: #1aa3ff;
    border-radius: 4px;
    cursor: pointer;
    z-index: 1;
    position: relative;

    &:before {
      content: "";
      width: 0rem;
      top: 0;
      border-radius: 0 15px 25px 0;
      height: 2rem;
      z-index: -1;
      left: 0;
      transition: 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
      opacity: 1;
      position: absolute;
      background-color: #33bbff;
    }
  }
  .button-design {
    &:hover {
      button {
        font-weight: 600;
      }
      button:before {
        width: 6rem;
      }
    }
  }
  a {
    text-decoration: none;
    color: #3f3f40;
  }
`;
const Heading = styled.h2`
  text-transform: uppercase;
  color: gray;
  display: flex;
  justify-content: center;
  margin: 1rem 0;
  align-items: center;
`;

export default React.memo(Login);
