import React, { memo, useCallback } from "react";
import cn from "classnames";
import { IMusicSong } from "../../../../../apis/types/personalized";
import { useSelector, useDispatch } from "react-redux";
import { Icon } from "@blueprintjs/core";
import PlayIcon from "../../../../../components/PlayIcon";
import { ACTIONS } from "../../../../../constants/playMusic";
import LazyLoad from "../../../../../components/LazyLoad";
import Artists from "../../../../../components/Artists";
import { createMusic } from "../../../../../helpers/business";
import "./index.less";

interface MusicItemProps {
  id: number;
  name: string;
  picUrl: string;
  song: IMusicSong;
  index: number;
}

const MusicItem: React.FC<MusicItemProps> = ({
  id,
  name,
  picUrl,
  song,
  index,
  ...others
}) => {
  const dispatch = useDispatch();

  const state = useSelector((state: IState) => state.playMusic);
  const { audioState } = useSelector(
    (state: IState) => state.audioInfo
  );

  const playMusic = useCallback(
    (id: number) => {
      dispatch({
        type: ACTIONS.PLAY,
        payload: {
          musicId: id,
          music: createMusic({
            id,
            name,
            picUrl,
            artists: song.artists,
            duration: song.duration / 1000,
            ...others,
          }),
        },
      });
    },
    []
  );

  const hasBorderBottom = [4, 9].indexOf(index) > -1;

  const isMusicActive = state.musicId === id;

  return (
    <div className={cn("latest-music-item", hasBorderBottom && "borderBottom")}>
      <div className={"pic"} onClick={() => playMusic(id)}>
        <LazyLoad>
          <img src={`${picUrl}?param=60y60`} alt="" />
        </LazyLoad>
        <PlayIcon className={"playIcon"} id={id} />
      </div>
      {isMusicActive ? (
        <div className={"isPlaying"}>
          <Icon icon={audioState?.paused ? "volume-off" : "volume-up"} />
        </div>
      ) : (
        <div className={"order"}>{index < 9 ? `0${index + 1}` : index + 1}</div>
      )}
      <div className={"info"}>
        <div className={"name"}>{name}</div>
        <Artists artists={song?.artists} />
      </div>
    </div>
  );
};

export default memo(MusicItem);
