import React, { memo, useEffect } from "react";
import ROUTES from "../../../../constants/routes";
import useAsyncFn from "../../../../hooks/useAsyncFn";
import { getPersonalizedMV } from "../../../../apis/personalized";
import LinkTitle from "../../../../components/LinkTitle";
import Spinner from "../../../../components/Spinner";
import MVItem from "./MVItem";
import "./index.less";

interface MVProps {}

const MV: React.FC<MVProps> = (props) => {
  const [state, getPersonalizedMVFn] = useAsyncFn(getPersonalizedMV);
  const { value: mvs = [], loading: isGettingMV } = state;

  useEffect(() => {
    getPersonalizedMVFn();
  }, []);

  return (
    <>
      <LinkTitle title="推荐MV" route={ROUTES.MV} />
      {isGettingMV ? (
        <Spinner />
      ) : (
        <div className={"recommendation-content"}>
          {mvs.map(({ name, artistName, playCount, picUrl, copywriter }) => {
            return (
              <MVItem
                key={name}
                name={name}
                artistName={artistName}
                playCount={playCount}
                picUrl={picUrl}
                copywriter={copywriter}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default memo(MV);
