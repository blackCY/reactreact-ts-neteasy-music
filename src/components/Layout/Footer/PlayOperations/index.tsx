import React, { useCallback, memo, useMemo } from "react";
import {
  StepBackwardOutlined,
  StepForwardOutlined,
  CaretRightOutlined,
  PauseOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { playList as playListLocalStorage } from "../../../../helpers/play";
import { ACTIONS } from "../../../../constants/playMusic";
import { notifyVipFn } from "../../../Notification/index";
import { MUSIC_TYPE } from "../../../../apis/types/business";
import "./index.less";

const PlayOperations = () => {
  const dispatch = useDispatch();
  const { audioState, controls, ref } = useSelector(
    (state: IState) => state.audioInfo
  );
  const { musicId } = useSelector((state: IState) => state.playMusic);

  const playList = useMemo(() => playListLocalStorage.getItem(), [musicId]);

  const togglePlayStatus = useCallback(() => {
    if (audioState?.paused) {
      controls.play();
    } else {
      controls.pause();
    }
  }, [controls, audioState?.paused]);

  const play = useCallback(
    (prev?: boolean) => {
      const len = playList.length;
      if (!len) return;

      const index = playList.findIndex(({ id }) => id === musicId);
      let nextIndex = -1;

      if (index > -1) {
        nextIndex = prev ? (index - 1 + len) % len : (index + 1) % len;
      } else {
        nextIndex = 0;
      }

      if (playList[nextIndex]?.fee === MUSIC_TYPE.VIP) {
        notifyVipFn();
        return;
      }

      dispatch({
        type: ACTIONS.PLAY,
        payload: {
          musicId: playList[nextIndex].id,
          music: playList[nextIndex],
        },
      });
    },
    [dispatch, musicId, playList]
  );

  const playPrev = useCallback(() => play(true), [play]);
  const playNext = useCallback(() => play(), [play]);

  return (
    <>
      <div className={"operation-prev"} onClick={playPrev}>
        <StepBackwardOutlined />
      </div>
      <div className={"operation-pause"} onClick={togglePlayStatus}>
        {audioState?.paused ? (
          <CaretRightOutlined />
        ) : musicId ? (
          ref.current?.readyState === 3 || ref.current?.readyState === 4 ? (
            <PauseOutlined />
          ) : (
            <LoadingOutlined />
          )
        ) : (
          <CaretRightOutlined />
        )}
      </div>
      <div className={"operation-next"} onClick={playNext}>
        <StepForwardOutlined />
      </div>
    </>
  );
};

export default memo(PlayOperations);
