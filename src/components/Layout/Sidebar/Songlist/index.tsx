import React, { memo } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import cn from "classnames";
import ROUTES from "../../../../constants/routes";
import { ISonglist } from "../../../../apis/types/business";
import { useSelector } from "react-redux";
import "./index.less";

interface IProps {
  title: string;
  data?: ISonglist[];
}

const Songlist: React.FC<IProps> = ({ title, data }) => {
  const history = useHistory();
  const routeMatch = useRouteMatch<{ songlistId: string }>(
    ROUTES.SONG_LIST_DETAIL
  );
  const { user } = useSelector((state: IState) => state.log);

  const handleClick = (id: number) =>
    history.push(`${ROUTES.SONG_LISTS}/${id}`);

  return (
    <div className={"sidebar-songlist"}>
      <div className={"sidebar-songlist-title"}>{title}</div>
      <div className={"sidebar-songlist-content"}>
        {data?.map(({ id, name }) => {
          const isActive =
            routeMatch && Number(routeMatch.params.songlistId) === id;
          return (
            <div
              key={id}
              className={cn("songlist-content-item", isActive && "active")}
              title={name}
              onClick={() => handleClick(id)}
            >
              {name.replace(user?.profile?.nickname!, "我")}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default memo(Songlist);
