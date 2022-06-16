const Subtitle = ({ children, className, ...props }) => {
  return (
    <div className={`subtitle | font-raleway uppercase md:text-xl lg:text-2xl ${className}`} {...props}>
      {children}
    </div>
  );
};
export default Subtitle;
