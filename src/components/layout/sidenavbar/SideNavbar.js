import React from "react";
import styles from "./sidenavbar.module.scss";

const SideNavbar = ({ mobileNavOpen, handleSort }) => {
  return (
    <div className={styles.sidenavbar} style={{ left: mobileNavOpen && "0" }}>
      <div className={styles.sidenavbar_content}>
        <div>
          <select onChange={(e) => handleSort(e)}>
            <option value="">Filter by Date</option>
            <option value="Oldest">Oldest</option>
            <option value="Newest">Newest</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SideNavbar;
