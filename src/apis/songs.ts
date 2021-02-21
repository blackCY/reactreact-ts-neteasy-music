import axios from "../helpers/axios";
import { IMyMusic, IMusic, ISonglist, ISimpleMusic } from "./types/business";
import { IComment } from "./types/comment";
import { createMusicFromSimpleMusic } from "../helpers/business";

export enum SONG_TYPE {
  ALL = 0,
  CHINESE = 7,
  EU_USA = 96,
  JAPANESE = 8,
  KOREAN = 16,
}

export interface IParams {
  id: number;
  offset?: number;
  limit?: number;
}

export interface IGetCommentsResponse {
  comments: IComment[];
  hotComments?: IComment[];
  isMusician: boolean;
  more: boolean;
  moreHot: boolean;
  topComments: IComment[];
  total: number;
  userId: number;
}

type GetSongDetailFn = (ids: number[]) => Promise<IMyMusic[]>;
type GetTopSongsFn = (type?: SONG_TYPE) => Promise<IMyMusic[]>;
type GetRecommendSongsFn = () => Promise<IMusic[]>;
type GetSimiSonglistFn = (params: IParams) => Promise<ISonglist[]>;
type GetgetSimiSongFn = (params: IParams) => Promise<IMusic[]>;
type GetCommentsFn = (params: IParams) => Promise<IGetCommentsResponse>;
type GetgetLyricFn = (
  id: number
) => Promise<{ lyric: string; offset: number; version: number }>;

/**
 * 获取歌曲详情
 * 说明: 调用此接口, 传入音乐 id, 可获得歌曲详情(注意:歌曲封面现在需要通过专辑内容接口获取)
 *
 * @param {*} ids 支持多个 id, 用,隔开
 * @return {*}
 */
export const getSongDetail: GetSongDetailFn = async (ids) => {
  const response = await axios({
    url: "/song/detail",
    params: {
      ids: ids.join(","),
    },
  });

  return response?.songs.map((item: ISimpleMusic) =>
    createMusicFromSimpleMusic(item)
  );
};

export const getTopSongs: GetTopSongsFn = async (type = SONG_TYPE.ALL) => {
  const response = await axios({
    url: "/top/song",
    params: {
      type,
    },
  });

  return response.data;
};

export const getRecommendSongs: GetRecommendSongsFn = async () => {
  const response = await axios({
    url: "/recommend/songs",
  });

  return response.recommend;
};

/**
 * 获取相似歌单
 * 说明: 调用此接口, 传入歌曲 id, 可获得相似歌单
 * 必选参数: id: 歌曲 id
 *
 * @param {*} {
 *   id,
 *   offset,
 *   limit,
 * }
 * @return {*}
 */
export const getSimiSonglist: GetSimiSonglistFn = async ({
  id,
  offset,
  limit,
}) => {
  const response = await axios({
    url: "/simi/playlist",
    params: {
      id,
      offset,
      limit,
    },
  });

  return response.playlists;
};

/**
 * 获取相似音乐
 * 调用此接口, 传入歌曲 id, 可获得相似歌曲
 * 必选参数: id: 歌曲 id
 *
 * @param {*} { id, offset, limit }
 * @return {*}
 */
export const getSimiSong: GetgetSimiSongFn = async ({ id, offset, limit }) => {
  const response = await axios({
    url: "/simi/song",
    params: {
      id,
      offset,
      limit,
    },
  });

  return response.songs;
};

/**
 * 获取歌曲评论
 * 说明: 调用此接口, 传入音乐 id 和 limit 参数, 可获得该音乐的所有评论(不需要登录)
 * 必选参数: id: 音乐 id
 * 可选参数: limit: 取出评论数量, 默认为 20
 * offset: 偏移数量, 用于分页, 如:(评论页数-1)*20, 其中 20 为 limit 的值
 * before: 分页参数, 取上一页最后一项的 time 获取下一页数据(获取超过5000条评论的时候需要用到)
 *
 * @param {*} { id, offset, limit }
 * @return {*}
 */
export const getComments: GetCommentsFn = async ({ id, offset, limit }) => {
  const response = await axios({
    url: "/comment/music",
    params: {
      id,
      offset,
      limit,
    },
  });

  return response;
};

/**
 * 获取歌词
 * 说明: 调用此接口, 传入音乐 id 可获得对应音乐的歌词(不需要登录)
 * 必选参数: id: 音乐 id
 *
 * @param {*} id
 * @return {*}
 */
export const getLyric: GetgetLyricFn = async (id) => {
  const response = await axios({
    url: "/lyric",
    params: {
      id,
    },
  });

  return response.lrc;
};
