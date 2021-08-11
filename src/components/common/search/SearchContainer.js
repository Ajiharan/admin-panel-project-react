import React from "react";
import styled from "styled-components";

const SearchContainer = () => {
  return (
    <Search>
      <i className="fas fa-search"></i>
      <input type="search" className="search-input" />
    </Search>
  );
};

const Search = styled.div`
  flex: 1 1;
  background-color: #f7f7f7;
  padding: 8px;
  border-radius: 20px;
  border: 1px solid lightgray;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  .search-input {
    width: 100%;
    padding: 4px;
    background-color: #f7f7f7;
    &:focus {
      outline: none;
    }
  }
`;

export default SearchContainer;
