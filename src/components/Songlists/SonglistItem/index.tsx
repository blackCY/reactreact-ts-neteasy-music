import React, { useCallback, memo } from "react";
import { useHistory } from "react-router-dom";
import PlayCount from "../../PlayCount";
import PlayIcon from "../../PlayIcon";
import ROUTES from "../../../constants/routes";
import LazyLoad from "../../../components/LazyLoad";
import "./index.less";

interface ISonglistItemProps {
  id: number;
  name: string;
  playCount: number;
  picUrl?: string;
}

const SonglistItem: React.FC<ISonglistItemProps> = ({
  id,
  name,
  playCount,
  picUrl,
}) => {
  const history = useHistory();

  const handleItemClick = useCallback(() => {
    history.push(`${ROUTES.SONG_LISTS}/${id}`);
  }, [history, id]);

  return (
    <div className={"songlist-item-container"} onClick={handleItemClick}>
      <div className={"cover"}>
        {picUrl && (
          <LazyLoad>
            <img src={picUrl} alt="" />
          </LazyLoad>
        )}
        <PlayCount count={playCount} className={"playCount"} />
        <PlayIcon className={"playIcon"} />
      </div>
      <div className={"name"}>{name}</div>
    </div>
  );
};

export default memo(SonglistItem);
