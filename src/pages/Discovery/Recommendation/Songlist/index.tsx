import React, { memo, useEffect } from "react";
import { getPersonalizedSonglist } from "../../../../apis/personalized";
import Spinner from "../../../../components/Spinner";
import useAsyncFn from "../../../../hooks/useAsyncFn";
import ROUTES from "../../../../constants/routes";
import LinkTitle from "../../../../components/LinkTitle/index"
import Songlists from "../../../../components/Songlists/index"
import "./index.less";

interface SonglistProps {}

const Songlist: React.FC<SonglistProps> = (props) => {
  const [state, personalizedSonelistFn] = useAsyncFn(getPersonalizedSonglist);
  const { value: songlist = [], loading: isGettingSonglist } = state;

  useEffect(() => {
    personalizedSonelistFn({ limit: 10 });
  }, []);

  return (
    <div className="discovery-songlist">
      <LinkTitle title="推荐歌单" route={ROUTES.SONG_LIST} />
      {isGettingSonglist ? <Spinner /> : <Songlists data={songlist} />}
    </div>
  );
};

export default memo(Songlist);
