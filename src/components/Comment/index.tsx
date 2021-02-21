import React, { useCallback, memo } from "react";
import { Icon } from "@blueprintjs/core";
import cn from "classnames";
import { formatDatetime } from "../../helpers/time";
import { IComment } from "../../apis/types/comment";
import "./index.less";

interface IProps {
  data: IComment;
  onLikeChange?: (comment: IComment) => void;
}

const Comment: React.FC<IProps> = ({ data, onLikeChange }) => {
  const { user, content, beReplied, time, likedCount, liked } = data;

  const likeUnlike = useCallback(async () => {
    await onLikeChange!(data);
  }, []);

  return (
    <div className={"comp-comment"}>
      <div className={"avatar"}>
        <img src={`${user.avatarUrl}?param=35y35`} alt="" loading="lazy" />
      </div>

      <div className={"info"}>
        <div className={"comment"}>
          <span className={"nickname"}>{user.nickname}: </span>
          <span>{content}</span>
        </div>

        <div className={"reply"}>
          {beReplied.map(({ content, user }, index) => {
            return (
              <div className={"item"} key={index}>
                <span className={"nickname"}>{user.nickname}: </span>
                <span>{content}</span>
              </div>
            );
          })}
        </div>

        <div className={"others"}>
          <div className={"time"}>{formatDatetime(time, true)}</div>
          <div className={"operations"}>
            <div className={cn("like", liked && "active")} onClick={likeUnlike}>
              <Icon icon="thumbs-up" iconSize={14} />
              &nbsp;
              {!!likedCount && <span>{likedCount}</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Comment);
