import React from "react";
import styles from "./sidenavbar.module.scss";

const SideNavbar = ({ mobileNavOpen, setMobileNavOpen }) => {

  return (
    <div className={styles.sidenavbar} style={{ left: mobileNavOpen && "0" }}>
      <div className={styles.sidenavbar_content}>
        <div>
          <select>
            <option value="">Filter by Date</option>
            <option value="Date">Date</option>
            <option value="Alive">Alive</option>
          </select>
        </div>
        <div>
          <select>
            <option value="">Filter by Price</option>
            <option value="Price">Price</option>
            <option value="Male">Male</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SideNavbar;
