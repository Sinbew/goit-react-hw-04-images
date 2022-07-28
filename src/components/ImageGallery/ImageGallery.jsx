import styles from './ImageGallery.module.css';
import { Component } from 'react';
import { requestImage } from '../../api/api';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

export class ImageGallery extends Component {
  static propTypes = {
    handlerOpenModal: PropTypes.func.isRequired,
    search: PropTypes.string.isRequired,
  };

  state = {
    imageList: [],
    totalHits: null,
    page: 1,
    loader: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.search !== this.props.search) {
      this.setState({ loader: true });
      requestImage(this.props.search)
        .then(response => {
          const { data } = response;
          if (data.hits.length === 0) {
            toast.error('Image not found');
            return;
          }
          this.setState(prevState => ({
            imageList: [...data.hits],
            page: 2,
            totalHits: data.totalHits,
          }));
        })
        .finally(() => this.setState({ loader: false }));
    }
  }

  loadMore = () => {
    requestImage(this.props.search, this.state.page)
      .then(response => {
        const { hits } = response.data;
        this.setState(prevState => ({
          imageList: [...prevState.imageList, ...hits],
          page: prevState.page + 1,
        }));
      })
      .catch(error => {
        this.setState(console.log(error));
      });
  };

  render() {
    const { imageList, totalHits, page, loader } = this.state;
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
                handlerOpenModal={this.props.handlerOpenModal}
              />
            );
          })}
        </ul>
        {totalHits >= 12 * page && <Button onClick={this.loadMore} />}
      </>
    );
  }
}
