import { sessionLocalStorage } from "../../../helpers/session";
import { ILoginResult } from '../../../apis/types/auth';

const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";

export const ACTIONS = {
  LOGIN,
  LOGOUT,
};

const session = sessionLocalStorage.getItem();

export const initialState: _.ILoginStatus = {
  isLogined: !!session.userId,
  user: session as ILoginResult,
};

const logReducer = (state = initialState, action: ActionParams) => {
  switch (action.type) {
    case ACTIONS.LOGIN: {
      sessionLocalStorage.setItem(action.payload?.user);

      return {
        ...state,
        isLogined: true,
        user: action.payload?.user,
      };
    }
    case ACTIONS.LOGOUT: {
      sessionLocalStorage.removeItem();

      return {
        ...state,
        isLogined: false,
        user: {},
      };
    }
    default:
      return state;
  }
};

export default logReducer;
