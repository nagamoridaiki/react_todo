/**
 * Navigation
 *
 * @package components
 */
import { NavigationLink } from "../../atoms/NavigationLink/index.jsx";
import { NAVIGATION_PATH } from "../../../constants/navigations.js";
import styles from "./styles.module.css";

/**
 * Navigation
 * @returns {JSX.Element}
 * @constructor
 */
export const Navigation = () => (
  <nav>
    <ul className={styles.ul}>
      <NavigationLink title={"Top"} linkPath={NAVIGATION_PATH.TOP} />
      <NavigationLink title={"Create"} linkPath={NAVIGATION_PATH.CREATE} />
    </ul>
  </nav>
);
