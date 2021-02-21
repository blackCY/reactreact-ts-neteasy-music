import React, { useMemo, useCallback, memo } from "react";
import { formatTime } from "../../../../helpers/time";
import { useSelector } from "react-redux";
import BaseProgressBar from '../../../../components/ProgressBar'

const ProgressBar = () => {
  const { audioState, controls } = useSelector(
    (state: IState) => state.audioInfo
  );

  // 获取当前时间与音频总时长的比
  const donePercent = useMemo(() => {
    return audioState?.duration ? audioState?.time! / audioState.duration : 0;
  }, [audioState?.time, audioState?.duration]);

  // 获取格式化后的 mm:ss
  const renderLabel = useCallback(() => {
    return formatTime(audioState?.time);
  }, [audioState?.time]);

  const handleBarClick = useCallback(
    (percent) => {
      controls?.seek((audioState?.duration || 0) * percent);
      controls.play()
    },
    [controls, audioState?.duration]
  );

  return (
    <BaseProgressBar
      donePercent={donePercent}
      renderLabel={renderLabel}
      onBarClick={handleBarClick}
    />
  );
};

export default memo(ProgressBar);
