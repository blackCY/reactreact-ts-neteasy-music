import * as React from "react";
import { notification } from "antd";

export interface INotification {
  title: string | React.ReactNode;
  desc: string | React.ReactNode;
  key?: string;
  btn?: React.ReactNode;
  duration?: number;
  onClick?: () => void;
  onClose?: () => void;
}

const keyFn = (key: string) => key || `${Date.now()}`;

const notificationFn = ({
  title,
  desc,
  key,
  btn,
  duration,
  onClick,
  onClose,
}: INotification) =>
  notification.open({
    message: title,
    description: desc,
    key: keyFn(key!),
    onClick,
    onClose,
    btn,
    duration
  });

export default notificationFn;
