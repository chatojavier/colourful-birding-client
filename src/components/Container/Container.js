const Container = ({ children, className = '' }) => {
  return <div className={`container mx-auto max-w-5xl px-8 ${className}`}>{children}</div>;
};

export default Container;
