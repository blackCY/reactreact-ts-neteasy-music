import React, { memo, lazy, Suspense, useMemo, useRef } from "react";
import { Button, Spin } from "antd";
import cn from "classnames";
import {
  IGetSonglistCatsResponse,
  ICategory,
} from "../../../../apis/types/songlist";
import { useHistory } from "react-router-dom";
import ROUTES from "../../../../constants/routes";
import Popover, { IPopoverRef } from "../../../../components/Popover";
import { RightOutlined } from "@ant-design/icons";
import "./index.less";

const CategoriesPopover = lazy(
  () => import("../../../../components/Popover/Categories")
);

interface CategoriesProps {
  selectedCat: string;
  onCatSelect: (cat: string) => void;
  cats?: IGetSonglistCatsResponse;
  hotCats?: ICategory[];
}

const Categories: React.FC<CategoriesProps> = ({
  selectedCat,
  cats,
  hotCats,
  onCatSelect,
}) => {
  const history = useHistory();
  const defaultCat = "全部";
  const ref = useRef<IPopoverRef>();

  const handleCatClick = (cat: string) => {
    // 这两行是 Popover 公共组件的逻辑
    ref.current?.handleCat(cat);
    ref.current?.handleVisible(false);

    // 这里是页面组件单独的逻辑
    onCatSelect(cat);
    history.push(`${ROUTES.SONG_LIST}?cat=${cat}`);
  };

  const PopoverTitle = useMemo(
    () => (
      <span
        className={cn(ref.current?.cat === defaultCat && "all")}
        onClick={() => {
          handleCatClick(defaultCat);
          ref.current?.handleCat(defaultCat);
        }}
      >
        {defaultCat}
      </span>
    ),
    [ref.current?.cat]
  );

  const PopoverBtn = useMemo(
    () => (
      <div className="catsBtn">
        {selectedCat}
        <RightOutlined />
      </div>
    ),
    [selectedCat]
  );

  return (
    <div className="songlist-categories">
      <Popover
        selectedCat={selectedCat}
        ref={ref}
        title={PopoverTitle}
        btn={PopoverBtn}
        placement="right"
      >
        <Suspense fallback={<Spin />}>
          <CategoriesPopover
            cats={cats!}
            handleClick={handleCatClick}
            currentCat={ref.current?.cat!}
          />
        </Suspense>
      </Popover>

      <div className="hotCats">
        <Button shape="round" size="middle" style={{ marginRight: "10px" }}>
          Hot
        </Button>
        {hotCats?.map(({ name }) => (
          <div
            className={cn("tag", ref.current?.cat === name && "cat-active")}
            key={name}
            onClick={() => handleCatClick(name)}
          >
            {name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(Categories);
