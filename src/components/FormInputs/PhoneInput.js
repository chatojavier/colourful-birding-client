import React from 'react';
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';
import { Controller } from 'react-hook-form';
import InputError from './InputError';

const TelInput = ({ useFormMthods, name, required, schema, errorMessage }, ref) => {
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
    setValidPhoneNumber(false);
    return false;
  };
  return (
    <Controller
      name={name}
      control={useFormMthods?.control}
      render={(props) => {
        return (
          <>
            <PhoneInput
              onChange={(e) => {
                useFormMthods.trigger();
                props.field.onChange(e);
              }}
              inputProps={{
                id: name,
                name,
                autoComplete: 'phone',
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
              inputStyle={{ borderRadius: 0, fontFamily: 'raleway', width: '100%' }}
              buttonStyle={{ borderRadius: 0 }}
            />
            {errorMessage === 'required' && <InputError error="Phone is required" className="mt-1" />}
            {!validPhoneNumber && <InputError error="Wrong Phone format" className="mt-1" />}
          </>
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
