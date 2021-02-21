import React, { memo, useState, useCallback } from "react";
import cn from "classnames";
import "./index.less";

interface IDataProps {
  type: string | number;
  label: string;
}

interface INavTitleProps {
  data: Array<IDataProps>;
  title: string;
  onTabChange: (type: string | number) => void;
  defaultSelected?: string | number;
}

const NavTitle: React.FC<INavTitleProps> = ({
  defaultSelected,
  data,
  title,
  onTabChange,
}) => {
  const [selected, setSelected] = useState<number | string>(
    defaultSelected || 0
  );

  const handleTabChange = useCallback(
    (type: string | number) => {
      setSelected(type);
      onTabChange(type);
    },
    [onTabChange]
  );

  return (
    <div className="nav-title">
      <span className="nav-title-tag">{title}</span>

      {data.map(({ type, label }) => (
        <span
          key={type}
          className={cn("tabs", type === selected && "nav-title-active")}
          onClick={() => handleTabChange(type)}
        >
          {label}
        </span>
      ))}
    </div>
  );
};

export default memo(NavTitle);
