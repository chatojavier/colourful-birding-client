import { getInputColorByName } from 'lib/util';
import InputError from './InputError';
import InputLabel from './InputLabel';
import { forwardRef } from 'react';

const TextInput = (
  { id, label, type = 'text', errorMessage, autocomplete, color = 'green', className = '', ...rest },
  ref
) => {
  return (
    <div className={`contact-form__input-group w-full ${className}`}>
      <InputLabel id={id} label={label} color={color} className="mb-2" />
      <input
        type={type}
        id={id}
        name={id}
        autoComplete={autocomplete}
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

export default forwardRef(TextInput);
