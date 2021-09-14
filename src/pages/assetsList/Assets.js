import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { CircularProgress } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

import styles from "./assets.module.scss";
import { fetchAssets } from "../../redux/assets/assets.actions";

const Assets = ({ setAssetParams, sort }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { assets, loading } = useSelector((state) => state.assets);

  useEffect(() => {
    // Fetch all assets
    dispatch(fetchAssets());
  }, [dispatch]);

  let sortedAssets = assets.sort((a, b) => {
    if (sort === "Newest") {
      return (
        new Date(b.asset_contract.created_date).getTime() -
        new Date(a.asset_contract.created_date).getTime()
      );
    } else if (sort === "Oldest") {
      return (
        new Date(a.asset_contract.created_date).getTime() -
        new Date(b.asset_contract.created_date).getTime()
      );
    }
  });

  return (
    <div className={styles.assets}>
      {loading ? (
        <div className={styles.loader}>
          <CircularProgress />
        </div>
      ) : (
        <div className={styles.assets_wrapper}>
          {sortedAssets?.map((asset) => (
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
                <button
                  onClick={() => {
                    setAssetParams({
                      contractAddress: asset.asset_contract.address,
                      tokenId: asset.token_id,
                    });
                    history.push(
                      `/assets/${asset.asset_contract.address}/${asset.token_id}`
                    );
                  }}
                >
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
