import { getTextColorByName } from 'lib/util';

const SectionTitle = ({ children, color, className }) => {
  return (
    <h2
      className={`section-title | ${className} font-bebas text-5xl md:text-[80px] md:leading-[70px] ${
        color && getTextColorByName(color)
      }`}
    >
      {children}
    </h2>
  );
};

export default SectionTitle;
