import assetsActionTypes from "./assets.types";

const initialState = {
  assets: [],
  loading: false,
  error: null,
};

const assetsReducer = (state = initialState, action) => {
  switch (action.type) {
    case assetsActionTypes.FETCH_ASSETS_START:
      return {
        ...state,
        loading: true,
      };
    case assetsActionTypes.FETCH_ASSETS_SUCCESS:
      return {
        ...state,
        loading: false,
        assets: [...action.payload.assets],
        error: null,
      };
    case assetsActionTypes.FETCH_ASSETS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default assetsReducer;
