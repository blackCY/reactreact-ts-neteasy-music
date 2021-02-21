import React, { memo } from "react";
import cn from "classnames";
import "./index.less";
import { noop } from "../../../../../helpers/fn";

interface BannerItemProps {
  typeTitle: string;
  imageUrl: string;
  className?: string;
  onClick?: () => void;
}

const BannerItem: React.FC<BannerItemProps> = (props) => {
  const { className, onClick = noop, imageUrl, typeTitle } = props;

  return (
    <div className={cn("banner-items", className)} onClick={onClick}>
      <img src={imageUrl} loading="lazy" alt="" />
      <div className={"type"}>{typeTitle}</div>
    </div>
  );
};

export default memo(BannerItem);
