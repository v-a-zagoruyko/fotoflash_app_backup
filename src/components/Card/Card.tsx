import React from "react";
import Slider from "react-slick";
import cn from "classnames/bind";
import Button from "components/Button";
import styles from "./Card.module.scss";

const cx = cn.bind(styles);

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Дизайн карточки (вертикальная, горизонтальная)
   */
  design: "vertical" | "horizontal";
  /**
   * Заголовок
   */
  title: string;
  /**
   * Подзаголовок
   */
  subtitle: string;
  /**
   * @ignore
   */
  primary?: string;
  /**
   * @ignore
   */
  onPrimary?: () => void;
  /**
   * @ignore
   */
  secondary?: string;
  /**
   * @ignore
   */
  onSecondary?: () => void;
  /**
   * Обложка. Если передать массив, то отображается в режиме слайдера
   */
  image?: string | string[];
}

/**
 * @visibleName Карточка
 */
class Card extends React.PureComponent<Props> {
  Gallery = () => {
    const { design, image } = this.props;
    const settings = {
      arrows: false,
      autoplay: true,
      pauseOnHover: false,
      autoplaySpeed: 2000
    };

    if (!image) return null;

    if (typeof image === "string") {
      return (
        <img
          className={cx({
            "card-vertical--img": design === "vertical",
            "card-horizontal--img": design === "horizontal"
          })}
          src={image}
          alt=""
        />
      );
    }

    return (
      <Slider {...settings}>
        {image.map((x, idx) => (
          <div key={`${x}-${idx}`}>
            <img
              className={cx({
                "card-vertical--img": design === "vertical",
                "card-horizontal--img": design === "horizontal"
              })}
              src={x}
              alt=""
            />
          </div>
        ))}
      </Slider>
    );
  };

  render() {
    const {
      className,
      design,
      title,
      subtitle,
      children,
      primary,
      onPrimary,
      secondary,
      onSecondary
    } = this.props;

    if (design === "vertical") {
      return (
        <div className={cx("card-vertical", className || undefined)}>
          {this.Gallery()}
          <div className={cx("card-vertical--content")}>
            <h6 className={cx("card-vertical--title")}>{title}</h6>
            <p className={cx("card-vertical--subtitle")}>{subtitle}</p>
            {primary && onPrimary && (
              <Button
                onClick={onPrimary}
                className={cx("card-vertical--btn")}
                design="text"
                color="primary"
              >
                {primary}
              </Button>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className={cx("card-horizontal", className || undefined)}>
        {this.Gallery()}
        <div className={cx("card-horizontal--content")}>
          <h6 className={cx("card-horizontal--title")}>{title}</h6>
          <p className={cx("card-horizontal--subtitle")}>{subtitle}</p>
          <p className={cx("card-horizontal--text")}>{children}</p>
        </div>
        {primary && onPrimary && (
          <Button onClick={onPrimary} design="text" color="primary">
            {primary}
          </Button>
        )}
        {secondary && onSecondary && (
          <Button onClick={onSecondary} design="text" color="primary">
            {secondary}
          </Button>
        )}
      </div>
    );
  }
}

export default Card;
