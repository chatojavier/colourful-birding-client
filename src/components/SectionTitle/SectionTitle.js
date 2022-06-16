import { getTextColorByName } from 'lib/util';

const SectionTitle = ({ children, color, className }) => {
  return (
    <h1
      className={`section-title | ${className} font-bebas text-5xl md:text-[80px] md:leading-[70px] ${
        color && getTextColorByName(color)
      }`}
    >
      {children}
    </h1>
  );
};

export default SectionTitle;
