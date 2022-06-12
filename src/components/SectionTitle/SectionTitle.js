import { getTextColorByName } from 'lib/util';

const SectionTitle = ({ children, color }) => {
  return (
    <h1 className={`section-title | font-bebas text-3xl md:text-[80px] md:leading-[70px] ${getTextColorByName(color)}`}>
      {children}
    </h1>
  );
};

export default SectionTitle;
