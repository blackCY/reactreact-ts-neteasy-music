import React, { memo, useEffect, useState, useCallback } from "react";
import HighQuality from "./HighQuality";
import useAsyncFn from "../../../hooks/useAsyncFn";
import {
  getHighQualitySonglist,
  getSonglistCats,
  getSonglistHotCats,
  getSonglists,
} from "../../../apis/songlist";
import { Skeleton } from "antd";
import { PAGE, PAGE_SIZE } from "../../../constants/pagination";
import useQuery, { IQuery } from "../../../hooks/useQuery";
import ROUTES from "../../../constants/routes";
import Categories from "./Categories/index";
import Songlists from "../../../components/Songlists";
import Pagination from "../../../components/Pagination";
import SkeletonImage from "../../../components/SkeletonImage";
import "./index.less";

interface SongListProps {}

const SongList: React.FC<SongListProps> = (props) => {
  const { cat = "全部", page: initialPage } = useQuery<IQuery>();
  const [page, setPage] = useState<number>(initialPage || PAGE);

  const [state, getSonglistsFn] = useAsyncFn(getSonglists);
  const [catsState, getSonglistCatsFn] = useAsyncFn(getSonglistCats);
  const [highQualityState, getHighQualitySonglistFn] = useAsyncFn(
    getHighQualitySonglist
  );
  const [hotCatsState, getSonglistHotCatsFn] = useAsyncFn(getSonglistHotCats);

  useEffect(() => {
    handleBase({ page, cat });
    getHighQualitySonglistFn(cat);
    getSonglistCatsFn();
    getSonglistHotCatsFn();
  }, []);

  const handleBase = useCallback(
    ({ page, cat }: IQuery) => {
      const offset = (page - 1) * PAGE_SIZE;
      getSonglistsFn({ cat, offset });
    },
    [cat]
  );

  const handlePageChange = useCallback((query: IQuery) => {
    handleBase(query);
    setPage(page);
  }, []);

  const handleCatSelect = (cat: string) => {
    setPage(PAGE);
    getHighQualitySonglistFn(cat);
    getSonglistsFn({ cat, offset: 0 });
  };

  return (
    <div className="discovery-songlist">
      {highQualityState.loading ? (
        <Skeleton active avatar paragraph={{ rows: 4 }} />
      ) : (
        highQualityState.value && (
          <div className="highquality">
            <HighQuality data={highQualityState.value} />
          </div>
        )
      )}
      <div className="categories">
        <Categories
          cats={catsState.value}
          hotCats={hotCatsState.value}
          selectedCat={cat}
          onCatSelect={handleCatSelect}
        />
      </div>
      {state.loading ? (
        <SkeletonImage />
      ) : (
        <>
          <Songlists data={state.value?.playlists} />
          <div className="pagination">
            <Pagination
              page={page}
              total={state.value?.total}
              onPageChange={handlePageChange}
              url={ROUTES.SONG_LISTS}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default memo(SongList);
