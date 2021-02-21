import React, { memo, lazy } from "react";
import { ISonglist } from "../../../../apis/types/business";
import "./index.less";

// const LazyLoad = lazy(() => import("../../../../components/LazyLoad"));
import LazyLoad from "../../../../components/LazyLoad"

interface HighQualityProps {
  data?: ISonglist;
}

const HighQuality: React.FC<HighQualityProps> = ({ data }) => {
  return (
    <div className="dis-songlist-highquality">
      {data?.coverImgUrl && (
        <LazyLoad>
          <img
            className={"bg"}
            src={`${data?.coverImgUrl}?param=1200y200`}
            loading="lazy"
            alt=""
          />
        </LazyLoad>
      )}
      <div className={"mask"}></div>
      <div className={"content"}>
        <div className={"pic"}>
          {data?.coverImgUrl && (
            <LazyLoad>
              <img
                src={`${data?.coverImgUrl}?param=150y150`}
                className="cover"
                loading="lazy"
                alt=""
              />
            </LazyLoad>
          )}
        </div>
        <div className={"info"}>
          <div className={"tag"}>精品歌单</div>
          <div className={"name"}>{data?.name}</div>
          <div className={"tips"}>{data?.copywriter}</div>
        </div>
      </div>
    </div>
  );
};

export default memo(HighQuality);
