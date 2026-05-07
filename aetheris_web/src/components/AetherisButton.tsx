"use client";

import React, { useState } from "react";
import { SoundManager } from "./SoundManager";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "elevated" | "elevated-primary" | "elevated-tertiary";
  className?: string;
}

export const AetherisButton = React.memo<ButtonProps>(({ 
  children, 
  variant = "elevated", 
  className = "",
  onMouseDown,
  ...props 
}) => {
  const [isActive, setIsActive] = useState(false);

  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>) => {
    SoundManager.playClick();
    setIsActive(true);
    if (onMouseDown && "button" in e) onMouseDown(e);
  };


  const handleMouseUp = () => {
    setIsActive(false);
  };

  const variantClasses = {
    "elevated": "aetheris-btn",
    "elevated-primary": "aetheris-btn aetheris-btn-primary",
    "elevated-tertiary": "aetheris-btn aetheris-btn-tertiary",
  };

  const variantClass = variantClasses[variant] || "aetheris-btn";
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
      <div className="btn-overlay" />
      <span className="btn-content">{children}</span>
    </button>
  );
});

AetherisButton.displayName = "AetherisButton";

