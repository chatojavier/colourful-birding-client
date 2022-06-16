const Section = ({ children, className = '', ...rest }) => {
  return (
    <section className={`${className} my-12 w-full py-8`} {...rest}>
      {children}
    </section>
  );
};

export default Section;
