import React from "react";
import cn from "classnames/bind";
import styles from "./Icon.module.scss";

const cx = cn.bind(styles);

export type IconCode =
  | "right"
  | "left"
  | "close"
  | "square"
  | "square-checked"
  | "instagram"
  | "home"
  | "user"
  | "camera"
  | "boxes"
  | "newspaper"
  | "cogs"
  | "video"
  | "video-slash"
  | "sun"
  | "moon"
  | "vk"
  | "spinner";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  /**
   * Название иконки
   */
  code: IconCode;
}

/**
 * @visibleName Иконка
 */
class Icon extends React.PureComponent<Props> {
  render() {
    const { onClick, className, code } = this.props;

    return (
      <span
        onClick={onClick}
        className={cx("icon", `icon--${code}`, className || undefined)}
      />
    );
  }
}

export default Icon;
