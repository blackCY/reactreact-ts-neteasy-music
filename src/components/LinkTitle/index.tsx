import React, { useCallback, memo } from "react";
import { useHistory } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";

import "./index.less";

interface IProps {
  title: string;
  route: string;
}

const LinkTitle: React.FC<IProps> = ({ title, route }) => {
  const history = useHistory();

  const handleClick = useCallback(() => {
    history.push(route);
  }, []);

  return (
    <div onClick={handleClick} className="link-title">
      {title}
      <ArrowLeftOutlined />
    </div>
  );
};

export default memo(LinkTitle);
