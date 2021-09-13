import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Main from "./main/Main";

import { fetchAssets } from "./redux/assets/assets.actions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAssets());
  }, [dispatch]);

  return (
    <div>
      <Main />
    </div>
  );
}

export default App;
