import React from "react";
import cn from "classnames/bind";
import styles from "./Input.module.scss";

const cx = cn.bind(styles);

interface Props extends React.HTMLAttributes<HTMLInputElement> {
  /**
   * @ignore
   */
  name: string;
  /**
   * @ignore
   */
  label: string;
  /**
   * @ignore
   */
  value: string;
  /**
   * Дизайн кнопки (заполненная, с рамкой, только текст)
   */
  type: "text" | "email" | "password" | "tel";
  /**
   * Состояние доступности. Если равен true, не срабатывает ввод
   */
  isDisabled?: boolean;
}

/**
 * @visibleName Поле ввода
 */
class Input extends React.PureComponent<Props> {
  render() {
    const {
      onChange,
      className,
      label,
      type,
      name,
      value,
      isDisabled
    } = this.props;

    return (
      <>
        {label && (
          <label htmlFor={name} className={cx("label")}>
            {label}
          </label>
        )}
        <input
          onChange={onChange}
          className={cx("input", className || undefined)}
          name={name}
          type={type}
          value={value}
          disabled={isDisabled}
        />
      </>
    );
  }
}

export default Input;
