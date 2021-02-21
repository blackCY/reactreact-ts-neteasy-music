import React, { memo } from "react";
import { Icon } from "@blueprintjs/core";
import cn from "classnames";
import {
  IMyMusic,
  IArtist,
  MUSIC_STATUS,
  MUSIC_TYPE,
} from "../../../../../apis/types/business";
import { formatTime } from "../../../../../helpers/time";
import Table, { IColumn } from "../../../../../components/Table";
import { useSelector } from "react-redux";
import VipIcon from "../../../../../components/VipIcon"
import "./index.less";

interface IProps {
  data: IMyMusic[];
  onClick: (item: IMyMusic) => void;
  onClear: () => void;
}

const List: React.FC<IProps> = ({ data, onClick, onClear }) => {
  const { musicId } = useSelector((state: IState) => state.playMusic);

  const columns: IColumn<IMyMusic, keyof IMyMusic>[] = [
    {
      key: "name",
      width: "45%",
      render: (name: string, { id, fee }: IMyMusic) => {
        const isActive = musicId === id;
        return (
          <div className={cn("name", isActive && "active")}>
            <div className={"text"}>
              <span>{name}</span>
              {fee === MUSIC_TYPE.VIP && <VipIcon />}
            </div>
          </div>
        );
      },
    },
    {
      key: "artists",
      width: "30%",
      render: (artists: IArtist[], { id }: IMyMusic) => {
        return (
          <div className={musicId === id ? "active" : ""}>
            {artists?.map(({ name }) => name).join(" / ")}
          </div>
        );
      },
    },
    {
      key: "duration",
      width: "15%",
      render: (duration: number) => formatTime(duration),
    },
  ];

  return (
    <>
      <div className={"playrecord-list-header"}>
        <div className={"count"}>总{data.length}首</div>
        {data.length > 0 && (
          <div className={"actions"}>
            <div onClick={onClear}>
              <Icon icon="trash" iconSize={15} />
              {" 清空"}
            </div>
          </div>
        )}
      </div>
      <div className={"playrecord-list-list"}>
        <Table<IMyMusic>
          columns={columns}
          data={data}
          showHeader={false}
          onClick={onClick}
          isRecordRowDisabled={(item) => item.status === MUSIC_STATUS.NOT_FOUND}
        />
      </div>
    </>
  );
};

export default memo(List);
