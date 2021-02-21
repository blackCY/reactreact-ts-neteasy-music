import React, { memo, useEffect, useState, useCallback } from "react";
import Spinner from "../../components/Spinner";
import { useParams } from "react-router-dom";
import useAsyncFn from "../../hooks/useAsyncFn";
import { getSonglistDetail } from "../../apis/songlist";
import { IMusic } from "../../apis/types/business";
import { createMusic } from "../../helpers/business";
import BasicInfo from "./BasicInfo";
import Tabs from "../../components/Tabs";
import MusicList from "../../components/MusicList";
import Comment from "../../components/Comment";
import { getAlbumComments } from "../../apis/album";
import Pagination from "../../components/Pagination";
import ROUTES from "../../constants/routes";
import { PAGE } from "../../constants/pagination";
import useQuery from "../../hooks/useQuery";
import "./index.less";

interface SonglistDetailProps {}

const TABS = [
  {
    label: "歌曲列表",
    key: "songlist",
  },
  {
    label: "评论",
    key: "comment",
  },
];

const PAGE_SIZE = 20;

const SonglistDetail: React.FC<SonglistDetailProps> = (props): JSX.Element => {
  const params = useParams<{ songlistId: string }>();
  const { songlistId } = params;
  const [page, setPage] = useState(PAGE);
  const query = useQuery<{ page: string }>();

  const [state, getSonglistDetailFn] = useAsyncFn(getSonglistDetail);
  const [stateComment, getAlbumCommentsFn] = useAsyncFn(getAlbumComments);

  const { value: result, loading } = state;

  const songs = result?.songs as IMusic[];

  const handlePageChange = useCallback(
    (currPage: { page: number }) => {
      setPage(page);
      getAlbumCommentsFn({
        id: Number(songlistId),
        offset: (currPage.page - 1) * PAGE_SIZE,
        limit: PAGE_SIZE,
      });
    },
    [getAlbumCommentsFn, page, songlistId]
  );

  useEffect(() => {
    let offset = 0;

    if (query.page) {
      if (Number.isNaN(Number(query.page))) {
        offset = 1;
      } else {
        offset = Number(query.page);
      }

      offset = (offset - 1) * PAGE_SIZE;
    }

    try {
      getSonglistDetailFn(Number(songlistId));
    } finally {
      if (Number(songlistId)) {
        getAlbumCommentsFn({
          id: Number(songlistId),
          offset,
          limit: PAGE_SIZE,
        });
      }
    }
  }, [getAlbumCommentsFn, getSonglistDetailFn, query.page, songlistId]);

  const playAllData = songs
    ? songs.map((item) => {
        return createMusic({
          ...item,
          duration: item.duration / 1000,
        });
      })
    : [];

  return (
    <div className={"page-songlistdetail"}>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className={"basicInfo"}>
            <BasicInfo data={result?.songlist} playAllData={playAllData} />
          </div>

          <div className={"content"}>
            <div className={"content-tabs"}>
              <Tabs tabs={[TABS[0]]} />
            </div>

            <MusicList data={songs} />

            <div className={"content-tabs"} style={{ marginTop: "20px" }}>
              <Tabs
                tabs={[
                  Object.assign(TABS[1], {
                    label: `评论(${stateComment.value?.total}条)`,
                  }),
                ]}
              />
            </div>

            <div className="songlist-detail-comment">
              {stateComment.value?.comments.map((item, index) => (
                <Comment data={item} key={index} />
              ))}
            </div>

            <Pagination
              url={ROUTES.SONG_LISTS}
              total={stateComment.value?.total}
              page={page}
              pageSize={PAGE_SIZE}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default memo(SonglistDetail);
