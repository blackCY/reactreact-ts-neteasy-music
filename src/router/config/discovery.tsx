import { lazy } from "react";
import { CommonRouteConfig } from "./config";
import ROUTES from "../../constants/routes";

const discovery: CommonRouteConfig[] = [
  {
    path: ROUTES.DISCOVERY,
    component: lazy(() => import("../../pages/Discovery/Recommendation/index")),
    exact: true,
  },
  {
    path: ROUTES.SONG_LIST,
    component: lazy(() => import("../../pages/Discovery/Songlist/index")),
    exact: true,
  },
  {
    path: ROUTES.LATEST_MUSIC,
    component: lazy(() => import("../../pages/Discovery/LatestMusic/index")),
    exact: true,
  },
  {
    path: ROUTES.SONG_DETAIL,
    component: lazy(() => import("../../pages/Discovery/SongDetail/index")),
  },
  {
    path: ROUTES.SONG_LIST_DETAIL,
    component: lazy(() => import("../../pages/SonglistDetail/index")),
  },
  // {
  //   path: "*",
  //   component: lazy(() => import("../../components/NotFound/index")),
  // },
];

export default discovery;
