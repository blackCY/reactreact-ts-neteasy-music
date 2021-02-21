import React from "react";
import { AxiosStatic } from 'axios'
import { ILoginResult } from "../../apis/types/auth";
import { HTMLMediaState, HTMLMediaProps, HTMLMediaControls } from '../../helpers/createAudio';
import { IMyMusic } from '../../apis/types/business';
import { MODE } from '../../helpers/play';

declare namespace MyGlobal {
  export interface IPlayMusic {
    musicId: number;
    musicUrl: string;
    music?: IMyMusic;
    playMode: MODE;
  }

  export interface IAudioInfo {
    audio: React.ReactElement<HTMLMediaProps> | null;
    audioState: HTMLMediaState;
    controls: HTMLMediaControls;
    ref: {
      current: HTMLAudioElement | null;
    };
  }

  export interface ILoginStatus {
    isLogined: boolean;
    user?: ILoginResult;
  }

  export interface IAxios {
    [key: string]: AxiosStatic[key];
  }
}

export = MyGlobal;
export as namespace _;
