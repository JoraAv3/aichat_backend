// Button.tsx
import React from "react";
import Block from "../Block";
import "./index.css";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className,
  disabled,
}) => {
  return (
    <Block
      className={`task-btn ${className || ""} ${disabled ? "disabled" : ""}`}
      onClick={!disabled ? onClick : undefined}
    >
      {children}
    </Block>
  );
};

export default Button;
