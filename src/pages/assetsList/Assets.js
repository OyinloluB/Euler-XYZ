import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styles from "./assets.module.scss";
import { CircularProgress } from "@material-ui/core";
import Skeleton from '@material-ui/lab/Skeleton';
import { fetchAssets } from "../../redux/assets/assets.actions";

const Assets = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { assets, loading } = useSelector((state) => state.assets);

  useEffect(() => {
    dispatch(fetchAssets());
  }, [dispatch]);

  return (
    <div className={styles.assets}>
      {loading ? (
        <div className={styles.loader}>
          <CircularProgress />
        </div>
      ) : (
        <div className={styles.assets_wrapper}>
          {assets.map((asset) => (
            <div className={styles.asset} key={asset.id}>
              <div className={styles.asset_image}>
                {asset.image_url ? (
                  <img src={asset.image_url} alt="placeholder" />
                ) : (
                  <Skeleton variant="rect" height="100%" />
                )}
              </div>
              <div className={styles.asset_info}>
                <p>
                  <b>Name:</b> {asset.name ? asset.name : "-"}
                </p>
              </div>
              <div className={styles.asset_cta}>
                <button onClick={() => history.push(`/assets/${asset.id}`)}>
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Assets;
