import { Component } from 'react';
import styles from './Searchbar.module.css';
import { toast } from 'react-toastify';

import PropTypes from 'prop-types';
export class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    search: '',
  };

  handlerInput = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handlerSubmit = event => {
    const { search } = this.state;
    event.preventDefault();

    if (!search.trim()) {
      toast.error('Please search an image');
      return;
    }

    this.props.onSubmit(search);

    this.setState({ search: '' });
  };

  render() {
    const { search } = this.state;
    return (
      <header className={styles.searchbar}>
        <form className={styles.searchForm} onSubmit={this.handlerSubmit}>
          <button type="submit" className={styles.searchFormButton}>
            <span className={styles.buttonLabel}>Search</span>
          </button>

          <input
            onChange={this.handlerInput}
            className={styles.input}
            name="search"
            value={search}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
