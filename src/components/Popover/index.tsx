import React, { memo, useState, useImperativeHandle, forwardRef } from "react";
import { Popover } from "antd";
import { TooltipPlacement } from "antd/lib/tooltip";

interface IPopoverProps {
  ref: React.RefObject<any>;
  title: React.ReactNode;
  btn: React.ReactNode;
  selectedCat?: string;
  placement?: TooltipPlacement;
  trigger?: "hover" | "focus" | "click" | "contextMenu";
  children: React.ReactNode;
}

export interface IPopoverRef {
  cat: string;
  handleVisible: (visible: boolean) => void;
  handleCat: (cat: string) => void;
}

const PopoverComp = forwardRef((props: IPopoverProps, ref) => {
  const {
    selectedCat,
    btn,
    title,
    children,
    placement = "left",
    trigger = "hover",
  } = props;

  const [currentCat, setCurrentCat] = useState(selectedCat);

  const [visible, setVisible] = useState<boolean>(false);

  useImperativeHandle(ref, () => ({
    cat: currentCat,
    handleVisible(visible: boolean) {
      setVisible(visible);
    },
    handleCat(cat: string) {
      console.log(cat)
      setCurrentCat(cat);
    },
  }));

  return (
    <Popover
      content={children}
      trigger={trigger}
      getPopupContainer={(trigger) => trigger.parentNode as HTMLElement}
      onVisibleChange={(visible) => setVisible(visible)}
      placement={placement}
      visible={visible}
      title={title}
    >
      {btn}
    </Popover>
  );
});

export default memo(PopoverComp);
