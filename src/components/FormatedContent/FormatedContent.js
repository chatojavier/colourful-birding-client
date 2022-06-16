const FormatedContent = ({ content, className }) => {
  return (
    <div
      className={`formated-content | space-y-4 text-justify text-sm md:text-base lg:text-lg ${className}`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};
export default FormatedContent;
