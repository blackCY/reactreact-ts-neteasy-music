import React, { memo } from "react";
import cn from "classnames";
import { IMusic } from "../../../../apis/types/business";
import { useHistory } from 'react-router-dom'
import PlayIcon from "../../../../components/PlayIcon"
import ROUTES from './../../../../constants/routes';
import "./index.less";

interface IProps {
  data: IMusic[];
}

const SimiSongs: React.FC<IProps> = ({ data }) => {
  const history = useHistory()

  return (
    <div className={"music-detail-simisongs"}>
      {data.map((item) => {
        const { album, name, id, artists } = item;

        return (
          <div
            className={"detail-simisongs-item"}
            key={id}
            onClick={() => history.push(`${ROUTES.SONG}/${item.id}`)}
          >
            <div className="smallCover simisongs-cover">
              <img
                src={`${album.blurPicUrl}?param=55y55`}
                alt=""
                loading="lazy"
              />
              <PlayIcon className={"playIcon"} />
            </div>
            <div className="simisongs-content">
              <div className={cn("name", "singleLineEllipsis")}>{name}</div>
              <div className={"artists"}>
                {artists.map(({ name }) => name).join(" / ")}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default memo(SimiSongs);
