import React, { memo, useEffect, useState, useMemo, useCallback } from "react";
import useAsyncFn from "../../../../hooks/useAsyncFn";
import useInterval from "../../../../hooks/useInterval";
import { getBanner } from "../../../../apis/personalized";
import BannerItem from "./BannerItem";
import { TARGET_TYPE } from "../../../../apis/types/business";
import { getSongDetail } from "../../../../apis/songs";
import Spinner from "../../../../components/Spinner";
import cn from "classnames";
import { useDispatch } from "react-redux";
import { ACTIONS } from "../../../../constants/playMusic";
import "./index.less";

interface BannerProps {}

const Banner: React.FC<BannerProps> = (props) => {
  const [state, getBannerFn] = useAsyncFn(getBanner);
  const { value: banners = [], loading: isGettingBanner } = state;
  const dispatch = useDispatch();
  const [currentMid, setCurrentMid] = useState(0);

  useInterval(() => {
    if (!banners.length) return;
    setCurrentMid((currentMid + 1) % banners.length);
  }, 6000);

  const bannersClassName = useMemo(() => {
    const len = banners.length;
    const left = (currentMid - 1 + len) % len;
    const right = (currentMid + 1) % len;
    return {
      [currentMid]: "middle",
      [left]: "left",
      [right]: "right",
    };
  }, [currentMid, banners]);

  useEffect(() => {
    getBannerFn();
  }, []);

  const handleItemClick = useCallback(
    // TODO click event
    async (musicId: number) => {
      const songs = await getSongDetail([musicId]);
      if (songs?.length) {
        dispatch({
          type: ACTIONS.PLAY,
          payload: {
            musicId,
            music: songs[0],
          },
        });
      }
    },
    [dispatch]
  );

  const handleMidChange = useCallback((index: number) => {
    setCurrentMid(index);
  }, []);

  return isGettingBanner ? (
    <Spinner />
  ) : (
    <div className={"banner-container"}>
      <div className={"con-banners"}>
        {banners.map(({ imageUrl, typeTitle, targetId, targetType }, index) => {
          const className = bannersClassName[index] || "hidden";
          const isMusicType = targetType === TARGET_TYPE.MUSIC;
          return (
            <BannerItem
              key={imageUrl}
              typeTitle={typeTitle}
              imageUrl={imageUrl}
              className={cn(className, isMusicType && "enabled")}
              onClick={
                isMusicType ? () => handleItemClick(targetId) : undefined
              }
            />
          );
        })}
      </div>
      <div className={"dots"}>
        {banners.map(({ imageUrl }, index) => {
          return (
            <div
              key={imageUrl}
              className={cn("dot", index === currentMid ? "active" : "")}
              onMouseOver={() => handleMidChange(index)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default memo(Banner);
