import React, { memo } from "react";
import { Icon } from "@blueprintjs/core";
import { useDispatch, useSelector } from "react-redux";
import LazyLoad from "../../components/LazyLoad";
import VipIcon from "../VipIcon";
import {
  IMusic,
  IArtist,
  IAlbum,
  MUSIC_STATUS,
  MUSIC_TYPE,
} from "../../apis/types/business";
import { getAlbum } from "../../apis/album";
import { ACTIONS } from "../../constants/playMusic";
import Table, { IColumn } from "../Table";
import { formatTime } from "../../helpers/time";
import { createMusic } from "../../helpers/business";
import { notifyVipFn } from "../Notification/index";
import "./index.less";

interface IProps {
  data: IMusic[];
}

const MusicList: React.FC<IProps> = ({ data }) => {
  const { musicId } = useSelector((state: IState) => state.playMusic);
  const { audioState } = useSelector((state: IState) => state.audioInfo);
  const dispatch = useDispatch();

  const columns: IColumn<IMusic, keyof IMusic>[] = [
    {
      title: "",
      key: "id",
      width: "80px",
      render: (name: string, record: IMusic, index?: number) => {
        return (
          <>
            {musicId === record.id ? (
              <span className={"isPlaying"}>
                <Icon
                  icon={audioState?.paused ? "volume-off" : "volume-up"}
                  iconSize={14}
                />
              </span>
            ) : (
              <span className={"index"}>{(index || 0) + 1}</span>
            )}
            <Icon icon="import" iconSize={14} />
          </>
        );
      },
    },
    {
      title: "歌名",
      key: "name",
      width: "35%",
      render: (name: string, { alias, id, fee, picUrl }: IMusic) => {
        return (
          <>
            <div className={"name"}>
              <span>{name}</span>
              {fee === MUSIC_TYPE.VIP && <VipIcon />}
            </div>
            {alias?.length ? (
              <div className={"alias"}>{alias.join(" ")}</div>
            ) : null}
          </>
        );
      },
    },
    {
      title: "图片",
      key: "picUrl",
      width: "10%",
      render: (picUrl: string) => (
        <LazyLoad>
          <img src={picUrl} alt="" width="50%" />
        </LazyLoad>
      ),
    },
    {
      title: "歌手",
      key: "artists",
      width: "15%",
      render: (artists: IArtist[]) =>
        artists?.map(({ name }) => name).join(" / "),
    },
    {
      title: "专辑",
      key: "album",
      width: "20%",
      render: (album: IAlbum) => album?.name,
    },
    {
      title: "时长",
      key: "duration",
      width: "10%",
      render: (duration: number) => formatTime(duration / 1000),
    },
  ];

  const handleClick = async (item: IMusic) => {
    if (item.fee === MUSIC_TYPE.VIP) {
      notifyVipFn();
      return;
    }

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
  };

  const checkIsRecordRowDisabled = (record: IMusic) =>
    record.status === MUSIC_STATUS.NOT_FOUND;

  return (
    <Table<IMusic>
      columns={columns}
      data={data}
      onClick={handleClick}
      isRecordRowDisabled={checkIsRecordRowDisabled}
    />
  );
};

export default memo(MusicList);
