const FormatedContent = ({ content }) => {
  return (
    <div className="formated-content | space-y-4 text-justify text-sm" dangerouslySetInnerHTML={{ __html: content }} />
  );
};
export default FormatedContent;
