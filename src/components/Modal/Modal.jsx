import { useEffect } from 'react';
import styles from './Modal.module.css';
import PropTypes from 'prop-types';

export const Modal = ({ image, onClose }) => {
  useEffect(() => {
    const onCloseEsc = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', onCloseEsc);
    return () => {
      window.removeEventListener('keydown', onCloseEsc);
    };
  });

  const handlerOverlay = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.overlay} onClick={handlerOverlay}>
      <div className={styles.modal}>
        <img src={image} alt="bigimg" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  image: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
