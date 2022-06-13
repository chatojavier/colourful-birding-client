const InputText = ({ name, label, value, onChange, error, type = 'text', placeholder, className, ...props }) => {
  return (
    <div className={`input-text`}>
      <label htmlFor={name}>{label}</label>
      <input
        className={`border border-[grey] p-1 text-sm placeholder:text-xs placeholder:uppercase hover:border-black md:p-2 md:text-base md:placeholder:text-sm ${className}`}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        {...props}
      />
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default InputText;
