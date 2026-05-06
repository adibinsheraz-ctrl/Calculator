"use client";

import React, { useState } from "react";
import { SoundManager } from "./SoundManager";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "elevated" | "elevated-primary" | "elevated-tertiary";
  className?: string;
}

export const AetherisButton: React.FC<ButtonProps> = ({ 
  children, 
  variant = "elevated", 
  className = "",
  onMouseDown,
  ...props 
}) => {
  const [isActive, setIsActive] = useState(false);

  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>) => {
    SoundManager.init();
    SoundManager.playClick();
    setIsActive(true);
    if (onMouseDown && "button" in e) onMouseDown(e);
  };

  const handleMouseUp = () => {
    setIsActive(false);
  };

  let variantClass = "aetheris-btn";
  if (variant === "elevated-primary") {
    variantClass = "aetheris-btn aetheris-btn-primary";
  } else if (variant === "elevated-tertiary") {
    variantClass = "aetheris-btn aetheris-btn-tertiary";
  }

  const activeClass = isActive ? "active" : "";

  return (
    <button
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
      className={`${variantClass} ${activeClass} ${className}`}
      {...props}
    >
      <div style={{ position: "absolute", inset: 0, backgroundColor: "white", opacity: 0.05, pointerEvents: "none" }} />
      <span style={{ position: "relative", zIndex: 10 }}>{children}</span>
    </button>
  );
};
