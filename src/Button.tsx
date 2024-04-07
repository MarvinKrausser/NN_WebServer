import React from 'react';

interface ButtonProps {
  buttonText: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ buttonText, onClick }) => {
  return (
    <button onClick={onClick}>
      {buttonText}
    </button>
  );
};

export default Button;