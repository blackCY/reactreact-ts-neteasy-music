import axios from "../helpers/axios";
import { IGetAlbumResponse } from "./types/album";
import { IGetCommentsResponse, IParams } from "./songs";

type GetAlbumFn = (id: number) => Promise<IGetAlbumResponse>;
type GetAlbumCommentFn = (params: IParams) => Promise<IGetCommentsResponse>;

/**
 * 获取专辑内容
 * 说明: 调用此接口, 传入专辑 id, 可获得专辑内容
 * 必选参数: id: 专辑 id
 *
 * @param {*} id
 * @return {*}
 */
export const getAlbum: GetAlbumFn = async (id) => {
  const response = await axios({
    url: "/album",
    params: {
      id,
    },
  });

  return response;
};

/**
 * 歌单评论
 * 说明: 调用此接口, 传入音乐 id 和 limit 参数, 可获得该歌单的所有评论(不需要登录)
 * 必选参数: id: 专辑 id
 * 可选参数: limit: 取出评论数量, 默认为 20
 * offset: 偏移数量, 用于分页, 如(评论页数 - 1) * 20, 其中 20 为 limit 的值
 * before: 分页参数, 取上一页最后一项的 time 获取下一页数据(获取超过5000条评论的时候需要用到)
 *
 * @param {number} id
 * @return {*}
 */
export const getAlbumComments: GetAlbumCommentFn = async ({
  id,
  offset,
  limit,
}) => {
  const response = await axios({
    url: "/comment/playlist",
    params: {
      id,
      offset,
      limit,
    },
  });

  return response;
};
