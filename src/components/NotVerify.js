import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { auth } from "../Firebase";
import Button from "./common/Button";

const NotVerify = () => {
  const [message, setMessage] = useState("Authenticating...");
  const [loading, setLoading] = useState(false);

  const [color, setColor] = useState("white");

  const sendVerificationLink = () => {
    setLoading(true);
    // const urlSettings = {
    //   url: "https://admin-panel-demo-8265f.firebaseapp.com/path?confirm_email=true",
    // };
    auth.currentUser
      .sendEmailVerification()
      .then(() => {
        setLoading(false);
        setColor("white");
        setMessage("email verified sucessfully");
      })
      .catch((err) => {
        setLoading(false);
        setColor("red");
        setMessage(err.message);
      });
  };

  useEffect(() => {
    const urlSettings = {
      url: "https://admin-panel-demo-8265f.firebaseapp.com/path?confirm_email=true",
    };
    auth.currentUser
      .sendEmailVerification()
      .then(() => {
        setMessage("email verified sucessfully");
        setColor("white");
      })
      .catch((err) => {
        setMessage(err.message);
        setColor("red");
      });
  }, []);
  return (
    <Container>
      <Wrap>
        <h2>verify your email</h2>
        <p>go to your email inbox, and please verify your email</p>
        <p className="errorMsg" style={{ color: `${color}` }}>
          {message}
        </p>
        <Button
          onclick={sendVerificationLink}
          buttonSize="primary"
          disabled={loading}
        >
          {loading ? "sending" : "Re-send verificaton email"}
        </Button>
      </Wrap>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  place-items: center;
  padding: 2rem;
`;

const Wrap = styled.div`
  width: 50vw;
  height: 35vw;
  background-color: #0f2c3e;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  box-shadow: 12px 12px 24px 0 rgba(0, 0, 0, 0.4),
    -12px -12px 24px 0 rgba(255, 255, 255, 0.8);
  h2 {
    color: white;
    margin: 1rem;
    font-size: 2rem;
    text-transform: uppercase;
  }
  p {
    color: white;
    font-size: 1.2rem;
    margin: 1.5rem;
  }
`;

export default NotVerify;
