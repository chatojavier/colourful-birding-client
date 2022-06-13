const Button = ({ children, className, color = 'purple', filled = false, ...rest }) => {
  const getClassesByColorAndFill = (color, filled) => {
    if (filled) {
      const constantClasses = 'text-white hover:bg-opacity-0';
      switch (color) {
        case 'green':
          return `${constantClasses} bg-green border-green hover:text-green`;
        case 'purple':
          return `${constantClasses} bg-purple border-purple hover:text-purple`;
        case 'blue':
          return `${constantClasses} bg-blue border-blue hover:text-blue`;
        case 'lightblue':
          return `${constantClasses} bg-lightblue border-lightblue hover:text-lightblue`;
        case 'white':
          return `${constantClasses} bg-white border-white hover:text-darkgrey`;
        default:
          return `${constantClasses} bg-purple border-purple hover:text-purple`;
      }
    }
    const constantClasses = 'bg-opacity-0 hover:bg-opacity-100 hover:text-white';
    switch (color) {
      case 'green':
        return `bg-green border-green text-green ${constantClasses}`;
      case 'purple':
        return `bg-purple border-purple text-purple ${constantClasses}`;
      case 'blue':
        return `bg-blue border-blue text-blue ${constantClasses}`;
      case 'lightblue':
        return `bg-lightblue border-lightblue text-lightblue ${constantClasses}`;
      case 'white':
        return `bg-white border-white text-white bg-opacity-0 hover:bg-opacity-100 hover:text-primary hover:border-opacity-0`;
      default:
        return `bg-purple border-purple text-purple ${constantClasses}`;
    }
  };
  return (
    <button
      {...rest}
      className={`border-2 border-solid px-6 py-1 text-xs font-bold uppercase md:px-8 md:py-2 md:text-sm lg:px-10 lg:py-3 lg:text-base
      ${getClassesByColorAndFill(color, filled)} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
