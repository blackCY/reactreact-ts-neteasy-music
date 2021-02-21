import React, { memo, useState } from "react";
import { Tooltip, Popover } from "antd";
import { Icon } from "@blueprintjs/core";
import cn from "classnames";
import PlayList from "./PlayList";
import PlayHistory from "./PlayHistory";
import "./index.less";

interface ITab {
  tab: string;
  tabKey: string;
}

export const TABS: IDictionary<ITab> = {
  PLAY_LIST: {
    tab: "播放列表",
    tabKey: "PLAY_LIST",
  },
  PLAY_HISTORY: {
    tab: "历史记录",
    tabKey: "PLAY_HISTORY",
  },
};

const PlayRecord = () => {
  const [activeTab, setActiveTab] = useState({
    curr: TABS.PLAY_LIST.tabKey,
  });
  const [visible, setVisible] = useState(false);

  return (
    <Popover
      content={
        <>
          <div className={"tabs"}>
            {Object.keys(TABS).map((key) => {
              return (
                <div
                  key={key}
                  className={cn("tab", activeTab.curr === key && "play-record-active")}
                  onClick={() => setActiveTab({ curr: TABS[key].tabKey })}
                >
                  {TABS[key].tab}
                </div>
              );
            })}
          </div>

          <div className={"footer-play-record"}>
            {activeTab.curr === TABS.PLAY_LIST.tabKey ? (
              <PlayList />
            ) : (
              <PlayHistory />
            )}
          </div>
        </>
      }
      visible={visible}
      trigger={["click"]}
      getPopupContainer={(trigger) => trigger.parentNode as HTMLElement}
      onVisibleChange={(isVisible) => setVisible(isVisible)}
      placement="rightBottom"
    >
      <Tooltip title="打开播放列表">
        <Icon icon="menu-closed" />
      </Tooltip>
    </Popover>
  );
};

export default memo(PlayRecord);
