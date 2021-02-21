import React, { memo, useEffect } from "react";
import { Popover, Menu } from "antd";
import { LogoutOutlined, CaretRightOutlined } from "@ant-design/icons";
import { ACTIONS } from "../../../redux/thunk/reducers/log";
import { logout } from "../../../apis/auth";
import useAsyncFn from "../../../hooks/useAsyncFn";
import { useDispatch, useSelector } from "react-redux";
import { getUserSonglist } from "../../../apis/songlist";
import { useHistory } from "react-router-dom";
// import Menus from "./Menus";
import ROUTES from "../../../constants/routes";
import Songlist from "./Songlist";
import "./index.less";

const Sidebar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user, isLogined } = useSelector((state: IState) => state.log);
  const [, logoutFn] = useAsyncFn(logout);
  const [songlistState, getUserSonglistFn] = useAsyncFn(getUserSonglist);

  useEffect(() => {
    isLogined && getUserSonglistFn(user?.userId!);
  }, []);

  const handleLogout = async () => {
    await logoutFn();
    dispatch({ type: ACTIONS.LOGOUT });
  };

  return (
    <div className={"layout-sidebar"}>
      <div className={"layout-sidebar-user"}>
        <Popover
          content={
            <Menu>
              <Menu.Item icon={<LogoutOutlined />} onClick={handleLogout}>
                退出登录
              </Menu.Item>
            </Menu>
          }
          trigger={["hover"]}
        >
          {isLogined ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <div className={"sidebar-user-avatar"}>
                <img src={user?.profile?.avatarUrl} loading="lazy" alt="" />
              </div>
              <div className={"sidebar-user-name"}>
                <span>{user?.profile?.nickname}</span>
              </div>
            </div>
          ) : (
            <div
              className={"sidebar-user-name"}
              onClick={() => history.push(ROUTES.LoginAndRegister)}
            >
              <span>未登录</span>
              <CaretRightOutlined />
            </div>
          )}
        </Popover>
      </div>

      <div className={"layout-sidebar-content"}>
        {/* <Menus /> */}

        {!songlistState.loading && isLogined && (
          <>
            <div className={"sidebar-content-block"}>
              <Songlist title="创建的歌单" data={songlistState.value?.create} />
            </div>

            <div className={"sidebar-content-block"}>
              <Songlist
                title="收藏的歌单"
                data={songlistState.value?.collect}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default memo(Sidebar);
