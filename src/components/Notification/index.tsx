import React, { Suspense, useCallback } from "react";
import antdColor from "../../constants/antdColor";
import { vipFn } from "../../helpers/vip";
import { VIP_KEY } from "../../constants/notifyKey";
import notificationFn, { INotification } from "../../helpers/notification";
import { Button, notification } from "antd";

interface INotificationProps {
  content?: INotification["title"];
  color?: antdColor;
  style?: React.CSSProperties;
}

const Notification: React.FC<INotificationProps> = (props) => {
  const { color = antdColor.text, content, style, children } = props;
  return (
    <div
      style={{
        color,
        display: "flex",
        alignItems: "center",
        ...style,
      }}
    >
      {content || children}
    </div>
  );
};

interface IConfirmOrCancelProps {
  onClick: (is: boolean) => void;
  notifyKey: string;
}

const ConfirmOrCancel: React.FC<IConfirmOrCancelProps> = ({
  onClick,
  notifyKey,
}) => {
  const handleClick = useCallback(
    (is) => {
      notification.close(notifyKey);
      onClick(is);
    },
    [notifyKey, onClick]
  );

  return (
    <Notification>
      <Button type="primary" onClick={() => handleClick(true)} size="small">
        确认
      </Button>
      <Button
        type="default"
        onClick={() => handleClick(false)}
        size="small"
        style={{ marginLeft: "8px" }}
      >
        取消
      </Button>
    </Notification>
  );
};

export const notifyVipFn = () =>
  notificationFn({
    title: (
      <Suspense fallback={null}>
        <Notification content="提示" color={antdColor.warning} />
      </Suspense>
    ),
    key: VIP_KEY,
    desc: (
      <Suspense fallback={null}>
        <Notification
          content="// TODO 完善当前逻辑: 当前歌曲需要 vip, 检测到您未登录或者登录后没有 vip, 如果未登录, 则调到登录页, 如果登录没有 vip, 再提示是否需要跳转到充值页"
          color={antdColor.text}
        />
      </Suspense>
    ),
    btn: (
      <Suspense fallback={null}>
        <ConfirmOrCancel onClick={vipFn} notifyKey={VIP_KEY} />
      </Suspense>
    ),
  });

export default Notification;
