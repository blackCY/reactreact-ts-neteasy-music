import React, {
  memo,
  useEffect,
  useCallback,
  useRef,
  useMemo,
  lazy,
  Suspense,
} from "react";
import { renderRoutes, RouteConfigComponentProps } from "react-router-config";
import { useDispatch, useSelector } from "react-redux";
import { MODE, playList as playListLocalStorage } from "../../helpers/play";
import createAudio from "../../helpers/createAudio";
import { IMyMusic } from "../../apis/types/business";
import { ACTIONS } from "../../constants/playMusic";
import playByMusicId from "../../helpers/controls";
import notificationFn from "../../helpers/notification";
import antdColor from "../../constants/antdColor";
import { onDispatch } from "../../helpers/dispatch";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import "./index.less";

const Notification = lazy(() => import("../Notification"));

interface LayoutProps extends RouteConfigComponentProps {}

const Layout: React.FC<LayoutProps> = (props) => {
  const dispatch = useDispatch();
  const ref = useRef<HTMLAudioElement | null>(null);

  const { musicId, musicUrl, playMode } = useSelector(
    (state: IState) => state.playMusic
  );
  const { audioState: state, audio, controls, ref: stateRef } = useSelector(
    (state: IState) => state.audioInfo
  );

  const playList = useMemo(() => playListLocalStorage.getItem(), [musicId]);

  const playMusic = useCallback(
    (index: number) => {
      const currentList = playList[index];

      dispatch({
        type: ACTIONS.PLAY,
        payload: {
          musicId: currentList.id,
          music: {
            ...currentList,
            picUrl: currentList.picUrl || currentList.album?.picUrl,
            duration: currentList.duration || currentList.duration / 1000,
          },
        },
      });
    },
    [dispatch, playList]
  );

  const playEnd = useCallback(() => {
    switch (playMode) {
      case MODE.PLAY_IN_ORDER: {
        const idx = playList.findIndex(({ id }: IMyMusic) => id === musicId);
        if (playList.length) {
          const nextIdx = idx > -1 ? (idx + 1) % playList.length : 0;
          playMusic(nextIdx);
        }
        return;
      }
      case MODE.SINGLE_CYCLE: {
        controls.play();
        return;
      }
      case MODE.SHUFFLE_PLAYBACK: {
        if (playList.length) {
          const randomIdx = Math.floor(Math.random() * playList.length);
          playMusic(randomIdx);
        }
        return;
      }
      default:
        return;
    }
  }, [controls, musicId, playList, playMode, playMusic]);

  const playError = useCallback(() => {
    musicId &&
      notificationFn({
        title: (
          <Suspense fallback={null}>
            <Notification content="播放错误" color={antdColor.error} />
          </Suspense>
        ),
        desc: "请重新选择歌曲播放",
      });
    return;
  }, []);

  useEffect(() => {
    createAudio(
      {
        src: musicUrl,
      },
      ref,
      state,
      onDispatch
    );
  }, []);

  useEffect(() => {
    if (!musicId) return;

    if (stateRef.current) {
      stateRef.current.onended = playEnd;
      stateRef.current.onerror = playError;
    }
  }, [musicId, playEnd, playError, stateRef]);

  useEffect(() => {
    musicId && playByMusicId(musicId);
  }, [musicId]);

  return (
    <>
      <Header />
      <div className={"layout-middle"}>
        <Sidebar />
        <div className={"layout-content"}>
          <div className="divcovery">{renderRoutes(props.route?.routes)}</div>
        </div>
      </div>
      {audio}
      <Footer />
    </>
  );
};

export default memo(Layout);
