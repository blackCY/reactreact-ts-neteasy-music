import React, { memo } from "react";
import Banner from "./Banner";
import Songlist from "./Songlist";
import LatestMusic from "./LatestMusic";
import MV from "./MV";
import "./index.less";

interface RecommendationProps {}

const Recommendation: React.FC<RecommendationProps> = (props) => {
  return (
    <div className={"discovery-recommendation"}>
      <Banner />

      <div className={"discovery-recommendation-block"}>
        <Songlist />
      </div>

      <div className={"discovery-recommendation-block"}>
        <LatestMusic />
      </div>

      <div className={"discovery-recommendation-block"}>
        <MV />
      </div>
    </div>
  );
};

export default memo(Recommendation);
