import InputLabel from './InputLabel';
import InputError from './InputError';
import { getInputColorByName } from 'lib/util';
import { forwardRef } from 'react';

const TextArea = ({ name, label, errorMessage, color = 'green', className = '', ...rest }, ref) => {
  return (
    <div className={`contact-form__input-group ${className}`}>
      <InputLabel id={name} label={label} color={color} className="mb-2" />
      <textarea
        name={name}
        id={name}
        rows="4"
        className={`block w-full border border-lightgrey p-1 shadow hover:border-darkgrey ${getInputColorByName(
          color
        )}`}
        ref={ref}
        {...rest}
      />
      {errorMessage && <InputError error={errorMessage} className="mt-1" />}
    </div>
  );
};
export default forwardRef(TextArea);
