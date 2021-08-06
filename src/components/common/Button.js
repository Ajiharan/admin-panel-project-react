import React from "react";
import styled from "styled-components";
const Button = ({
  onclick,
  buttonStyle,
  buttonColor,
  buttonSize,
  children,
}) => {
  const SIZE = ["small", "primary", "large"];
  const STYLE = ["default", "outset", "inset"];
  const COLOR = ["#0080ff"];

  const btnStyle = STYLE.includes(buttonStyle) ? buttonStyle : STYLE[0];
  const btnColor = buttonColor || COLOR[0];
  const btnSize = SIZE.includes(buttonSize) ? buttonSize : SIZE[0];

  return (
    <ButtonContainer>
      <button
        className={`${btnStyle} ${btnSize}`}
        style={{ backgroundColor: `${btnColor}` }}
        onClick={onclick}
      >
        {children}
      </button>
    </ButtonContainer>
  );
};

const ButtonContainer = styled.div`
  button {
    border: none;
    padding: 0.8rem;
    cursor: pointer;
    color: white;
    border-radius: 10px;
    transition: 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;

    &:hover {
      transform: scale(1.02);
    }
  }
  .small {
    font-size: 0.6rem;
    width: 120px;
  }
  .primary {
    font-size: 0.8rem;
    width: 200px;
  }
  .large {
    font-size: 1.2rem;
    width: 230px;
  }
`;

export default Button;
