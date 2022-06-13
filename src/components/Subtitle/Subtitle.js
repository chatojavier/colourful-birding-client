const Subtitle = ({ children, ...props }) => {
  return <div className={`subtitle | font-raleway uppercase md:text-2xl ${props}`}>{children}</div>;
};
export default Subtitle;
