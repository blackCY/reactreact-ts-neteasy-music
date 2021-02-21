import React, { memo } from "react";
import { Skeleton } from "antd";
import "./index.less";

// https://szdblog.com/usr/themes/Aria/assets/img/loading.svg
interface SkeletonImageProps {
  count?: number;
}

const SkeletonImage: React.FC<SkeletonImageProps> = ({ count = 5 }) => {
  const arr = [];
  for (let i = 0; i < count; i++) arr.push(i);
  return (
    <div className="skeleton-comp">
      {arr.map((item: any) => (
        <Skeleton.Image key={item} />
      ))}
    </div>
  );
};

export default memo(SkeletonImage);
