import React, { memo, useCallback } from "react";
import { IMyMusic } from "../../../../apis/types/business";
import { Icon } from "@blueprintjs/core";
import cn from "classnames";
import { PlayCircleOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import PlayIcon from "../../../../components/PlayIcon";
import LazyLoad from "../../../../components/LazyLoad";
import { formatTime } from "../../../../helpers/time";
import { ACTIONS } from "../../../../constants/playMusic";
import { createMusic } from "../../../../helpers/business";
import "./index.less";

interface ILatestMusicContentProps {
  data?: IMyMusic[];
}

const LatestMusicContent: React.FC<ILatestMusicContentProps> = ({ data }) => {
  const dispatch = useDispatch();
  const { musicId } = useSelector((state: IState) => state.playMusic);
  const { audioState } = useSelector((state: IState) => state.audioInfo);

  const handleClick = useCallback(
    (index: number) => {
      const item = data?.[index] as IMyMusic;

      dispatch({
        type: ACTIONS.PLAY,
        payload: {
          musicId: item?.id,
          music: createMusic({
            ...item,
            picUrl: item?.picUrl || item?.album?.picUrl,
            duration: item.duration / 1000,
          }),
        },
      });
    },
    [data, dispatch]
  );

  return (
    <div className="latestmusic-content">
      {data?.map(({ id, name, artists, album, duration, picUrl }, index) => {
        const isActive = musicId === id;
        return (
          <div className={cn(isActive && "active", "item")} key={id}>
            <div className="index">
              {isActive ? (
                <Icon
                  icon={audioState.paused ? "volume-off" : "volume-up"}
                  iconSize={15}
                />
              ) : (
                <span>{index + 1}</span>
              )}
            </div>

            <div className={"musicInfo"}>
              <div className={"pic"}>
                <LazyLoad>
                  <img
                    src={`${picUrl || album?.blurPicUrl}?param=60y60`}
                    className="cover"
                    alt=""
                  />
                </LazyLoad>
                <PlayIcon className={"playIcon"} />
              </div>
              <div className={cn("name", isActive && "active")}>{name}</div>
            </div>

            <div className={"artists"}>
              {artists.map(({ name }) => name).join(" / ")}
            </div>

            <div className={"album"}>{album?.name}</div>

            <div className={"duration"}>{formatTime(duration / 1000)}</div>

            <PlayCircleOutlined
              style={{ fontSize: "15px", color: "grey" }}
              onClick={() => handleClick(index)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default memo(LatestMusicContent);
