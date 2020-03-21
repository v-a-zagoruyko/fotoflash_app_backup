import React from "react";
import cn from "classnames/bind";
import Icon, { IconCode } from "../Icon/Icon";
import styles from "./Button.module.scss";

const cx = cn.bind(styles);

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  /**
   * Дизайн кнопки (заполненная, с рамкой, только текст)
   */
  design: "fill" | "outline" | "text";
  /**
   * Цвет кнопки (основной, второстепенный)
   */
  color: "primary" | "secondary";
  /**
   * Название иконки
   */
  code?: IconCode;
  /**
   * Состояние загрузки. Если равен true, отображается текстовый дизайн кнопки с элементом загрузки
   */
  isLoading?: boolean;
  /**
   * Состояние доступности. Если равен true, не срабатывают нажатия на кнопку
   */
  isDisabled?: boolean;
}

/**
 * @visibleName Кнопка
 */
class Button extends React.PureComponent<Props> {
  render() {
    const { className, color, isLoading } = this.props;

    if (isLoading) {
      return (
        <button
          className={cx(
            "btn",
            "btn__text",
            `btn__${color}`,
            "btn__loading",
            className || undefined
          )}
        >
          <Icon code="spinner" />
        </button>
      );
    }

    const { design, children, code, isDisabled, onClick } = this.props;

    return (
      <button
        onClick={onClick}
        className={cx(
          "btn",
          `btn__${design}`,
          `btn__${color}`,
          className || undefined
        )}
        disabled={isDisabled}
      >
        {code && <Icon className={cx("btn--icon")} code={code} />}
        {children}
      </button>
    );
  }
}

export default Button;
