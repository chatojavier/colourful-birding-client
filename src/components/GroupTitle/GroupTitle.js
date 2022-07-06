const GroupTitle = ({ children, className = '' }) => {
  return <h4 className={`group-title | pb-2 font-bebas text-xl md:text-2xl ${className}`}>{children}</h4>;
};
export default GroupTitle;
