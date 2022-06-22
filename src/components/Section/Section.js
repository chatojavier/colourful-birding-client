const Section = ({ children, className = '', ...rest }) => {
  return (
    <section className={`${className} my-20 w-full`} {...rest}>
      {children}
    </section>
  );
};

export default Section;
