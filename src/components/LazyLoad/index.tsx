import React, { memo } from "react";
import LazyLoad from "react-lazy-load";

interface ILazyLoadProps {
  children: React.ReactElement<HTMLImageElement>;
}

const LazyLoadComp: React.FC<ILazyLoadProps> = ({ children }) => {
  return (
    <LazyLoad offsetTop={300} width="100%" height="100%">
      {children}
    </LazyLoad>
  );
};

export default memo(LazyLoadComp);
