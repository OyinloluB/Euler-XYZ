import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useEthers, useEtherBalance } from "@usedapp/core";
import { formatEther } from "@ethersproject/units";
import { CircularProgress } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

import { fetchAssetsId } from "../../redux/assets/assets.actions";
import styles from "./assetdetails.module.scss";


const AssetDetails = () => {
  const dispatch = useDispatch();
  const { contractAddress, tokenId } = useParams();
  const { loading, asset } = useSelector((state) => state.assets);

  // Set up hooks that'll allow for easy connection to our Metamask wallet
  const { activateBrowserWallet, account, deactivate } = useEthers();
  const etherBalance = useEtherBalance(account);

  useEffect(() => {
    dispatch(fetchAssetsId(contractAddress, tokenId));
  }, [dispatch, contractAddress, tokenId]);

  // Handle connections to Metamask here
  const handleConnectWallet = () => {
    account ? deactivate() : activateBrowserWallet();
  };

  return (
    <div className={styles.assetdetails}>
      {loading ? (
        <div className={styles.loader}>
          <CircularProgress />
        </div>
      ) : (
        <>
          <div className={styles.assetdetails_back}>
            <Link to="/">Back</Link>
          </div>
          <div key={asset.id}>
            <div className={styles.assetdetails_details}>
              <div className={styles.assetdetails_details_image}>
                {asset.image_url ? (
                  <img src={asset.image_url} alt={asset.name} />
                ) : (
                  <Skeleton variant="rect" height="100%" />
                )}
              </div>
              <div>
                <div>
                  <p>
                    <b>Name:</b> {asset.name}
                  </p>
                  {account && (
                    <p>
                      <b>Wallet Balance: </b>
                      {etherBalance &&
                        parseFloat(formatEther(etherBalance)).toFixed(3)}{" "}
                      ETH
                    </p>
                  )}
                  <button onClick={handleConnectWallet}>
                    {account ? "Disconnect Wallet" : "Connect to Metamask"}
                  </button>
                </div>
                <div className={styles.assetdetails_paymentTokensWrapper}>
                  {asset.collection?.payment_tokens.map((payment_token) => (
                    <div
                      key={payment_token.id}
                      className={styles.paymentTokens}
                    >
                      <p>
                        <b>Name:</b> {payment_token.name}
                      </p>
                      <p>
                        <b>Symbol:</b> {payment_token.symbol}
                      </p>
                      <p>
                        <b>Eth Price:</b> {payment_token.eth_price.toFixed(3)}
                      </p>
                      <p>
                        <b>Dollar Price:</b> ${" "}
                        {Math.round(payment_token.usd_price)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AssetDetails;
