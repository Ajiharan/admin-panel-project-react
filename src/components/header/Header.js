import React from "react";

import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../common/Button";
import useSignOut from "../useHooks/useSignOut";

const Header = () => {
  return (
    <Navbar>
      <Link to="/" className="app-logo">
        Logo
      </Link>
      <Paths>
        <Link to="/">Users</Link>
        <Link to="/">Entries</Link>
        <Link to="/">Trash</Link>
      </Paths>
      <div className="button-container">
        <Button
          onclick={useSignOut().logout}
          buttonSize="small"
          buttonColor="#ff6666"
        >
          Logout
        </Button>
      </div>
    </Navbar>
  );
};

const Navbar = styled.nav`
  width: 100vw;
  background-color: #2d5986;
  height: 60px;
  display: flex;
  align-items: center;

  .app-logo {
    flex: 1 1;
    margin-left: 10px;
    text-decoration: none;
    color: white;
  }
  .button-container {
    margin-right: 20px;
  }
`;

const Paths = styled.div`
  width: 55vw;
  display: grid;
  grid-template-columns: repeat(4, auto);
  justify-content: end;
  a {
    text-decoration: none;
    color: white;
    font-size: 1rem;
    margin: 0 10px;
    text-transform: uppercase;
    transition: all ease-in 250ms;
    &:hover {
      color: #d9d9d9;
    }
  }
`;
export default Header;
