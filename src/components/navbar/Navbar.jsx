import Links from "./links/Links";

import styles from "./navbar.module.css";
function Navbar() {
  return (
    <div className={styles.container}>
      <div>Allgoods Store</div>
      <div>
        <Links />
      </div>
    </div>
  );
}

export default Navbar;
