import React, { memo } from "react";
import cn from "classnames";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Tooltip } from "antd";
import LazyLoad from "../../../components/LazyLoad";
import Artists from "../../Artists/";
import AudioTimer from "./AudioTimer";
import ProgressBar from "./ProgressBar";
import PlayMode from "./PlayMode";
import PlayOperations from "./PlayOperations";
import PlayVolume from "./PlayVolume";
import PlayRecord from "./PlayRecord";
import ROUTES from "./../../../constants/routes";
import "./index.less";

const Footer = () => {
  const { musicId, music } = useSelector((state: IState) => state.playMusic);

  const history = useHistory();

  return (
    <div className={"footer"}>
      {musicId ? (
        // 进度条
        <div className={"footer-progressBar"}>
          <ProgressBar />
        </div>
      ) : null}
      {!!musicId && (
        <div className={"footer-songWrap"}>
          {music?.picUrl && (
            <Tooltip title="点我跳到歌曲详情页">
              <div
                className={cn("pic")}
                onClick={() => history.push(`${ROUTES.SONG}/${musicId}`)}
              >
                <LazyLoad>
                  <img src={`${music?.picUrl}?param=40y40`} alt="" />
                </LazyLoad>
              </div>
            </Tooltip>
          )}

          {music?.picUrl && (
            <div>
              <div className={"footer-songWrap-info"}>
                <div className={"name"}>{`${music?.name || "--"} -`}</div>
                <Artists artists={music?.artists} />
              </div>
              <div className={"time"}>
                <AudioTimer />
              </div>
            </div>
          )}
        </div>
      )}

      <div className={"footer-operations"}>
        <PlayOperations />
      </div>

      <div className={"footer-otherOperations"}>
        <div className={"footer-otherOperations-item"}>
          <PlayMode />
        </div>
        <div className={"footer-otherOperations-item"}>
          <PlayRecord />
        </div>
        <div className={"footer-otherOperations-item"}>
          <PlayVolume />
        </div>
      </div>
    </div>
  );
};

export default memo(Footer);
