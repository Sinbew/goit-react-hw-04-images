import styles from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({
  imagePreview,
  originalImage,
  handlerOpenModal,
}) => {
  return (
    <li
      className={styles.galleryItem}
      onClick={() => handlerOpenModal(originalImage)}
    >
      <img className={styles.galleryItemImg} src={imagePreview} alt="img" />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  imagePreview: PropTypes.string.isRequired,
  originalImage: PropTypes.string.isRequired,
  handlerOpenModal: PropTypes.func.isRequired,
};
