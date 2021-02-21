import React, { memo, useCallback, useRef } from "react";
import { Icon } from "@blueprintjs/core";
import cn from "classnames";
import { useHistory } from "react-router-dom";
import { PAGE, PAGE_SIZE, TOTAL } from "../../constants/pagination";
import { noop } from "../../helpers/fn";
import useQuery from "../../hooks/useQuery";
import { useParams } from "react-router-dom";
import "./index.less";

// * 1~5正常+后3, n-5~n正常+前3, 其他前3+后3, 最多全部显示10页
// TODO 对请求下来的数据做缓存
// TODO 前后三个 page 预加载

interface IProps {
  url: string;
  total?: number;
  page?: number;
  pageSize?: number;
  onPageChange: (arg: any) => void;
}

const MAX_SHOW_PAGE_COUNT = 10;
const PAGE_LEFT_BORDER = 5;
const PAGE_SCALE = 3;

const Pagination: React.FC<IProps> = ({
  url,
  total = TOTAL,
  page = PAGE,
  pageSize = PAGE_SIZE,
  onPageChange = noop,
}) => {
  const history = useHistory();
  const params = useParams();
  const query = useQuery<{ page: number }>();

  const currentPage = useRef((query.page || page) * 1);

  const url_str = useCallback((page: number) => {
    let str: string = "";

    // 处理动态参数
    Object.values(params).map(
      (val) => (str += Number.isNaN(Number(val)) ? "" : `/${val}`)
    );

    str = url + str + "?";

    // 处理 page
    Object.assign(query, {
      page,
    });

    // 拼接
    Object.entries(query).map(([key, val]) => key && (str += `${key}=${val}&`));

    // 去掉最后一个 &
    str = str.substr(0, str.length - 1);

    return str;
  }, []);

  const pageCount = Math.ceil(total / pageSize);

  const isFirstPage = currentPage.current === 1;
  const isLastPage = currentPage.current === pageCount;

  const handleItemClick = (page: number) => {
    onPageChange({ ...query, page });

    history.push(url_str(page));
  };

  const handlePrev = () => {
    if (isFirstPage) {
      return;
    }
    handleItemClick(currentPage.current - 1);
  };

  const handleNext = () => {
    if (isLastPage) {
      return;
    }
    handleItemClick(currentPage.current + 1);
  };

  const createPageItem = (page: number | string = ""): JSX.Element => {
    const isNumber = typeof page === "number";
    return (
      <div
        key={page}
        className={cn(
          "item",
          (currentPage.current as number) === page && "active",
          !isNumber && "dotItem"
        )}
        onClick={!isNumber ? noop : () => handleItemClick(page as number)}
      >
        {isNumber ? page : "..."}
      </div>
    );
  };

  const createContinuousPageItems = (start: number, end: number) => {
    const pages: JSX.Element[] = [];
    for (let i = start; i <= end; i++) {
      const pageItem = createPageItem(i);
      pages.push(pageItem);
    }
    return pages;
  };

  const createPages = (elements: (JSX.Element | JSX.Element[])[]) => {
    let result: JSX.Element[] = [];
    elements.forEach((item) => {
      const temp = Array.isArray(item) ? item : [item];
      result = [...result, ...temp];
    });
    return result;
  };

  const renderPages = () => {
    let result: JSX.Element[] = [];

    if (pageCount <= MAX_SHOW_PAGE_COUNT) {
      result = createContinuousPageItems(1, pageCount);
      return result;
    }

    const KEY = {
      LEFT: "LEFT",
      RIGHT: "RIGHT",
    };

    const firstPage = createPageItem(PAGE);
    const lastPage = createPageItem(pageCount);
    const leftDot = createPageItem(KEY.LEFT);
    const rightDot = createPageItem(KEY.RIGHT);
    const PAGE_RIGHT_BORDER = pageCount - PAGE_LEFT_BORDER + 1;

    if (currentPage.current <= PAGE_LEFT_BORDER) {
      result = createPages([
        firstPage,
        createContinuousPageItems(2, PAGE_LEFT_BORDER + PAGE_SCALE),
        rightDot,
        lastPage,
      ]);
    } else if (currentPage.current >= PAGE_RIGHT_BORDER) {
      result = createPages([
        firstPage,
        leftDot,
        createContinuousPageItems(PAGE_RIGHT_BORDER - PAGE_SCALE, pageCount),
      ]);
    } else {
      result = createPages([
        firstPage,
        leftDot,
        createContinuousPageItems(
          currentPage.current - PAGE_SCALE,
          currentPage.current + PAGE_SCALE
        ),
        rightDot,
        lastPage,
      ]);
    }

    return result;
  };

  if (total < pageSize) {
    return null;
  }

  return (
    <div className={"pagination"}>
      <div
        className={cn("item", isFirstPage && "disabled")}
        onClick={handlePrev}
      >
        <Icon icon="chevron-left" />
      </div>
      <div className={"pages"}>{renderPages()}</div>
      <div
        className={cn("item", isLastPage && "disabled")}
        onClick={handleNext}
      >
        <Icon icon="chevron-right" />
      </div>
    </div>
  );
};

export default memo(Pagination);
