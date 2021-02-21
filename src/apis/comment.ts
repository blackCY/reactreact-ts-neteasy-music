import axios from "../helpers/axios";

enum COMMENT_TYPE {
  MUSIC = 0,
  MV = 1,
  SONGLIST = 2,
  ALBUM = 3,
  RADIO_STATION = 4,
  VIDEO = 5,
}

interface ILikeUnlikeCommentRequest {
  likeOrUnlike: number;
  type?: COMMENT_TYPE;
  id: number;
  commentId: number;
}

type Params = Omit<ILikeUnlikeCommentRequest, "likeOrUnlike">;

type LikeUnlikeCommentFn = (params: ILikeUnlikeCommentRequest) => Promise<any>;
type LikeCommentFn = (params: Params, callback?: () => void) => Promise<any>;
type UnlikeCommentFn = (params: Params, callback?: () => void) => Promise<any>;

/**
 * 给评论点赞
 * 说明: 调用此接口, 传入 type, 资源 id, 和评论 id cid 和 是否点赞参数 t 即可给对 应评论点赞(需要登录)
 * 必选参数: id: 资源 id, 如歌曲 id,mv id
 *
 * @param {*} {
 *   likeOrUnlike,
 *   type,
 *   id,
 *   commentId,
 * }
 * @return {*} 
 */
export const likeUnlikeComment: LikeUnlikeCommentFn = async ({
  likeOrUnlike,
  type,
  id,
  commentId,
}) => {
  const response = await axios({
    url: "/comment/like",
    params: {
      id,
      type,
      t: likeOrUnlike,
      cid: commentId,
    },
  });
  return response;
};

// 点赞
export const likeComment: LikeCommentFn = async ({
  id,
  commentId,
  type = COMMENT_TYPE.MUSIC,
}) => {
  const response = await likeUnlikeComment({
    likeOrUnlike: 1,
    type,
    id,
    commentId,
  });
  return response;
};

// 取消点赞
export const unlikeComment: UnlikeCommentFn = async ({
  id,
  commentId,
  type = COMMENT_TYPE.MUSIC,
}) => {
  const response = await likeUnlikeComment({
    likeOrUnlike: 2,
    type,
    id,
    commentId,
  });
  return response;
};
