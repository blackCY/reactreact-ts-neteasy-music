import React, { memo, useEffect, useCallback, useRef } from "react";
import { SONG_TYPE, getTopSongs } from "../../../apis/songs";
import cn from "classnames";
import { useHistory } from "react-router-dom";
import useAsyncFn from "../../../hooks/useAsyncFn";
import Spinner from "../../../components/Spinner";
import Content from "./Content";
import ROUTES from "../../../constants/routes";
import useQuery from "../../../hooks/useQuery";
import PlayAll from "../../../components/PlayAll";
import "./index.less";

interface ILatestMusicProps {}

const TABS = [
  {
    label: "全部",
    type: SONG_TYPE.ALL,
  },
  {
    label: "华语",
    type: SONG_TYPE.CHINESE,
  },
  {
    label: "欧美",
    type: SONG_TYPE.EU_USA,
  },
  {
    label: "韩国",
    type: SONG_TYPE.KOREAN,
  },
  {
    label: "日本",
    type: SONG_TYPE.JAPANESE,
  },
];

const LatestMusic: React.FC<ILatestMusicProps> = (props) => {
  const history = useHistory();
  const { cat } = useQuery();
  const [state, getTopSongsFn] = useAsyncFn(getTopSongs);

  let initialCat;
  if (cat) {
    initialCat = TABS.filter((tabs) => tabs.label === cat)[0].type;
  } else {
    initialCat = SONG_TYPE.ALL;
  }

  const selectedType = useRef(initialCat);

  useEffect(() => {
    getTopSongsFn(selectedType.current);
  }, [getTopSongsFn]);

  const handleTypeChange = useCallback(
    async (type) => {
      if (type === selectedType.current) return;

      selectedType.current = type;
      const cat = TABS.filter((tabs) => tabs.type === type);
      history.push(`${ROUTES.LATEST_MUSIC}?cat=${cat[0].label}`);
      await getTopSongsFn(type);
    },
    [getTopSongsFn, history]
  );

  return (
    <div className="latestmusic">
      <div className="header">
        <div className={"latestmusic-tabs"}>
          {TABS.map(({ label, type }) => {
            return (
              <div
                key={type}
                className={cn("tab", type === selectedType.current && "active")}
                onClick={() => handleTypeChange(type)}
              >
                {label}
              </div>
            );
          })}
        </div>

        <PlayAll data={state.value!} />
      </div>

      <div className={"content"}>
        {state.loading ? <Spinner /> : <Content data={state.value} />}
      </div>
    </div>
  );
};

export default memo(LatestMusic);
