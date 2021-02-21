import { getMusicUrl } from "./business";
import store from "../redux";

/* interface IPlayByMusicId {
  ref: React.RefObject<HTMLAudioElement>;
  musicId: number;
  play: () => Promise<void> | void;
} */

// 获取播放 id, 播放
const playByMusicId = (musicId: number) => {
  const { ref, controls } = store.getState().audioInfo;

  if (ref.current) {
    ref.current.src = getMusicUrl(musicId);
    controls.play();
  }
};

export default playByMusicId;
