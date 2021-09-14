import React, { useState } from "react";
import { Route, useLocation } from "react-router-dom";

import SideNavbar from "../components/layout/sidenavbar/SideNavbar";
import TopNavbar from "../components/layout/topnavbar/TopNavbar";
import AssetDetails from "../pages/assetsDetails/AssetDetails";
import Assets from "../pages/assetsList/Assets";

const Main = () => {
  const location = useLocation();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [sort, setSort] = useState("");
  const [assetParams, setAssetParams] = useState({
    contractAddress: "",
    tokenId: "",
  });

  const handleSort = (e) => {
    setSort(e.target.value);
  };

  return (
    <div>
      <TopNavbar
        setMobileNavOpen={setMobileNavOpen}
        mobileNavOpen={mobileNavOpen}
      />
      {location.pathname === "/" && (
        <SideNavbar mobileNavOpen={mobileNavOpen} handleSort={handleSort} />
      )}
      <Route exact path="/">
        <Assets setAssetParams={setAssetParams} sort={sort} />
      </Route>
      <Route exact path="/assets/:contractAddress/:tokenId">
        <AssetDetails assetParams={assetParams} />
      </Route>
    </div>
  );
};

export default Main;
