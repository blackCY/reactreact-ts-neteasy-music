import React, { memo, useEffect } from "react";
import MusicItem from "./MusicItem";
import LinkTitle from "../../../../components/LinkTitle/index";
import ROUTES from "../../../../constants/routes";
import useAsyncFn from "../../../../hooks/useAsyncFn";
import { getPersonalizedNewMusic } from "../../../../apis/personalized";
import Spinner from "../../../../components/Spinner";
import "./index.less";

interface LatestMusicProps {}

const LatestMusic: React.FC<LatestMusicProps> = (props) => {
  const [state, getPersonalizedNewMusicFn] = useAsyncFn(
    getPersonalizedNewMusic
  );
  const { value: music = [], loading } = state;

  useEffect(() => {
    getPersonalizedNewMusicFn();
  }, []);

  return (
    <div className={"discovery-latest-music"}>
      <LinkTitle title="最新音乐" route={ROUTES.LATEST_MUSIC} />
      {loading ? (
        <Spinner />
      ) : (
        <div className={"latest-music-content"}>
          <div className={"latest-music-content-block"}>
            {music
              .slice(0, 5)
              .map(({ id, name, picUrl, song, ...others }, index) => (
                <MusicItem
                  key={name}
                  index={index}
                  id={id}
                  name={name}
                  picUrl={picUrl}
                  song={song}
                  {...others}
                />
              ))}
          </div>
          <div className={"latest-music-content-block"}>
            {music
              .slice(5, 10)
              .map(({ id, name, picUrl, song, ...others }, index) => (
                <MusicItem
                  key={name}
                  index={index + 5}
                  id={id}
                  name={name}
                  picUrl={picUrl}
                  song={song}
                  {...others}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(LatestMusic);
