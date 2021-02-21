import React, { memo, useCallback, lazy } from "react";
import { useHistory } from "react-router-dom";
import { REPOSITORY } from "../../../constants/github";
import { Icon } from "@blueprintjs/core";
import "./index.less";

// const Searcher = lazy(() => import("./Searcher"));
// const Navbar = lazy(() => import("./Navbar"));
import Searcher from "./Searcher"
import Navbar from "./Navbar"

interface LayoutHeaderProps {}

const Header: React.FC<LayoutHeaderProps> = (props) => {
  const history = useHistory();

  const handleGoBack = useCallback(() => history.goBack(), []);
  const handleGoForward = useCallback(() => history.goForward(), []);

  return (
    <div className={"layout-header"}>
      <div className={"layout-header-actions"}>
        <div className={"layout-header-iconsWrap"}>
          <div className={"layout-header-circle"}>
            <Icon icon="cross" iconSize={8} />
          </div>
          <div className={"layout-header-circle"}>
            <Icon icon="minus" iconSize={8} />
          </div>
          <div className={"layout-header-circle"}>
            <Icon icon="maximize" iconSize={7} />
          </div>
          {/* {
            <div className={"layout-header-down"}>
              <Icon icon="chevron-down" iconSize={20} />
            </div>
          } */}
        </div>

        <div className={"layout-header-backForward"}>
          <div onClick={handleGoBack}>
            <Icon icon="chevron-left" />
          </div>
          <div onClick={handleGoForward}>
            <Icon icon="chevron-right" />
          </div>
        </div>
      </div>

      <div className={"layout-header-content"}>
        <div>
          <Navbar />
        </div>
        <div className={"layout-header-operations"}>
          <Searcher />
          <div
            className={"layout-header-githubLogo"}
            onClick={() => window.open(REPOSITORY)}
          />
        </div>
      </div>
    </div>
  );
};

export default memo(Header);
