const InputError = ({ error, className }) => {
  return <div className={`contact-form__error-message | text-xxs text-red md:text-xs ${className}`}>{error}</div>;
};
export default InputError;
