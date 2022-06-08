import styles from './BurgerButton.module.scss';
import PropTypes from 'prop-types';

const BurgerButton = ({ isOpen, onClick, className }) => {
  return (
    <div className={`${styles.menuBtn} ${className} mx-3`} onClick={onClick}>
      <div className={`${styles.menuBtn__burger} ${isOpen ? styles.open : ''}`}></div>
    </div>
  );
};

export default BurgerButton;

BurgerButton.propTypes = {
  isOpen: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
};
