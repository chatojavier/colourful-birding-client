const Section = ({ children, className = '', ...rest }) => {
  return (
    <section className={`${className} my-12 w-full md:my-20`} {...rest}>
      {children}
    </section>
  );
};

export default Section;
