import React from "react";
import styled from "styled-components";
import LodingModal from "../common/LodingModal";
import useFormValidator from "../useHooks/useFormValidator";

const FormContainer = () => {
  const { Formik, loading } = useFormValidator();
  const formik = Formik;
  return (
    <React.Fragment>
      {loading && (
        <LodingModal show={loading} message="verifying user details.." />
      )}
      <Form onSubmit={formik.handleSubmit}>
        <Wrap>
          <label> Username</label>
          <input
            type="text"
            name="username"
            placeholder="Enter Username"
            {...formik.getFieldProps("username")}
          />
          {formik.touched.username && formik.errors.username ? (
            <p>{formik.errors.username}</p>
          ) : null}
        </Wrap>
        <Wrap>
          <label> Email address</label>
          <input
            type="email"
            name="email"
            placeholder="Enter  email address"
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
            <button type="submit">Create User</button>
          </div>
        </Bottom>
      </Form>
    </React.Fragment>
  );
};

const Form = styled.form`
  padding: 1rem 2rem;
  margin-bottom: 50px;
  width: 400px;
  min-height: 30rem;
  display: flex;
  border: 1px solid lightgray;
  border-top: 5px solid coral;
  background-color: #fcfcfc;
  box-shadow: 1px 2px 2px lightgray;
  flex-direction: column;
  justify-content: flex-start;
  border-radius: 5px;
  @media only screen and (max-width: 760px) {
    width: 100%;
    padding: 0 3rem;
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
    color: black;
  }
  input {
    border-left: 4px solid lightblue;
    letter-spacing: 1.3px;
    border-radius: 4px;
    padding: 0.7rem;
    background-color: lightgray;
    margin-top: 10px;
    &:focus {
      outline: 0;
    }
  }
`;
const Bottom = styled.div`
  display: flex;
  margin: 1rem 0;
  align-items: center;

  button {
    text-transform: uppercase;
    color: white;
    width: auto;
    height: 2rem;
    transition: 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
    border: none;
    background-color: #1aa3ff;
    border-radius: 4px;
    cursor: pointer;
    z-index: 1;
    position: relative;

    /* &:before {
      content: "";
      width: 0rem;
      top: 0;
      border-radius: 0 15px 25px 0;
      height: 2rem;
      z-index: -1;
      left: 0;
     
      opacity: 1;
      position: absolute;
      background-color: #33bbff;
    } */
  }
  .button-design {
    &:hover {
      button {
        opacity: 0.9;
      }
    }
  }
  a {
    text-decoration: none;
    color: #3f3f40;
  }
`;
export default FormContainer;
