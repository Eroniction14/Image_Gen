import React from "react";
import styled from "styled-components";
import { CircularProgress } from "@mui/material";

// Use transient props: $variant, $disabled, $loading, $flex
const StyledButton = styled.div`
  border-radius: 10px;
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: min-content;
  padding: 10px 24px;

  @media (max-width: 600px) {
    padding: 8px 12px;
  }

  background: ${({ theme, $variant }) =>
    $variant === "secondary" ? theme.secondary : theme.primary};

  ${({ $disabled }) =>
    $disabled &&
    `
      opacity: 0.4;
      cursor: not-allowed;
      pointer-events: none;
    `}

  ${({ $loading }) =>
    $loading &&
    `
      opacity: 0.8;
      cursor: not-allowed;
      pointer-events: none;
    `}

  ${({ $flex }) =>
    $flex &&
    `
      flex: 1;
    `}
`;

// Capitalize component name so React treats it as a component, not a DOM tag
function Button({
  text,
  isLoading = false,
  isDisabled = false,
  rightIcon,
  leftIcon,
  variant = "primary", // was "type" — renamed to avoid DOM attr confusion
  onClick,
  flex = false,
}) {
  const handleClick = () => {
    if (!isDisabled && !isLoading && onClick) onClick();
  };

  return (
    <StyledButton
      role="button"
      onClick={handleClick}
      $disabled={isDisabled}
      $loading={isLoading}
      $variant={variant}
      $flex={flex}
      aria-disabled={isDisabled || isLoading}
    >
      {isLoading && (
        <CircularProgress
          style={{ width: 18, height: 18, color: "inherit" }}
        />
      )}
      {leftIcon}
      {text}
      {isLoading && <> …</>}
      {rightIcon}
    </StyledButton>
  );
}

export default Button;
