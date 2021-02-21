import React, { memo } from "react";
import List from "../List";
import { ACTIONS } from "../../../../../constants/playMusic";
import { playHistory as playHistoryLocalStorage } from "../../../../../helpers/play";
import { useDispatch } from "react-redux";
import { IMyMusic, MUSIC_TYPE } from "../../../../../apis/types/business";
import { notifyVipFn } from "../../../../Notification/index";

const PlayHistory = () => {
  const dispatch = useDispatch();
  const playHistory = playHistoryLocalStorage.getItem();

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
        keepOrder: true, // 若直接从历史记录中播放，历史记录列表顺序不需要变更
      },
    });
  };

  const clearPlayHistory = () => {
    dispatch({
      type: ACTIONS.CLEAR_PLAY_HISTORY,
    });
  };

  return (
    <List data={playHistory} onClick={handleClick} onClear={clearPlayHistory} />
  );
};

export default memo(PlayHistory);
