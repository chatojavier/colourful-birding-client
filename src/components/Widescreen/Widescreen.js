const Widescreen = ({ children, className = '', ...rest }) => {
  return (
    <section className={`${className} w-screen pb-8`} {...rest}>
      {children}
    </section>
  );
};

export default Widescreen;
