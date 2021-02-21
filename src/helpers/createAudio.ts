import * as React from "react";
import parseTimeRanges from "../hooks/utils/parseTimeRanges";

export interface HTMLMediaControls {
  play: () => Promise<void> | void;
  pause: () => void;
  mute: () => void;
  unmute: () => void;
  volume: (volume: number) => void;
  seek: (time: number) => void;
}

export interface HTMLMediaProps
  extends React.AudioHTMLAttributes<any>,
    React.VideoHTMLAttributes<any> {
  src: string;
}

export interface HTMLMediaState {
  buffered?: any[];
  duration?: number;
  paused?: boolean;
  muted?: boolean;
  time?: number; // currentTime
  volume?: number;
}

const createAudio = (
  elOrProps: React.ReactElement<any> | HTMLMediaProps,
  ref: React.RefObject<HTMLAudioElement>,
  state: HTMLMediaState,
  dispatch: (payload: Partial<_.IAudioInfo>) => void
) => {
  let element: React.ReactElement<any> | undefined;
  let props: HTMLMediaProps;

  if (React.isValidElement(elOrProps)) {
    element = elOrProps;
    props = element.props;
  } else {
    props = elOrProps;
  }

  const onPlay = () => {
    dispatch({
      audioState: {
        paused: false,
      },
    });
  };
  const onPause = () => {
    dispatch({ audioState: { paused: true } });
  };
  const onVolumeChange = () => {
    const el = ref.current;
    if (!el) {
      return;
    }
    dispatch({
      audioState: {
        muted: el.muted,
        volume: el.volume,
      },
    });
  };
  const onDurationChange = () => {
    const el = ref.current;
    if (!el) {
      return;
    }
    const { duration, buffered } = el;
    dispatch({
      audioState: {
        duration,
        buffered: parseTimeRanges(buffered),
      },
    });
  };
  const onTimeUpdate = () => {
    const el = ref.current;
    if (!el) {
      return;
    }
    dispatch({
      audioState: {
        time: el.currentTime,
      },
    });
  };
  const onProgress = () => {
    const el = ref.current;
    if (!el) {
      return;
    }
    dispatch({
      audioState: {
        buffered: parseTimeRanges(el.buffered),
      },
    });
  };

  if (element) {
    element = React.cloneElement(element, {
      controls: false,
      ...props,
      ref,
      onPlay: wrapEvent(props.onPlay, onPlay),
      onPause: wrapEvent(props.onPause, onPause),
      onVolumeChange: wrapEvent(props.onVolumeChange, onVolumeChange),
      onDurationChange: wrapEvent(props.onDurationChange, onDurationChange),
      onTimeUpdate: wrapEvent(props.onTimeUpdate, onTimeUpdate),
      onProgress: wrapEvent(props.onProgress, onProgress),
    });
  } else {
    element = React.createElement("audio", {
      controls: false,
      ...props,
      ref,
      onPlay: wrapEvent(props.onPlay, onPlay),
      onPause: wrapEvent(props.onPause, onPause),
      onVolumeChange: wrapEvent(props.onVolumeChange, onVolumeChange),
      onDurationChange: wrapEvent(props.onDurationChange, onDurationChange),
      onTimeUpdate: wrapEvent(props.onTimeUpdate, onTimeUpdate),
      onProgress: wrapEvent(props.onProgress, onProgress),
    } as any); // TODO: fix this typing.
  }

  // Some browsers return `Promise` on `.play()` and may throw errors if one tries to execute another `.play()` or `.pause()` while that promise is resolving. So prevent that with this lock.
  // See: https://bugs.chromium.org/p/chromium/issues/detail?id=593273
  let lockPlay = false;

  const controls = {
    play: () => {
      const el = ref.current;
      if (!el) {
        return undefined;
      }

      if (!lockPlay) {
        // * 在调用 audio play() 时, 现代浏览器会返回一个 promise, 对于执行失败的, 会触发一个 Unhandled Promise Rejection, 但是对于低版本的浏览器, 调用 play() 并不会返回一个 promise
        const promise = el.play();
        const isPromise = typeof promise === "object";

        if (isPromise) {
          lockPlay = true;
          const resetLock = () => {
            lockPlay = false;
          };
          promise.then(resetLock, resetLock);
        }

        return promise;
      }
      return undefined;
    },
    pause: () => {
      const el = ref.current;
      if (el && !lockPlay) {
        return el.pause();
      }
    },
    seek: (time: number) => {
      const el = ref.current;
      if (!el || state.duration === undefined) {
        return;
      }
      let currentTime = state.duration;
      if (!currentTime) {
        currentTime = el.duration;
      }
      time = Math.min(currentTime, Math.max(0, time));
      try {
        el.currentTime = time;
      } catch (e) {}
    },
    volume: (volume: number) => {
      const el = ref.current;
      if (!el) {
        return;
      }
      volume = Math.min(1, Math.max(0, volume));
      el.volume = volume;
      dispatch({
        audioState: {
          volume,
        },
      });
    },
    mute: () => {
      const el = ref.current;
      if (!el) {
        return;
      }
      el.muted = true;
    },
    unmute: () => {
      const el = ref.current;
      if (!el) {
        return;
      }
      el.muted = false;
    },
  };

  dispatch({ audio: element, ref, controls });
};

export const wrapEvent = (userEvent: any, proxyEvent?: any) => {
  return (event: React.BaseSyntheticEvent) => {
    try {
      proxyEvent && proxyEvent(event);
    } finally {
      userEvent && userEvent(event);
    }
  };
};

export default createAudio;
