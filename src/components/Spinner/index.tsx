import React, { memo } from "react";
import { Spin } from "antd";

const Spinner = () => (
  <Spin
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
    }}
  />
);

export default memo(Spinner);
