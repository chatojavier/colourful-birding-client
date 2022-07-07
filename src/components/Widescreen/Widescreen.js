const Widescreen = ({ children, className = '', ...rest }) => {
  return (
    <section className={`${className} w-screen pb-4 md:pb-8`} {...rest}>
      {children}
    </section>
  );
};

export default Widescreen;
