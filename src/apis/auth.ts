import { ILoginRequest, ILoginResult } from "./types/auth";
import axios, { requestWithoutErrorToast } from "../helpers/axios";

type LoginFn = (params: ILoginRequest) => Promise<ILoginResult>;

// 手机号登录
export const loginByPhone: LoginFn = ({ phone, password }) => {
  return requestWithoutErrorToast({
    url: "/login/cellphone",
    params: {
      phone,
      password,
    },
  });
};

// 我的服务器登录
// export const loginByServer: LoginFn = (()) => {
  // return 
// }

export const logout = () => {
  return axios({
    method: "post",
    url: "/logout",
  });
};
