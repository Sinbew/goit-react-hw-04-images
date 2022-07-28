import { Component } from 'react';
import styles from './Modal.module.css';
import PropTypes from 'prop-types';

export class Modal extends Component {
  static propTypes = {
    image: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.onClose);
    document.body.classList.add('no-scroll');
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.onClose);
    document.body.classList.remove('no-scroll');
  }

  onClose = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };
  handlerOverlay = event => {
    if (event.target === event.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    return (
      <div className={styles.overlay} onClick={this.handlerOverlay}>
        <div className={styles.modal}>
          <img src={this.props.image} alt="bigimg" />
        </div>
      </div>
    );
  }
}
