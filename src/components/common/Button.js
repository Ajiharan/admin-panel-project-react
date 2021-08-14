import React from "react";
import styled from "styled-components";
const Button = ({
  onclick,
  buttonStyle,
  buttonColor,
  buttonSize,
  children,
  disabled,
  childrenIcon,
}) => {
  const SIZE = ["small", "primary", "large"];
  const STYLE = ["default", "outset", "inset"];
  const COLOR = ["#0080ff"];

  const btnStyle = STYLE.includes(buttonStyle) ? buttonStyle : STYLE[0];
  const btnColor = buttonColor || COLOR[0];
  const btnSize = SIZE.includes(buttonSize) ? buttonSize : SIZE[0];

  return (
    <ButtonContainer>
      {childrenIcon && childrenIcon !== "" ? (
        <button
          className={`${btnStyle} ${btnSize} ${
            !disabled ? " btn-enable" : " btn-disable"
          } btn-child`}
          style={{ backgroundColor: `${btnColor}` }}
          onClick={onclick}
          disabled={disabled}
        >
          {childrenIcon}
        </button>
      ) : (
        <button
          className={`${btnStyle} ${btnSize} ${
            !disabled ? " btn-enable" : " btn-disable"
          }`}
          style={{ backgroundColor: `${btnColor}` }}
          onClick={onclick}
          disabled={disabled}
        >
          {children}
        </button>
      )}
    </ButtonContainer>
  );
};

const ButtonContainer = styled.div`
  button {
    border: none;
    padding: 0.8rem;
    color: white;
    border-radius: 10px;
    transition: 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;

    &:hover:enabled {
      transform: scale(1.02);
    }
  }

  .btn-enable {
    cursor: pointer;
  }
  .btn-disable {
    cursor: not-allowed;
  }
  .small {
    padding: 0.5rem;
    font-size: 0.65rem;
    width: 100%;
    min-width: 70px;
  }
  .primary {
    font-size: 0.8rem;
    width: 200px;
  }
  .large {
    font-size: 1.2rem;
    width: 230px;
  }

  @media only screen and (max-width: 460px) {
    .btn-child {
      min-width: auto;
    }
  }
`;

export default Button;
