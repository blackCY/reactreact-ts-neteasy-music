import { useRef, useEffect } from "react";
import { noop } from "../helpers/fn";

const useInterval = (cb: () => void, delay?: number | null) => {
  const savedCallback = useRef<() => void>(noop);

  useEffect(() => {
    savedCallback.current = cb;
  });

  useEffect(() => {
    if (delay !== null) {
      const timer = setInterval(() => {
        savedCallback.current();
      }, delay || 0);
      return () => clearInterval(timer);
    }
    // 如果不存在 delay, 返回 undefined
    return undefined;
  }, [delay]);
};

export default useInterval;
