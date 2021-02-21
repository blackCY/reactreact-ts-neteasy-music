import React, { memo } from "react";
import { IGetSonglistCatsResponse } from "../../../apis/types/songlist";
import cn from "classnames";
import "./index.less";

interface ICategoriesPopoverProps {
  cats: IGetSonglistCatsResponse;
  handleClick: (cat: string) => void;
  currentCat: string;
}

const CategoriesPopover: React.FC<ICategoriesPopoverProps> = ({
  cats,
  handleClick,
  currentCat,
}) => {
  const handleCatClick = (cat: string) => {
    handleClick(cat);
  };

  return (
    <div className="categories-popover">
      {Object.entries(cats?.categories || {}).map(([key, value]) => {
        const subCats = cats?.sub.filter(
          ({ category }) => category === Number(key)
        );
        return (
          <div className="catBlock" key={key}>
            <div className="label">{value}</div>
            <div className="content">
              {subCats?.map(({ name }) => (
                <div
                  className={cn("tag", currentCat === name && "cat-active")}
                  key={name}
                  onClick={() => handleCatClick(name)}
                >
                  {name}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default memo(CategoriesPopover);
