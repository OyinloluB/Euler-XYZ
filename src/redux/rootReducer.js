import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import assetsReducer from "./assets/assets.reducers";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["asset"],
};

const rootReducer = combineReducers({
  assets: assetsReducer,
});

export default persistReducer(persistConfig, rootReducer);