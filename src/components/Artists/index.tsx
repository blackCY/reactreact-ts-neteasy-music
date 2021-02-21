import React, { memo } from "react";

import "./index.less";
import { IArtist } from "../../apis/types/business";

interface ArtistsProps {
  artists?: IArtist[];
}

const Artists: React.FC<ArtistsProps> = (props) => {
  const { artists } = props;
  return (
    <div className={"comp-artists"}>
      {artists?.map(({ name }: IArtist, index: number) =>
        index !== artists?.length - 1 ? (
          <div key={name}>
            <span className={"singer"}>{name}</span>
            <span className={"slash"}>/</span>
          </div>
        ) : (
          <span key={name} className={"singer"}>
            {name}
          </span>
        )
      )}
    </div>
  );
};

export default memo(Artists);
