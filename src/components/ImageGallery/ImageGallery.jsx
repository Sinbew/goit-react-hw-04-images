import styles from './ImageGallery.module.css';
import { useState, useEffect } from 'react';
import { requestImage } from '../../api/api';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

export const ImageGallery = ({ search, handlerOpenModal }) => {
  const [imageList, setImageList] = useState([]);
  const [totalHits, setTotalHits] = useState(null);
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (search === '') {
      return;
    }
    setLoader(true);
    requestImage(search)
      .then(response => {
        const { data } = response;
        if (data.hits.length === 0) {
          toast.error('Image not found');
          return;
        }
        setImageList([...data.hits]);
        setPage(2);
        setTotalHits(data.totalHits);
      })
      .finally(() => setLoader(false));
  }, [search]);

  const loadMore = () => {
    requestImage(search, page)
      .then(response => {
        const { hits } = response.data;
        setImageList(prev => [...prev, ...hits]);
        setPage(page + 1);
      })
      .catch(error => {
        toast.error('Ooops...something went wrong.');
      });
  };

  if (!imageList.length) {
    return (
      <p
        style={{
          fontSize: '24px',
          margin: '150px auto',
        }}
      >
        {'Search an image'}
      </p>
    );
  }
  return (
    <>
      <ul className={styles.gallery}>
        {loader && <Loader />}
        {imageList.map(({ id, webformatURL, largeImageURL }) => {
          return (
            <ImageGalleryItem
              key={id}
              imagePreview={webformatURL}
              originalImage={largeImageURL}
              handlerOpenModal={handlerOpenModal}
            />
          );
        })}
      </ul>
      {totalHits >= 12 * page && <Button onClick={loadMore} />}
    </>
  );
};

ImageGallery.propTypes = {
  handlerOpenModal: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
};
