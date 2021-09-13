import React, { useState } from "react";
import { Route, useLocation } from "react-router-dom";

import SideNavbar from "../components/layout/sidenavbar/SideNavbar";
import TopNavbar from "../components/layout/topnavbar/TopNavbar";
import AssetDetails from "../pages/assetsDetails/AssetDetails";
import Assets from "../pages/assetsList/Assets";

const Main = () => {
  const location = useLocation();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [assetParams, setAssetParams] = useState({
    contractAddress: "",
    tokenId: "",
  });

  return (
    <div>
      <TopNavbar
        setMobileNavOpen={setMobileNavOpen}
        mobileNavOpen={mobileNavOpen}
      />
      {location.pathname === "/" && (
        <SideNavbar mobileNavOpen={mobileNavOpen} />
      )}
      <Route exact path="/">
        <Assets setAssetParams={setAssetParams} />
      </Route>
      <Route exact path="/assets/:id/">
        <AssetDetails assetParams={assetParams} />
      </Route>
    </div>
  );
};

export default Main;
