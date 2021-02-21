import React, { useMemo, useCallback, memo, lazy } from "react";
import { Icon } from "@blueprintjs/core";
import { useSelector } from "react-redux";
import "./index.less";

// const ProgressBar = lazy(() => import("../../../../components/ProgressBar"));
import ProgressBar from "../../../../components/ProgressBar"

const PlayVolume = () => {
  const { audioState, controls } = useSelector(
    (state: IState) => state.audioInfo
  );

  const handleBarClick = useCallback(
    (percent: number) => {
      controls?.volume(percent);
    },
    [controls]
  );

  const originDonePercent = useMemo(() => {
    const volume = Number((audioState?.volume || 0).toFixed(2));
    return Math.floor(volume * 100);
  }, [audioState?.volume]);

  return (
    <div className={"footer-playvolume"}>
      <Icon icon="volume-off" />
      <div className={"progress"}>
        <ProgressBar
          className={"bar"}
          originDonePercent={originDonePercent}
          onBarClick={handleBarClick}
        />
      </div>
    </div>
  );
};

export default memo(PlayVolume);
