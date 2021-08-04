import React from "react";
import styled from "styled-components";
const Login = () => {
  return (
    <Container>
      <LoginContainer>
        <Heading>Sign in</Heading>
        <Form></Form>
      </LoginContainer>
    </Container>
  );
};

const Form = styled.form``;
const Heading = styled.h2`
  text-transform: uppercase;
  color: gray;
  display: flex;
  justify-content: center;
  margin: 1rem 0;
  align-items: center;
`;

const Container = styled.div`
  display: grid;
  place-items: center;
  width: 100vw;
  height: 100vh;
  padding: 1rem;
`;

const LoginContainer = styled.div`
  width: 60vw;
  border-radius: 5px;
  height: 80vh;
  background-color: #f7f7f7;
  box-shadow: rgb(0 0 0 / 20%) 1px 2px 12px 1px;
`;

export default Login;
