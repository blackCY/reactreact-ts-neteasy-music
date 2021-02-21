import React, { useEffect, useState, memo, useCallback } from "react";
import cn from "classnames";
import { useParams } from "react-router-dom";
import { likeComment, unlikeComment } from "../../../../apis/comment";
import useAsyncFn from "../../../../hooks/useAsyncFn";
import { PAGE } from "../../../../constants/pagination";
import { IComment } from "../../../../apis/types/comment";
import { getComments } from "../../../../apis/songs";
import Pagination from "../../../../components/Pagination";
import Comment from "../../../../components/Comment";
import Spinner from "../../../../components/Spinner";
import ROUTES from "../../../../constants/routes";
import useQuery from "../../../../hooks/useQuery";
import "./index.less";

const PAGE_SIZE = 20;

const Comments = () => {
  const query = useQuery<{ page: string }>();
  const params = useParams<{songId: string}>();

  const [page, setPage] = useState(PAGE);

  const [state, getCommentsFn] = useAsyncFn(getComments);
  const { value: result, loading } = state;

  const [, likeCommentFn] = useAsyncFn(likeComment);
  const [, unlikeCommentFn] = useAsyncFn(unlikeComment);

  useEffect(() => {
    let offset = 0;

    if (query.page) {
      if (Number.isNaN(Number(query.page))) {
        offset = 1;
      } else {
        offset = Number(query.page);
      }

      offset = (offset - 1) * PAGE_SIZE;
    }

    if (params.songId) {
      getCommentsFn({
        id: Number(params.songId),
        offset,
        limit: PAGE_SIZE,
      });
    }
  }, [getCommentsFn, params.songId, query.page]);

  const handlePageChange = useCallback((currPage: { page: number }) => {
    setPage(page);
    getCommentsFn({
      id: Number(params.songId),
      offset: (currPage.page - 1) * PAGE_SIZE,
      limit: PAGE_SIZE,
    });
  }, []);

  const handleLikeChange = async (comment: IComment, isHot: boolean) => {
    const comments = (isHot ? result?.hotComments : result?.comments) || [];
    const { commentId, liked } = comment;
    const cm = comments.find(
      ({ commentId: cid }) => cid === commentId
    ) as IComment;

    if (liked) {
      await unlikeCommentFn({ id: Number(params.songId), commentId }, () => {
        cm.liked = false;
        cm.likedCount -= 1;
      });
      return;
    }

    await likeCommentFn({ id: Number(params.songId), commentId }, () => {
      cm.liked = true;
      cm.likedCount += 1;
    });
  };

  return (
    <div className={"music-detail-comments"}>
      {loading ? (
        <div className={"detail-comments-block"}>
          <div className={"title"}>最新评论</div>
          <Spinner />
        </div>
      ) : (
        <>
          {!!result?.hotComments?.length && (
            <div className={"detail-comments-block"}>
              <div className={"title"}>精彩评论</div>
              <div className={"comments"}>
                {result?.hotComments.map((item) => {
                  return (
                    <div className={"item"} key={item.commentId}>
                      <Comment
                        data={item}
                        onLikeChange={(item) => handleLikeChange(item, true)}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className={cn("detail-comments-block", "latestComment")}>
            <div className={"title"}>最新评论（{result?.total || 0}）</div>
            <div className={"comments"}>
              {result?.comments.map((item) => {
                return (
                  <div className={"item"} key={item.commentId}>
                    <Comment
                      data={item}
                      onLikeChange={(item) => handleLikeChange(item, false)}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <div className={"detail-comments-pagination"}>
            <Pagination
              page={page}
              pageSize={PAGE_SIZE}
              total={result?.total}
              onPageChange={handlePageChange}
              url={ROUTES.SONG}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default memo(Comments);
