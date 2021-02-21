/// <reference path="./@types/index.d.ts" />

interface ActionParams<T = any> {
  type: string;
  payload: T;
}

// 这里定义整个状态树的接口类型
interface IState {
  playMusic: _.IPlayMusic;
  audioInfo: _.IAudioInfo;
  log: _.ILoginStatus;
}
