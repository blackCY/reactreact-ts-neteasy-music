import React, { memo } from "react";
import SongListItem from "./SonglistItem";
import { ISonglist } from "../../apis/types/business";
import "./index.less";

interface IProps {
  data?: ISonglist[];
}

const Songlists: React.FC<IProps> = ({ data }) => {
  return (
    <div className={"songlists-container"}>
      {data?.map(({ id, name, playCount, picUrl, coverImgUrl }, index) => {
        return (
          <SongListItem
            key={index}
            id={id}
            name={name}
            playCount={playCount}
            picUrl={picUrl || coverImgUrl}
          />
        );
      })}
    </div>
  );
};

export default memo(Songlists);
