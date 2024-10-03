// Block.tsx
import React from "react";
import "./index.css";

interface BlockProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const Block: React.FC<BlockProps> = ({
  children,
  className,
  style,
  ...rest
}) => {
  return (
    <div className={`block ${className || ""}`.trim()} style={style} {...rest}>
      {children}
    </div>
  );
};

export default Block;
