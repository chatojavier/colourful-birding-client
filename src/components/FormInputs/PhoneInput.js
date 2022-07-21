import React from 'react';
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';
import { Controller } from 'react-hook-form';
import InputError from './InputError';
import InputLabel from './InputLabel';
import { getInputColorByName } from 'lib/util';

const TelInput = (
  { useFormMthods, name, required, schema, errorMessage, label, color = 'green', className = '' },
  ref
) => {
  const [validPhoneNumber, setValidPhoneNumber] = React.useState(false);
  const validatePhoneNumber = (inputNumber, country, isDirty, phoneLength) => {
    if (isDirty) {
      if (inputNumber && inputNumber?.replace(country.dialCode, '')?.trim() === '') {
        setValidPhoneNumber(false);
        return false;
      } else if (inputNumber.length < phoneLength) {
        setValidPhoneNumber(false);
        return false;
      }
      setValidPhoneNumber(true);
      return true;
    }
    setValidPhoneNumber(true);
    return true;
  };
  return (
    <Controller
      name={name}
      control={useFormMthods?.control}
      render={(props) => {
        return (
          <div className={`contact-form__input-group w-full ${className}`}>
            {label && <InputLabel id={name} label={label} color={color} className="mb-2" />}
            <PhoneInput
              onChange={(e) => {
                useFormMthods.trigger();
                props.field.onChange(e);
              }}
              inputProps={{
                id: name,
                name,
                autoComplete: 'tel',
              }}
              inputExtraProps={{
                ref,
              }}
              country={'us'}
              value={props.field.value}
              isValid={(inputNumber, country, countries) => {
                const phoneLength = Math.ceil(
                  countries.filter((val) => val.dialCode === country.dialCode)[0]?.format.length / 2
                );
                return validatePhoneNumber(inputNumber, country, props.formState.isDirty, phoneLength);
              }}
              specialLabel=""
              inputClass={`!rounded-none font-raleway !w-full border border-lightgrey p-1 shadow hover:border-darkgrey ${getInputColorByName(
                color
              )}`}
              buttonClass="!rounded-none"
              dropdownClass="md:-right-[132px]"
              className="block !w-full !rounded-none font-raleway"
            />
            {errorMessage === 'required' && <InputError error="Phone is required" className="mt-1" />}
            {!validPhoneNumber && !errorMessage && <InputError error="Wrong Phone format" className="mt-1" />}
          </div>
        );
      }}
      rules={{
        required,
        validate: () => validPhoneNumber || schema?.errorMessage?.validate,
      }}
    />
  );
};

export default React.forwardRef(TelInput);
