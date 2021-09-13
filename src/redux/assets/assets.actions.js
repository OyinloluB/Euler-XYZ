import assetsActionTypes from "./assets.types";
import axios from "../helpers/axios-client";

export const fetchAssetsStart = () => ({
  type: assetsActionTypes.FETCH_ASSETS_START,
});

export const fetchAssetsSuccess = (assets) => ({
  type: assetsActionTypes.FETCH_ASSETS_SUCCESS,
  payload: assets,
});

export const fetchAssetsFailure = (error) => ({
  type: assetsActionTypes.FETCH_ASSETS_FAILURE,
  payload: error,
});

export const fetchAssetsIdStart = () => ({
  type: assetsActionTypes.FETCH_ASSETSID_START,
});

export const fetchAssetsIdSuccess = (assets) => ({
  type: assetsActionTypes.FETCH_ASSETSID_SUCCESS,
  payload: assets,
});

export const fetchAssetsIdFailure = (error) => ({
  type: assetsActionTypes.FETCH_ASSETSID_FAILURE,
  payload: error,
});

export const fetchAssets = () => {
  return (dispatch) => {
    return new Promise(async (resolve, reject) => {
      dispatch(fetchAssetsStart());
      try {
        const response = await axios.get('/v1/assets');
        const { data } = response;
        console.log('data', data.assets);
        dispatch(fetchAssetsSuccess(data));
      } catch (error) {
        dispatch(fetchAssetsFailure(error));
        reject(error);
      }
    });
  };
};

export const fetchAssetsId = (contractAddress, tokenId) => {
  return (dispatch) => {
    return new Promise(async (resolve, reject) => {
      dispatch(fetchAssetsIdStart());
      try {
        const response = await axios.get(`/v1/asset/${contractAddress}/${tokenId}/`);
        const { data } = response;
        console.log('single asset data', data.assets);
        dispatch(fetchAssetsIdSuccess(data));
      } catch (error) {
        dispatch(fetchAssetsIdFailure(error));
        reject(error);
      }
    });
  };
};
