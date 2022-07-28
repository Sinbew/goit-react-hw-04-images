import { RotatingLines } from 'react-loader-spinner';
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import styles from './Loader.module.css';
export const Loader = () => {
  return (
    <div className={styles.loaderWrapper}>
      <RotatingLines
        strokeColor="black"
        strokeWidth="5"
        animationDuration="0.75"
        width="66"
        visible={true}
      />
    </div>
  );
};
