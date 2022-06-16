import styles from './EmbedCode.module.scss';

const EmbedCode = ({ code, className = '' }) => {
  return (
    <div className={`embed-code ${className}`}>
      <div
        className={`embed-code__responsive ${styles.embedResponsive}`}
        dangerouslySetInnerHTML={{ __html: code }}
      ></div>
    </div>
  );
};
export default EmbedCode;
