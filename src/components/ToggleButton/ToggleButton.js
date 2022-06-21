import Link from 'next/link';
import { getClassesByColorAndFill } from 'components/Button/Button';
import { useState } from 'react';

const ToggleButton = ({ children, className, color = 'purple', filled = false, path = '', onClick, ...rest }) => {
  const [isActive, setIsActive] = useState(filled);
  const handleClick = () => {
    setIsActive(!isActive);
    onClick && onClick();
  };
  return (
    <>
      {!path ? (
        <button
          {...rest}
          className={`border-2 border-solid px-6 py-1 text-xs font-bold uppercase md:px-8 md:py-2 md:text-sm lg:px-10 lg:text-base
      ${getClassesByColorAndFill(color, isActive)} ${className}`}
          onClick={handleClick}
        >
          {children}
        </button>
      ) : (
        <Link href={path}>
          <a
            {...rest}
            className={`border-2 border-solid px-6 py-1 text-xs font-bold uppercase md:px-8 md:py-2 md:text-sm lg:px-10 lg:text-base
      ${getClassesByColorAndFill(color, isActive)} ${className}`}
          >
            {children}
          </a>
        </Link>
      )}
    </>
  );
};

export default ToggleButton;
