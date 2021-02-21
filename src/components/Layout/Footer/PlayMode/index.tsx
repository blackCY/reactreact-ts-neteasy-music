import React, { useCallback, memo } from "react";
import { Icon, IconName } from "@blueprintjs/core";
import { Tooltip } from "antd";
import { MODE } from "../../../../helpers/play";
import { ACTIONS } from "../../../../constants/playMusic";
import { useSelector, useDispatch } from "react-redux";

const MODE_ORDER = [
  MODE.PLAY_IN_ORDER,
  MODE.SINGLE_CYCLE,
  MODE.SHUFFLE_PLAYBACK,
];

const MODE_MAP: IDictionary<{
  label: string;
  icon: IconName;
}> = {
  [MODE.PLAY_IN_ORDER]: {
    label: "顺序播放",
    icon: "sort",
  },
  [MODE.SINGLE_CYCLE]: {
    label: "单曲循环",
    icon: "repeat",
  },
  [MODE.SHUFFLE_PLAYBACK]: {
    label: "随机播放",
    icon: "random",
  },
};

const PlayMode = () => {
  const dispatch = useDispatch();
  const { playMode } = useSelector((state: IState) => state.playMusic);

  const handleClick = useCallback(() => {
    const idx = MODE_ORDER.findIndex((m) => m === playMode);
    const nextMode = MODE_ORDER[(idx + 1) % MODE_ORDER.length];

    dispatch({
      type: ACTIONS.SET_PLAY_MODE,
      payload: {
        playMode: nextMode,
      },
    });
  }, [dispatch, playMode]);

  return (
    <Tooltip title={MODE_MAP[playMode].label}>
      <Icon icon={MODE_MAP[playMode].icon} onClick={handleClick} />
    </Tooltip>
  );
};

export default memo(PlayMode);
