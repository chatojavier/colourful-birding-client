import { useState } from 'react';
import styles from './BurgerButton.module.scss';

const BurgerButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`${styles.menuBtn} mx-3`} onClick={() => setIsOpen(!isOpen)}>
      <div className={`${styles.menuBtn__burger} ${isOpen ? styles.open : ''}`}></div>
    </div>
  );
};

export default BurgerButton;
