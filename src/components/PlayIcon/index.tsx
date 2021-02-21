import React, { memo, useCallback } from "react";
import cn from "classnames";
import { useSelector, useDispatch } from "react-redux";
import { CaretRightOutlined } from "@ant-design/icons";
import "./index.less";
import { getMusicUrl } from '../../helpers/business';
import { ACTIONS } from '../../constants/playMusic';

interface PlayIconProps {
  className?: string;
  id?: number;
}

const PlayIcon: React.FC<PlayIconProps> = (props) => {
  const { className, id } = props;
  const dispatch = useDispatch()

  const { musicId, music } = useSelector((state: IState) => state.playMusic);

  const handleMusic = useCallback(() => {
    // console.log(id, music)
    // dispatch({
    //   type: ACTIONS.PLAY,
    //   payload: {
    //     musicId: id,
    //     musicUrl: getMusicUrl(id),

    //   } as _.IPlayMusic
    // })
  }, []);

  return (
    <div className={cn("playicon", className)} onClick={handleMusic}>
      <CaretRightOutlined />
    </div>
  );
};

export default memo(PlayIcon);
