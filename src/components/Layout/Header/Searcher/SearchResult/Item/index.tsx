import React, { memo } from "react";
import { Icon, IconName } from "@blueprintjs/core";
import { noop } from "../../../../../../helpers/fn";
import {
  IAlbum,
  IArtist,
  IMusic,
  IMV,
} from "./../../../../../../apis/types/business";
import "./index.less";

type Type = IAlbum | IArtist | IMusic | IMV;

interface SearchResultItemProps {
  title: string;
  icon: IconName;
  data: Type[];
  renderLabel: (item: any) => string;
  onItemClick?: (item: any) => void;
}

const SearchResultItem: React.FC<SearchResultItemProps> = ({
  title,
  icon,
  data,
  renderLabel,
  onItemClick = noop,
}) => {
  return (
    <div className={"searcher-result-item"}>
      <div className={"result-item-title"}>
        <Icon icon={icon} />
        {title}
      </div>
      <div className={"result-item-content"}>
        {data.map((item, index) => {
          return (
            <div
              key={index}
              className={"item-content-item"}
              onClick={() => onItemClick(item)}
            >
              {renderLabel(item)}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default memo(SearchResultItem);
