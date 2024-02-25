/**
 * CommonButton
 *
 * @package components
 */
import styles from "./styles.module.css";

/**
 * CommonButton
 * @param type
 * @param label
 * @param onClick
 * @returns {JSX.Element}
 * @constructor
 */
export const CommonButton = ({ type, label, onClick }) => (
  <button className={styles.button} type={type} onClick={onClick}>
    {label}
  </button>
);
