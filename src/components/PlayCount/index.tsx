import React, { memo } from "react";
import cn from "classnames";
import { PlaySquareOutlined } from "@ant-design/icons";
import { formatNum } from "../../helpers/num";
import "./index.less";

interface PlayCountProps {
  count: number;
  className?: string;
}

const PlayCount: React.FC<PlayCountProps> = (props) => {
  const { className, count } = props;
  return (
    <div className={cn("playcount", className)}>
      <PlaySquareOutlined />
      {formatNum(count)}
    </div>
  );
};

export default memo(PlayCount);
