const Header = ({ children, className = '' }) => {
  return <header className={`header ${className}`}>{children}</header>;
};

export default Header;
