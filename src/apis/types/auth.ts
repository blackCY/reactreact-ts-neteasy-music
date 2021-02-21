export interface ILoginRequest {
  phone: string;
  password: string;
  userId?: string | number;
}

export interface ILoginResult {
  token?: string;
  userId?: number;
  msg?: string;
  message?: string;
  code?: number;
  profile?: {
    userId: number;
    vipType: number;
    gender: number;
    accountStatus: number;
    nickname: string;
    birthday: number;
    city: number;
    userType: number;
    backgroundImgId: number;
    detailDescription: string;
    followed: boolean;
    backgroundUrl: string;
    avatarUrl: string;
    province: number;
    defaultAvatar: boolean;
    authStatus: number;
    description: string;
    signature: string;
    authority: number;
    followeds: number;
    follows: number;
    eventCount: number;
    playlistCount: number;
    playlistBeSubscribedCount: number;
  };
}
