import React from "react";
import cn from "classnames/bind";
import styles from "./Icon.module.scss";

const cx = cn.bind(styles);

export type IconCode = "instagram" | "vk" | "spinner";

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
    const { className, code } = this.props;

    return (
      <span className={cx("icon", `icon--${code}`, className || undefined)} />
    );
  }
}

export default Icon;
