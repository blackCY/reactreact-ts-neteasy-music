import React from "react";
import { lazy } from "react";
import { RouteConfig } from "react-router-config";
import discovery from "./config/discovery";
import ROUTES from "../constants/routes";
import Layout from "../components/Layout";

// TODO 在 Layout 之下, 组件懒加载的时候, Layout 也会重加载一次..., 而且所有的组件都放在 Layout 下, 导致所有的组件都不能预加载
const routes: RouteConfig[] = [
  {
    path: "/no-auth",
    exact: true,
    component: lazy(() => import("../components/NoAuth/index")),
  },
  {
    path: ROUTES.LoginAndRegister,
    exact: true,
    component: lazy(() => import("../pages/Login/index")),
  },
  {
    component: Layout,
    routes: [
      ...discovery,
      {
        path: "*",
        component: lazy(() => import("../components/NotFound/index")),
      },
    ],
  },
];

export default routes;
