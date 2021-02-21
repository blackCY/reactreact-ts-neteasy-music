import React, { memo } from "react";

import Item from "./Item";
import { getAlbum } from "../../../../../apis/album";
import { ISearchSuggestResponse } from "../../../../../apis/types/search";
import { createMusic } from "../../../../../helpers/business";
import { ACTIONS } from "../../../../../constants/playMusic";
import {
  IAlbum,
  IArtist,
  IMusic,
  IMV,
} from "../../../../../apis/types/business";
import { useDispatch } from "react-redux";
import "./index.less"

interface SearchResultIProps {
  data: ISearchSuggestResponse;
}

const SearchResult: React.FC<SearchResultIProps> = ({ data }) => {
  const dispatch = useDispatch();
  const { order } = data;

  const config: {
    [key: string]: any;
  } = {
    songs: {
      title: "单曲",
      icon: "music",
      renderLabel: (item: IMusic) =>
        `${item.name} - ${item.artists.map(({ name }) => name).join(" / ")}`,
      onItemClick: async (item: IMusic) => {
        let { picUrl } = item;

        if (!picUrl) {
          const result = await getAlbum(item.album.id);
          picUrl = result?.album.blurPicUrl;
        }

        dispatch({
          type: ACTIONS.PLAY,
          payload: {
            musicId: item.id,
            music: createMusic({
              ...item,
              picUrl,
              duration: item.duration / 1000,
            }),
          },
        });
      },
    },
    albums: {
      title: "专辑",
      icon: "headset",
      renderLabel: (item: IAlbum) => `${item.name} - ${item?.artist?.name}`,
    },
    artists: {
      title: "歌手",
      icon: "person",
      renderLabel: (item: IArtist) => `${item.name}`,
    },
    mvs: {
      title: "视频",
      icon: "mobile-video",
      renderLabel: (item: IMV) => `${item.name} - ${item.artistName}`,
    },
  };

  return (
    <div>
      {order?.map((type) => {
        const configOfType = config[type];
        const itemData = data[type];

        if (!configOfType) {
          return null;
        }

        return <Item key={type} {...configOfType} data={itemData} />;
      })}
      {!order && <div className={"searcher-result-empty"}>没有结果喔</div>}
    </div>
  );
};

export default memo(SearchResult);
