import React, { useState, memo } from "react";
import cn from "classnames";
import { noop } from "../../helpers/fn";
import "./index.less";

interface ITab {
  label?: string;
  key: string;
  renderLabel?: () => React.ReactElement;
  onClick?: (key: string) => void;
}

interface IProps {
  tabs: ITab[];
}

const Tabs: React.FC<IProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs?.[0].key);

  return (
    <div className={"comp-tabs"}>
      {tabs.map(({ label, key, renderLabel, onClick = noop }) => {
        return (
          <div
            key={key}
            className={cn("comp-tabs-tab", activeTab === key && "comp-tabs-tab-active")}
            onClick={() => {
              setActiveTab(key);
              onClick(key);
            }}
          >
            {label || (renderLabel && renderLabel())}
          </div>
        );
      })}
    </div>
  );
};

export default memo(Tabs);
