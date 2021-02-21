import { message } from "antd";
import store from "../redux";

export const vipFn = (is: boolean) => {
  if (is) {
    // TODO 当点击确定, 完善当前逻辑: 当前歌曲需要 vip, 检测到您未登录或者登录后没有 vip, 如果未登录, 则调到登录页, 如果登录没有 vip, 再提示是否需要跳转到充值页
    message.info("当前逻辑待完善...");
  } else {
    // 当点击取消, 如果 musicId=null, 则不管, 否则将播放状态设置为播放即可
    const { musicId } = store.getState().playMusic as _.IPlayMusic;
    const { controls } = store.getState().audioInfo as _.IAudioInfo;
    musicId && controls.play();
  }
};
