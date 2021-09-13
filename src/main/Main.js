import React, { useState } from "react";
import { Route, useLocation } from "react-router-dom";

import SideNavbar from "../components/layout/sidenavbar/SideNavbar";
import TopNavbar from "../components/layout/topnavbar/TopNavbar";
import Assets from "../pages/assetsList/Assets";

const Main = () => {
  const location = useLocation();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div>
      <TopNavbar
        setMobileNavOpen={setMobileNavOpen}
        mobileNavOpen={mobileNavOpen}
      />
      {location.pathname === "/" && (
        <SideNavbar mobileNavOpen={mobileNavOpen} />
      )}
      <Route exact path="/" component={Assets} />
      {/* <Route exact path="/character/:id" component={CharacterDetails} /> */}
    </div>
  );
};

export default Main;
