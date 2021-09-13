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
