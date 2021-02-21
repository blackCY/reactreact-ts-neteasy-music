import React, { useEffect, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Divider } from "antd";
import { useParams } from "react-router-dom";
import cn from "classnames";
import playBar from "../../../assets/image/play-bar.png";
import playCd from "../../../assets/image/play-cd.png";
import {
  getSimiSonglist,
  getSimiSong,
  getSongDetail,
} from "../../../apis/songs";
import useAsyncFn from "../../../hooks/useAsyncFn";
import { IArtist } from "../../../apis/types/business";
import Spinner from "../../../components/Spinner";
import Lyric from "./Lyric";
import Comments from "./Comments";
import Songlists from "./Songlists";
import SimiSongs from "./SimiSongs";
import { ACTIONS } from "../../../constants/playMusic";
import "./index.less";

const MusicDetail = () => {
  const params = useParams<{ songId: string }>();
  const dispatch = useDispatch();

  const audioInfo = useSelector((state: IState) => state.audioInfo);
  const { music, musicId } = useSelector((state: IState) => state.playMusic);

  const isPlaying = !audioInfo.audioState?.paused;

  const [songDetail, getSongDetailFn] = useAsyncFn(getSongDetail);
  const [songlistState, getSimiSonglistFn] = useAsyncFn(getSimiSonglist);
  const [simiSongState, getSimiSongFn] = useAsyncFn(getSimiSong);

  useEffect(() => {
    if (params.songId || musicId) {
      getSongDetailFn([Number(params.songId) || musicId]);
    }
  }, [getSongDetailFn, musicId, params.songId]);

  useEffect(() => {
    if (!songDetail.value) return;

    try {
      dispatch({
        type: ACTIONS.PLAY,
        payload: {
          musicId: songDetail.value[0].id,
          music: songDetail.value[0],
        },
      });
    } catch (e) {}
  }, [dispatch, songDetail.value]);

  useEffect(() => {
    if (params.songId || musicId) {
      getSimiSonglistFn({ id: Number(params.songId) || musicId });
      getSimiSongFn({ id: Number(params.songId) || musicId });
    }
  }, [getSimiSongFn, getSimiSonglistFn, musicId, params.songId]);

  return (
    <div className="sidebar-music-detail">
      <div className={"music-detail-music"}>
        <div className={"detail-music-cdWrap"}>
          <div className={"music-cdWrap-cd"}>
            <div className={"cdWrap-cd-bar"}>
              <img
                src={playBar}
                className={cn("playBar", !isPlaying && "pause")}
                loading="lazy"
                alt=""
              />
              <img src={playCd} className={"playCd"} loading="lazy" alt="" />
            </div>
            <div className={"cdWrap-cd-circle"}>
              <div className={cn("cover", isPlaying && "rotate")}>
                <img
                  src={`${
                    music?.picUrl || music?.album?.blurPicUrl
                  }?param=190y190`}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        <div className={"detail-music-lyric"}>
          <div className={"music-lyric-name"}>{music?.name}</div>
          <div className={"music-lyric-artists"}>
            歌手：
            <span>
              {music?.artists.map(({ name }: IArtist) => name).join(" / ")}
            </span>
          </div>
          <div className={"music-lyric-lrc"}>
            <Lyric />
          </div>
        </div>
      </div>

      <Divider />

      <div className={"music-detail-relatedInfo"}>
        <div className={"detail-relatedInfo-comment"}>
          <Comments />
        </div>
        <div className={"detail-relatedInfo-relatedDetail"}>
          {songlistState.loading || simiSongState.loading ? (
            <Spinner />
          ) : (
            <>
              {!!songlistState.value?.length && (
                <div className={"relatedInfo-relatedDetail-block"}>
                  <div className={"title"}>包含这首歌的歌单</div>
                  <div>
                    <Songlists data={songlistState.value || []} />
                  </div>
                </div>
              )}
              <div className={"relatedInfo-relatedDetail-block"}>
                <div className={"title"}>相似歌曲</div>
                <div>
                  <SimiSongs data={simiSongState.value || []} />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(MusicDetail);
