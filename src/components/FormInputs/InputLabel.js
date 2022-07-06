import { getTextColorByName } from 'lib/util';

const InputLabel = ({ label, id, color, className = '' }) => {
  return (
    <label htmlFor={id} className={`block font-bebas text-2xl md:text-3xl ${getTextColorByName(color)} ${className}`}>
      {label}
    </label>
  );
};

export default InputLabel;
