import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAssetsId } from "../../redux/assets/assets.actions";

import styles from "./assetdetails.module.scss";

const AssetDetails = ({ assetParams }) => {
  const dispatch = useDispatch();
  const { asset } = useSelector((state) => state.assets);

  useEffect(() => {
    dispatch(fetchAssetsId(assetParams.contractAddress, assetParams.tokenId));
  }, [dispatch]);

  return (
    <div className={styles.assetdetails}>
      <div className={styles.assetdetails_back}>
        <Link to="/">Back</Link>
      </div>
      <div key={asset.id}>
        <div className={styles.assetdetails_details}>
          <div className={styles.assetdetails_details_image}>
            <img src={asset.image_url} alt={asset.name} />
          </div>
          <div>
            <div>
              <p>
                <b>Name: {asset.name}</b>
              </p>
              <button>Connect to Metamask</button>
            </div>
            <div className={styles.assetdetails_paymentTokensWrapper}>
              {asset.collection?.payment_tokens.map((payment_token) => (
                <div key={payment_token.id} className={styles.paymentTokens}>
                  <p>
                    <b>Name:</b> {payment_token.name}
                  </p>
                  <p>
                    <b>Symbol:</b> {payment_token.symbol}
                  </p>
                  <p>
                    <b>Eth Price:</b> {payment_token.eth_price}
                  </p>
                  <p>
                    <b>Dollar Price:</b> {payment_token.usd_price}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetDetails;
