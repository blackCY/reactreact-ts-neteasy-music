import React, { memo } from "react";
import { ACTIONS } from "../../../../../constants/playMusic";
import { playList as playListLocalStorage } from "../../../../../helpers/play";
import { IMyMusic, MUSIC_TYPE } from "../../../../../apis/types/business";
import { useDispatch } from "react-redux";
import List from "../List";
import { notifyVipFn } from "../../../../Notification/index";

const PlayList = () => {
  const dispatch = useDispatch();
  const playList = playListLocalStorage.getItem();

  const handleClick = (item: IMyMusic) => {
    if (item.fee === MUSIC_TYPE.VIP) {
      notifyVipFn();
      return;
    }

    dispatch({
      type: ACTIONS.PLAY,
      payload: {
        musicId: item.id,
        music: {
          ...item,
          picUrl: item.album?.picUrl,
          duration: item.duration / 1000,
        },
      },
    });
  };

  const handleClear = () => dispatch({ type: ACTIONS.CLEAR_PLAY_LIST });

  return <List data={playList} onClick={handleClick} onClear={handleClear} />;
};

export default memo(PlayList);
