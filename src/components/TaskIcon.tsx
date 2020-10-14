import camera from "@iconify/icons-bx/bxs-camera";
import checkIcon from "@iconify/icons-fa-solid/check";
import blockIcon from "@iconify/icons-gg/block";
import armFlex from "@iconify/icons-mdi/arm-flex";
import carrot from "@iconify/icons-mdi/carrot";
import meditation from "@iconify/icons-mdi/meditation";
import pill from "@iconify/icons-mdi/pill";
import quillPenFill from "@iconify/icons-ri/quill-pen-fill";
import { Icon, IconifyIcon } from "@iconify/react";
import React, { FunctionComponent } from "react";

export enum IconEnum {
  Check = "check",
  ArmFlex = "arm-flex",
  Block = "block",
  Meditation = "meditation",
  Pill = "pill",
  Carrot = "carrot",
  Pen = "pen",
  Camera = "camera",
}

interface Props extends Partial<IconifyIcon> {
  iconEnum: IconEnum;
}

export const TaskIcon: FunctionComponent<Props> = ({ iconEnum, ...props }) => {
  switch (iconEnum) {
    case IconEnum.ArmFlex:
      return <Icon {...props} icon={armFlex} />;
    case IconEnum.Block:
      return <Icon {...props} icon={blockIcon} />;
    case IconEnum.Camera:
      return <Icon {...props} icon={camera} />;
    case IconEnum.Carrot:
      return <Icon {...props} icon={carrot} />;
    case IconEnum.Check:
      return <Icon {...props} icon={checkIcon} />;
    case IconEnum.Meditation:
      return <Icon {...props} icon={meditation} />;
    case IconEnum.Pill:
      return <Icon {...props} icon={pill} />;
    case IconEnum.Pen:
      return <Icon {...props} icon={quillPenFill} />;
    default:
      return <></>;
  }
};
