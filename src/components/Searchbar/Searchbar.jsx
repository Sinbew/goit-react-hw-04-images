import { useState } from 'react';
import styles from './Searchbar.module.css';
import { toast } from 'react-toastify';

import PropTypes from 'prop-types';

export const Searchbar = ({ onSubmit }) => {
  const [search, setSearch] = useState('');

  const handlerInput = event => {
    setSearch(event.target.value);
  };

  const handlerSubmit = event => {
    event.preventDefault();

    if (!search.trim()) {
      toast.error('Please search an image');
      return;
    }

    onSubmit(search);

    setSearch('');
  };

  return (
    <header className={styles.searchbar}>
      <form className={styles.searchForm} onSubmit={handlerSubmit}>
        <button type="submit" className={styles.searchFormButton}>
          <span className={styles.buttonLabel}>Search</span>
        </button>

        <input
          onChange={handlerInput}
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
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
