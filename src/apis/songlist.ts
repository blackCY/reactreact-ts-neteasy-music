import axios from "../helpers/axios";
import { ISimpleMusic, IMyMusic, ISonglist } from "./types/business";
import {
  IGetSonglistsRequest,
  IGetSonglistCatsResponse,
  ICategory,
} from "./types/songlist";
import { createMusicFromSimpleMusic } from "../helpers/business";
import { PAGE_SIZE } from "../constants/pagination";

type GetSonglistDetailFn = (
  id: number
) => Promise<{ songlist: ISonglist; songs: IMyMusic[] }>;
type GetSonglistsFn = (
  params: IGetSonglistsRequest
) => Promise<{ playlists: ISonglist[]; total: number }>;
type GetSonglistCatsFn = () => Promise<IGetSonglistCatsResponse>;
type GetSonglistHotCatsFn = () => Promise<ICategory[]>;
type GetHighQualitySonglistFn = (cat?: string) => Promise<ISonglist>;
type GetUserSonglistFn = (
  uid: number
) => Promise<{ create: ISonglist[]; collect: ISonglist[] }>;

/**
 * 获取歌单详情
 * 必选参数: id: 歌单 id
 * 可选参数: s: 歌单最近的 s 个收藏者, 默认为8
 *
 * @param {*} id
 * @return {*}
 */
export const getSonglistDetail: GetSonglistDetailFn = async (id) => {
  const response = await axios({
    url: "/playlist/detail",
    params: {
      id,
    },
  });

  const songs: IMyMusic[] = [];
  response?.playlist?.tracks?.forEach((item: ISimpleMusic, index: number) => {
    const privilege = response?.privileges?.[index];
    const song = createMusicFromSimpleMusic({
      ...item,
      fee: privilege?.fee,
      status: privilege?.st,
    });
    songs.push(song);
  });

  return {
    songlist: response.playlist,
    songs,
  };
};

/**
 * 歌单(网友精选碟)
 * 说明: 调用此接口 , 可获取网友精选碟歌单
 * 可选参数: 
 * order: 可选值为 'new' 和 'hot', 分别对应最新和最热, 默认为 'hot'
 * cat: cat: tag, 比如 "华语"、"古风" 、"欧美"、"流行", 默认为 "全部", 可从歌单分类接口获取(/playlist/catlist)
 * limit: 取出歌单数量 , 默认为 50
 * offset: 偏移数量 , 用于分页 , 如: ( 评论页数 -1)*50, 其中 50 为 limit 的值
 *
 * @param {*} {
 *   cat,
 *   order,
 *   limit = PAGE_SIZE,
 *   offset,
 * }
 * @return {*} 
 */
export const getSonglists: GetSonglistsFn = async ({
  cat,
  order,
  limit = PAGE_SIZE,
  offset,
}) => {
  const response = await axios({
    url: "/top/playlist",
    params: {
      cat,
      order,
      limit,
      offset,
    },
  });

  return response;
};

/**
 * 歌单分类
 * 说明: 调用此接口,可获取歌单分类,包含 category 信息
 *
 * @return {*}
 */
export const getSonglistCats: GetSonglistCatsFn = async () => {
  const response = await axios({
    url: "/playlist/catlist",
  });
  return response;
};

/**
 * 热门歌单分类
 * 说明: 调用此接口, 可获取歌单分类, 包含 category 信息
 *
 * @return {*}
 */
export const getSonglistHotCats: GetSonglistHotCatsFn = async () => {
  const response = await axios({
    url: "/playlist/hot",
  });

  return response.tags;
};

/**
 * 获取精品歌单
 * 说明: 调用此接口, 可获取精品歌单
 * 可选参数: cat: tag, 比如 "华语"、"古风" 、"欧美 "、"流行", 默认为 "全部", 可从精品歌单标签列表接口获取(/playlist/highquality/tags)
 * limit: 取出歌单数量 , 默认为 20
 * before: 分页参数,取上一页最后一个歌单的 updateTime 获取下一页数据
 *
 * @param {string} [cat='全部']
 * @return {*}
 */
export const getHighQualitySonglist: GetHighQualitySonglistFn = async (
  cat = "全部"
) => {
  const response = await axios({
    url: "/top/playlist/highquality",
    params: {
      limit: 1,
      cat,
    },
  });

  return response?.playlists?.[0];
};

export const getUserSonglist: GetUserSonglistFn = async (uid) => {
  const response = await axios({
    url: "/user/playlist",
    params: {
      uid,
      limit: PAGE_SIZE,
    },
  });

  const playlist: ISonglist[] = response.playlist || [];
  const create = playlist.filter(({ creator }) => uid === creator.userId);
  const collect = playlist.filter(({ creator }) => uid !== creator.userId);

  return {
    create,
    collect,
  };
};
