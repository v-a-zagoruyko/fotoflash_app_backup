import React from "react";
import cn from "classnames/bind";
import Icon from "../Icon";
import styles from "./Badge.module.scss";

const cx = cn.bind(styles);

interface Props extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Цвет бейджа (основной, второстепенный)
   */
  color: "primary" | "secondary";
  /**
   * Состояние активности
   */
  isActive: boolean;
  /**
   * Состояние доступности. Если равен true, не срабатывают нажатия на бейдж
   */
  isDisabled?: boolean;
}

/**
 * @visibleName Бейдж
 */
class Badge extends React.PureComponent<Props> {
  render() {
    const { className, color, children, isActive, isDisabled } = this.props;

    return (
      <span
        className={cx("badge", `badge__${color}`, className || undefined, {
          badge__active: isActive,
          badge__disabled: isDisabled
        })}
      >
        <Icon
          className={cx("badge--icon")}
          code={isActive ? "square-checked" : "square"}
        />
        {children}
      </span>
    );
  }
}

export default Badge;
