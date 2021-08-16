import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { auth } from "../Firebase";
import Button from "./common/Button";
import useSignOut from "./useHooks/useSignOut";

const NotVerify = () => {
  const [message, setMessage] = useState("Authenticating...");
  const [loading, setLoading] = useState(false);

  const [color, setColor] = useState("white");
  const { logout } = useSignOut();
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
    // const urlSettings = {
    //   url: "https://admin-panel-demo-8265f.firebaseapp.com/path?confirm_email=true",
    // };
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
        <i
          className="fas fa-chevron-circle-left back-btn"
          onClick={() => {
            logout();
          }}
        ></i>
        <h2>verify your email</h2>
        <p>go to your email inbox, and please verify your email</p>
        <p className="errorMsg" style={{ color: `${color}` }}>
          {message}
        </p>
        <div className="primary-btn">
          <Button
            onclick={sendVerificationLink}
            buttonSize="primary"
            disabled={loading}
          >
            {loading ? "sending" : "Re-send verificaton email"}
          </Button>
        </div>

        <div className="small-btn">
          <SmallButton onclick={sendVerificationLink} disabled={loading}>
            {loading ? "sending" : "Re-send verificaton email"}
          </SmallButton>
        </div>
      </Wrap>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  place-items: center;
  padding: 2rem;
  @media only screen and (max-width: 960px) {
    padding: 1.5rem;
  }

  @media only screen and (max-width: 760px) {
    padding: 1rem;
  }
  @media only screen and (max-width: 760px) {
    padding: 0.8rem;
  }
`;
const SmallButton = styled(Button)``;
const Wrap = styled.div`
  width: 50vw;
  padding: 1rem;
  background-color: #0f2c3e;
  display: flex;
  flex-direction: column;
  align-items: center;

  border-radius: 15px;
  box-shadow: 12px 12px 24px 0 rgba(0, 0, 0, 0.4),
    -12px -12px 24px 0 rgba(255, 255, 255, 0.8);
  .back-btn {
    align-self: flex-start;
    font-size: 1.7rem;
    color: white;
    cursor: pointer;
    transition: 0.3s cubic-bezier(0.075, 0.82, 0.165, 1) 0s;
    &:hover {
      color: coral;
    }
  }
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
  .small-btn {
    display: none;
  }

  @media only screen and (max-width: 960px) {
    width: 60vw;

    h2 {
      margin: 0.8rem;
      font-size: 1.6rem;
    }
    p {
      font-size: 1rem;
      margin: 1.1rem;
    }
  }
  @media only screen and (max-width: 760px) {
    width: 70vw;

    h2 {
      margin: 0.6rem;
      font-size: 1.2rem;
    }
    p {
      font-size: 0.8rem;
      margin: 0.8rem;
    }
  }
  @media only screen and (max-width: 560px) {
    .small-btn {
      display: block;
    }
    .primary-btn {
      display: none;
    }
  }
  @media only screen and (max-width: 460px) {
    width: 80vw;

    h2 {
      margin: 0.4rem;
      font-size: 1rem;
    }
    p {
      font-size: 0.6rem;
      margin: 0.6rem;
    }
  }
`;

export default NotVerify;
