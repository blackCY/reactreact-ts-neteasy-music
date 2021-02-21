import React, { memo } from "react";
import "./index.less";

interface IProps {
  title: string;
  words?: string[];
  onWordClick: (word: string) => void;
}

const Words: React.FC<IProps> = ({ title, words, onWordClick }) => {
  return (
    <div className={"searcher-words"}>
      <div className={"searcher-words-title"}>{title}</div>
      <div className={"searcher-words-words"}>
        {words?.map((word) => (
          <span key={word} className={"words-words-word"} onClick={() => onWordClick(word)}>
            {word}
          </span>
        ))}
      </div>
    </div>
  );
};

export default memo(Words);
