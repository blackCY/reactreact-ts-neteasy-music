import { handleActions } from "redux-actions";
import { ACTIONS } from "../../../constants/playMusic";
import { getMusicUrl } from "../../../helpers/business";
import {
  playMode as playModeLocalStorage,
  setPlayHistory,
  playList as playListLocalStorage,
  playHistory as playHistoryLocalStorage,
  MODE,
} from "../../../helpers/play";

const initialState: _.IPlayMusic = {
  musicId: 0,
  musicUrl: "",
  playMode: playModeLocalStorage.getItem(),
};

export default handleActions(
  {
    [ACTIONS.PLAY](state, { payload }: ActionParams) {
      if (!payload?.keepOrder && payload.music) {
        setPlayHistory(payload?.music);
      }

      return {
        ...state,
        ...payload,
        musicUrl: getMusicUrl(payload?.musicId),
      };
    },
    [ACTIONS.SET_PLAY_MODE](state, { payload }: ActionParams) {
      playModeLocalStorage.setItem(payload?.playMode);

      return {
        ...state,
        playMode: payload?.playMode || MODE.PLAY_IN_ORDER,
      };
    },
    [ACTIONS.SET_PLAY_LIST](state, { payload }: ActionParams) {
      const playList = payload?.playList || [];
      playListLocalStorage.setItem(playList);
      return state;
    },
    [ACTIONS.CLEAR_PLAY_LIST](state, action) {
      playListLocalStorage.removeItem();
      return state;
    },
    [ACTIONS.CLEAR_PLAY_HISTORY](state, action) {
      playHistoryLocalStorage.removeItem();
      return state;
    },
  },
  initialState
);
