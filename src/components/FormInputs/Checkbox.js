import InputError from './InputError';
import { forwardRef } from 'react';

const Checkbox = ({ id, label, errorMessage, className = '', ...rest }, ref) => {
  return (
    <div>
      <div className={`contact-form__input-group flex w-full items-center space-x-2 ${className}`}>
        <input type="checkbox" id={id} name={id} ref={ref} {...rest} />
        {label && (
          <label htmlFor={id} className="text-xs">
            {label}
          </label>
        )}
      </div>
      {errorMessage && <InputError error={errorMessage} className="mt-1" />}
    </div>
  );
};

export default forwardRef(Checkbox);
