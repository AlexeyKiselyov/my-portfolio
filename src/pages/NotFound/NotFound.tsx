import React from 'react';
import { Link } from 'react-router-dom';

import styles from './NotFound.module.css';
import SEO from '../../components/SEO';

const NotFound: React.FC = () => {
  return (
    <>
      <SEO
        page="notFound"
        canonical={`${window.location.origin}${window.location.pathname}`}
      />
      <main
        className={styles.notFoundWrapper}
        aria-labelledby="notfound-heading"
      >
        <h1 id="notfound-heading" className={styles.code}>
          404
        </h1>
        <p className={styles.message}>
          Page not found. The page you are looking for may have been moved,
          renamed or no longer exists.
        </p>
        <Link to="/" className="button-main mt-5">
          🏠 Go back home
        </Link>
      </main>
    </>
  );
};

export default NotFound;
