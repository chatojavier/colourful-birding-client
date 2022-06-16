import { getTextColorByName } from 'lib/util';

const Title = ({ children, color, className = '' }) => {
  return (
    <h1
      className={`section-title | font-bebas text-[34px] leading-[36px] md:text-6xl lg:text-[80px] lg:leading-[70px] ${
        color && getTextColorByName(color)
      } ${className}`}
    >
      {children}
    </h1>
  );
};

export default Title;
