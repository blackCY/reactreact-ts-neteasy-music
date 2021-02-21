import store from "../redux/index";
import { AUDIO_INFO } from "../constants/audioInfo";

export const onDispatch = (payload: Partial<_.IAudioInfo>) => {
  store.dispatch({
    type: AUDIO_INFO,
    payload,
  });
};
