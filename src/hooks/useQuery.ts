import { useLocation } from "react-router-dom";

// 这里定义基本的 Pagination 接口内容, 具体的接口由此变化
export interface IQuery {
  cat: string;
  page: number;
}

const useQuery = <T>(): Pick<T, keyof T> => {
  const { search } = useLocation();

  const result = {} as Pick<T, keyof T>;

  decodeURIComponent(search)
    .substr(1)
    .split("&")
    .map((res) => {
      const [key, val] = res.split("=") as [keyof T, T[keyof T]];

      result[key] = val;
    });

  return result;
};

export default useQuery;
