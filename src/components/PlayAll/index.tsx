import React, { memo, useCallback } from "react";
import { IMyMusic } from "../../apis/types/business";
import { useDispatch } from "react-redux";
import { ACTIONS } from "../../constants/playMusic";
import "./index.less";

interface IPlayAllProps {
  data: IMyMusic[];
}

const PlayAll: React.FC<IPlayAllProps> = ({ data }) => {
  const dispatch = useDispatch();

  const playAll = useCallback(() => {
    try {
      dispatch({
        type: ACTIONS.PLAY,
        payload: {
          musicId: data[0].id,
          music: {
            ...data[0],
            picUrl: data[0].album?.picUrl,
            duration: data[0].duration! / 1000,
          },
        },
      });
    } finally {
      dispatch({
        type: ACTIONS.SET_PLAY_LIST,
        payload: {
          playList: data,
        },
      });
    }
  }, [data, dispatch]);

  return (
    <div className={"playall-operations"}>
      <div className={"playAll"} onClick={playAll}>
        播放全部
      </div>
    </div>
  );
};

export default memo(PlayAll);
