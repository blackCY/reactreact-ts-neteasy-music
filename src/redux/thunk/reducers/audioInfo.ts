import { handleAction } from "redux-actions";
import { AUDIO_INFO } from "../../../constants/audioInfo";
import { noop } from "../../../helpers/fn";

export const initialState: _.IAudioInfo = {
  audioState: {
    buffered: [],
    time: 0,
    duration: 0,
    paused: true,
    muted: false,
    volume: 0.5,
  },
  audio: null,
  controls: {
    play: noop,
    pause: noop,
    mute: noop,
    unmute: noop,
    volume: noop,
    seek: noop,
  },
  ref: { current: null },
};

export default handleAction(
  AUDIO_INFO,
  (state, { payload }: ActionParams<_.IAudioInfo>) => {
    return {
      ...state,
      ...payload,
      audioState: Object.assign({}, state.audioState, payload.audioState),
    };
  },
  initialState
);
