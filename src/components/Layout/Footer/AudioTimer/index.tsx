import React, { memo, useMemo } from "react";

import { formatTime } from "../../../../helpers/time";
import { useSelector } from "react-redux";

const AudioTimer = () => {
  const { audioState } = useSelector((state: IState) => state.audioInfo);

  const time = useMemo(() => {
    return `${formatTime(audioState?.time)} / ${formatTime(audioState?.duration)}`;
  }, [audioState?.time, audioState?.duration]);

  return <div>{time}</div>;
};

export default memo(AudioTimer);
