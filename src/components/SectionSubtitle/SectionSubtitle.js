const SectionSubtitle = ({ children, ...props }) => {
  return <div className={`section-subtitle | font-raleway text-sm uppercase md:text-2xl ${props}`}>{children}</div>;
};
export default SectionSubtitle;
