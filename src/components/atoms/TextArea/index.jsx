/**
 * TextArea
 *
 * @package components
 */
import styles from "./styles.module.css";

/**
 * TextArea
 * @param disabled
 * @param value
 * @param placeholder
 * @param onChange
 * @returns {JSX.Element}
 * @constructor
 */
export const TextArea = ({
  disabled = false,
  value,
  placeholder,
  onChange,
}) => (
  <textarea
    disabled={disabled}
    className={styles.text}
    value={value}
    placeholder={placeholder}
    onChange={onChange}
  />
);
