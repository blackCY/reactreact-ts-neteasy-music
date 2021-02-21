import React, { memo } from "react";

interface NoAuthProps {}

const NoAuth: React.FC<NoAuthProps> = (props) => {
  return <div>NoAuth</div>;
};

export default memo(NoAuth);
