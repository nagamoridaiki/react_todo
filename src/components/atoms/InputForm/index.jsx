/**
 * InputForm
 *
 * @package components
 */
import styles from "./style.module.css";

/**
 * InputForm
 * @param {*} props
 * @returns
 */
export const InputForm = ({
  disabled = false,
  value,
  placeholder,
  onChange,
  onKeyDown,
}) => (
  <input
    disabled={disabled}
    className={styles.input}
    type="text"
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    onKeyDown={onKeyDown}
  />
);
