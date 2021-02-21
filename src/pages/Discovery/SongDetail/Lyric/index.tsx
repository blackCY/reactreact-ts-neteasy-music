import React, { useEffect, useRef, useState, useMemo, memo } from "react";
import { Spinner } from "@blueprintjs/core";
import cn from "classnames";
import { formatLyric } from "../../../../helpers/lyric";
import { getLyric } from "../../../../apis/songs";
import useAsyncFn from "../../../../hooks/useAsyncFn";
import { useSelector } from "react-redux";
import "./index.less";

const HIGHLIGHT_LYRIC_TOP = 160;
const LYRIC_LINE_HEIGHT = 30;

const Lyric = () => {
  const lyricRef = useRef<HTMLDivElement | null>();
  const [line, setLine] = useState(0);

  const audioInfo = useSelector((state: IState) => state.audioInfo);
  const { musicId } = useSelector((state: IState) => state.playMusic);

  const [lyricState, getLyricFn] = useAsyncFn(getLyric);

  useEffect(() => {
    musicId && getLyricFn(musicId);
  }, [getLyricFn, musicId]);

  // formatLyric 返回 Array<时间, 对应时间的歌词>
  const lines = useMemo(() => {
    if (!lyricState.value?.lyric) return [];
    return formatLyric(lyricState.value?.lyric);
  }, [lyricState.value?.lyric]);

  useEffect(() => {
    if (!lyricState.value?.lyric) return;

    if (!audioInfo.audioState?.paused) {
      window.requestAnimationFrame(() => {
        const audioTime = audioInfo.audioState?.time || 0;

        const lineIndex = lines.findIndex(([time], index) => {
          const prevTime = index - 1 >= 0 ? lines[index - 1][0] : time;
          const nextTime =
            index + 1 < lines.length ? lines[index + 1][0] : time;
          if (prevTime <= audioTime && nextTime >= audioTime) {
            return true;
          }
        });

        if (lineIndex > -1) {
          const scrollHeight =
            LYRIC_LINE_HEIGHT * lineIndex - HIGHLIGHT_LYRIC_TOP;

          lyricRef.current?.scrollTo({
            top: scrollHeight < 0 ? 0 : scrollHeight,
            behavior: "smooth",
          });
          setLine(lineIndex);
        }
      });
    }
  }, [audioInfo.audioState, lines]);

  if (!lyricState.value?.lyric) return <>当前歌曲暂无歌词...</>;

  return (
    <div
      className={"music-detail-lyric"}
      ref={(ref) => (lyricRef.current = ref)}
    >
      {lyricState.loading ? (
        <Spinner className="spinner" />
      ) : (
        <>
          {lines.map(([time, lyric], index) => {
            return (
              <div
                key={time}
                className={cn("line", line === index && "lyric-active")}
              >
                {lyric}
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default memo(Lyric);
