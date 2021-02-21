import React, { memo } from "react";
import PlayCount from "../../../../../components/PlayCount";
import LazyLoad from "../../../../../components/LazyLoad";
import "./index.less";

interface IProps {
  name: string;
  artistName: string;
  playCount: number;
  picUrl: string;
  copywriter: string;
}

const MVItem: React.FC<IProps> = ({
  name,
  artistName,
  playCount,
  picUrl,
  copywriter,
}) => {
  return (
    <div className={"recommendation-mv-item"}>
      <div className={"pic"}>
        <LazyLoad>
          <img src={picUrl} loading="lazy" alt="" />
        </LazyLoad>
        <PlayCount count={playCount} className={"playCount"} />
        <div className={"copywriter"}>{copywriter}</div>
      </div>
      <div className={"name"}>{name}</div>
      <div className={"artistName"}>{artistName}</div>
    </div>
  );
};

export default memo(MVItem);
