import React, { memo } from "react";
import { Icon, IconName } from "@blueprintjs/core";
import { useHistory, useLocation } from "react-router-dom";
import cn from "classnames";
import ROUTES from "../../../../constants/routes";
import "./index.less";

interface IMenuItem {
  icon: IconName;
  label: string;
  active?: boolean;
  route: string;
}

interface IMenu {
  title?: string;
  items: IMenuItem[];
}

const MENU: IMenu[] = [
  {
    items: [
      {
        icon: "music",
        label: "发现音乐",
        route: ROUTES.DISCOVERY,
      },
      {
        icon: "mobile-video",
        label: "视频",
        route: ROUTES.VIDEOS,
      },
    ],
  },
  {
    title: "我的音乐",
    items: [
      {
        icon: "star-empty",
        label: "我的收藏",
        route: ROUTES.COLLECTION,
      },
      {
        icon: "import",
        label: "下载管理",
        route: ROUTES.DOWNLOAD,
      },
      {
        icon: "cloud",
        label: "我的音乐云盘",
        route: ROUTES.CLOUD,
      },
    ],
  },
];

const Menus = () => {
  const history = useHistory();
  const { pathname } = useLocation();

  const handleMenuItemClick = (route: string) => {
    history.push(route);
  };

  return (
    <>
      {MENU.map(({ title, items }, index) => {
        return (
          <div className={"sidebar-menus"} key={index}>
            {title && <div className={"sidebar-menus-title"}>{title}</div>}
            <div className={"sidebar-menus-tabs"}>
              {items.map(({ icon, label, route }) => {
                const isActive =
                  pathname.startsWith(route) ||
                  (pathname === ROUTES.ROOT && route === ROUTES.DISCOVERY);
                return (
                  <div
                    key={label}
                    className={
                      isActive
                        ? cn(
                            "sidebar-menus-tabs-tab",
                            "sidebar-menus-tabs-active"
                          )
                        : "sidebar-menus-tabs-tab"
                    }
                    onClick={() => handleMenuItemClick(route)}
                  >
                    <Icon icon={icon} />
                    {label}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default memo(Menus);
