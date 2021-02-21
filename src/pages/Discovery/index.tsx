import React, { memo } from "react";
import { renderRoutes, RouteConfigComponentProps } from "react-router-config";
import "./index.less";

interface DiscoveryProps extends RouteConfigComponentProps {}

const Discovery: React.FC<DiscoveryProps> = (props) => {
  const { route } = props;
  return (
    <div className={"discovery"}>
      {renderRoutes(route?.routes)}
    </div>
  );
};

export default memo(Discovery);
