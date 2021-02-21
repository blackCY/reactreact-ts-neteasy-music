import React, { memo } from "react";
import LazyLoad from "../../../components/LazyLoad";
import { ISonglist, IMyMusic } from "../../../apis/types/business";
import { formatDatetime } from "../../../helpers/time";
import { formatNum } from "../../../helpers/num";
import PlayAll from "../../../components/PlayAll";
import "./index.less";

interface BasicInfoProps {
  data?: ISonglist;
  playAllData: IMyMusic[];
}

const BasicInfo: React.FC<BasicInfoProps> = ({ data, playAllData }) => {
  return (
    <div className={"songlistdetail-basicinfo"}>
      <div className={"pic"}>
        {data?.coverImgUrl && (
          <LazyLoad>
            <img src={data?.coverImgUrl} loading="lazy" alt="" />
          </LazyLoad>
        )}
      </div>

      <div className={"info"}>
        <div className={"title"}>
          <div className={"tag"}>歌单</div>
          <div className={"name"}>{data?.name}</div>
        </div>

        <div className={"creator"}>
          <div className={"avatar"}>
            {data?.creator?.avatarUrl && (
              <LazyLoad>
                <img
                  src={`${data?.creator?.avatarUrl}?param=25y25`}
                  loading="lazy"
                  alt=""
                />
              </LazyLoad>
            )}
          </div>
          <div className={"name"}>{data?.creator.nickname}</div>
          <div>{formatDatetime(data?.createTime)}创建</div>
        </div>

        <PlayAll data={playAllData} />

        <div className={"detail"}>
          <div>
            <span className={"label"}>标签: </span>
            {data?.tags.join(" / ") || "--"}
          </div>
          <div>
            <span className={"label"}>歌曲数: </span>
            {data?.trackCount}&nbsp;&nbsp;
            <span className={"label"}>播放数: </span>
            {formatNum(data?.playCount)}
          </div>
          <div>
            <span className={"label"}>简介: </span>
            {data?.description || "--"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(BasicInfo);
