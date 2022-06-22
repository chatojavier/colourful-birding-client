import Link from 'next/link';

const ToggleButton = ({ children, className, path = '', onClick, isActive, ...rest }) => {
  const handleClick = () => {
    onClick && onClick();
  };

  const activeColor = `border-lightblue ${isActive ? 'bg-lightblue text-white' : 'bg-white text-lightblue'}`;
  const hovercolor = '';

  return (
    <>
      {!path ? (
        <button
          {...rest}
          className={`inline-block border-2 border-solid px-6 py-1 text-xs font-bold uppercase md:px-8 md:py-2 md:text-sm lg:px-10 lg:text-base
      ${activeColor} ${hovercolor} ${className}`}
          onClick={handleClick}
        >
          {children}
        </button>
      ) : (
        <Link href={path}>
          <a
            {...rest}
            className={`inline-block border-2 border-solid px-6 py-1 text-xs font-bold uppercase md:px-8 md:py-2 md:text-sm lg:px-10 lg:text-base
            ${activeColor} ${hovercolor} ${className}`}
          >
            {children}
          </a>
        </Link>
      )}
    </>
  );
};

export default ToggleButton;
