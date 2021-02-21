import axios from "../helpers/axios";
import {
  IBanner,
  IGetPersonalizedSonglistRequest,
  IMV,
  IMusic,
} from "./types/personalized";
import { ISonglist } from "./types/business";

type GetBannerFn = () => Promise<IBanner[]>;
type GetPersonalizedSonglistFn = (
  params: IGetPersonalizedSonglistRequest
) => Promise<ISonglist[]>;
type GetPersonalizedNewMusicFn = () => Promise<IMusic[]>;
type GetPersonalizedMVFn = () => Promise<IMV[]>;

const getBanner: GetBannerFn = async () => {
  const res = await axios({
    url: "/banner",
    params: {
      type: 0,
    },
  });
  return res.banners;
};

/**
 * 推荐歌单
 * 说明: 调用此接口 , 可获取推荐歌单
 * 可选参数: limit: 取出数量, 默认为 30(不支持 offset)
 *
 * @param {*} {
 *   limit,
 * }
 * @return {*} 
 */
const getPersonalizedSonglist: GetPersonalizedSonglistFn = async ({
  limit,
}) => {
  const response = await axios({
    url: "/personalized",
    params: {
      limit,
    },
  });

  return response.result || [];
};

/**
 * 推荐新音乐
 * 说明: 调用此接口, 可获取推荐新音乐
 * 可选参数: limit: 取出数量, 默认为 10 (不支持 offset)
 * 
 * @return {*} 
 */
const getPersonalizedNewMusic: GetPersonalizedNewMusicFn = async () => {
  const response = await axios({
    url: "/personalized/newsong",
  });

  return response.result;
};

export const getPersonalizedMV: GetPersonalizedMVFn = async () => {
  const response = await axios({
    url: "/personalized/mv",
  });

  return response.result;
};

export { getBanner, getPersonalizedSonglist, getPersonalizedNewMusic };
