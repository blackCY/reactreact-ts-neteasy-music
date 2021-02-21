import React, { ReactElement } from "react";
import cn from "classnames";
import { noop } from "../../helpers/fn";
import { PlayCircleOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import "./index.less";

export interface IColumn<RecordType, Key extends keyof RecordType> {
  title?: string;
  key: Key;
  width?: string;
  render: (
    value: any,
    record: RecordType,
    index?: number
  ) => string | ReactElement;
}

interface IProps<RecordType> {
  showHeader?: boolean;
  columns: IColumn<RecordType, keyof RecordType>[];
  data: RecordType[];
  onClick?: (item: RecordType) => void;
  isRecordRowDisabled?: (record: RecordType) => boolean;
}

// * 这里 Record 的主要作用就是接收一个对象, obj[key] 为 any 并初始化为 any
function Table<RecordType extends Record<string, any> = any>({
  showHeader = true,
  columns,
  data,
  onClick = noop,
  isRecordRowDisabled,
}: IProps<RecordType>) {
  const { musicId } = useSelector((state: IState) => state.playMusic);

  return (
    <div className={"comp-table"}>
      {showHeader && (
        <div className={"header"}>
          {columns.map(({ title, width }, index) => {
            return (
              <div key={index} style={{ width, textAlign: "center" }}>
                {title}
              </div>
            );
          })}
        </div>
      )}
      {data?.length ? (
        <div className={"content"}>
          {data?.map((item, index) => {
            const disabled = isRecordRowDisabled && isRecordRowDisabled(item);
            return (
              <div
                key={index}
                className={cn(
                  "row",
                  disabled && "disabled",
                  musicId === item.id ? "music-active" : ""
                )}
              >
                {columns
                  .concat({
                    key: "play",
                    width: "30px",
                    render: () => (
                      <PlayCircleOutlined
                        style={{ fontSize: "15px", color: "grey" }}
                        onClick={disabled ? noop : () => onClick(item)}
                      />
                    ),
                  })
                  .map(({ key, width, render }, idx) => {
                    return (
                      <div
                        key={idx}
                        style={{
                          width,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          textAlign: "center",
                        }}
                      >
                        {render(item[key], item, index)}
                      </div>
                    );
                  })}
              </div>
            );
          })}
        </div>
      ) : (
        <div className={"empty"}>暂无数据喔</div>
      )}
    </div>
  );
}

export default Table;
