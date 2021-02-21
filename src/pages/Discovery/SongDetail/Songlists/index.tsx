import React, { memo, useCallback } from "react";
import { useHistory } from "react-router-dom";
import cn from "classnames";
import PlayCount from "../../../../components/PlayCount";
import { ISonglist } from "../../../../apis/types/business";
import ROUTES from "../../../../constants/routes";
import "./index.less";

interface IProps {
  data: ISonglist[];
}

const Songlists: React.FC<IProps> = ({ data }) => {
  const history = useHistory();

  const handleItemClick = useCallback((id: number) => {
    history.push(`${ROUTES.SONG_LISTS}/${id}`);
  }, []);

  return (
    <div className={"music-detail-songlist"}>
      {data.map(({ name, playCount, coverImgUrl, id }) => {
        return (
          <div key={id} className={"item"} onClick={() => handleItemClick(id)}>
            <div className="smallCover">
              <img src={`${coverImgUrl}?param=55y55`} loading="lazy" alt="" />
            </div>
            <div className={"info songlists-info"}>
              <div className={cn("name", "singleLineEllipsis")}>{name}</div>
              <PlayCount count={playCount} className={"playCount"} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default memo(Songlists);
