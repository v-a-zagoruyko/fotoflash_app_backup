import React from "react";
import { Link } from "react-router-dom";
import { inject, observer } from "mobx-react";
import cn from "classnames/bind";
import { AppStore } from "store";
import { Button, Icon } from "components";
import styles from "./NavDesktop.module.scss";

const cx = cn.bind(styles);

const logo = {
  white: require("assets/img/logo-white.png"),
  black: require("assets/img/logo-black.png")
};

const routes = [
  { title: "Главная", url: "/", icon: "camera-retro" },
  { title: "Бронирование", url: "/rent", icon: "camera-retro" },
  { title: "Оборудование", url: "/equipment", icon: "box" },
  { title: "Новости", url: "/news", icon: "newspaper" }
];

interface Props {
  appStore?: AppStore;
}

@inject("appStore")
@observer
class NavDesktop extends React.Component<Props> {
  render() {
    const { nextTheme, toggleVideo, theme, videoState } = this.props.appStore!;
    const brand = theme === "light" ? logo.black : logo.white;
    const videoIcon = videoState === "on" ? "video-slash" : "video";
    const themeIcon = theme === "light" ? "moon" : "sun";

    return (
      <nav className={cx("nav")}>
        <Link to="/">
          <img src={brand} className={cx("nav--brand")} alt="" />
        </Link>
        {routes.map(({ title, url }, idx) => (
          <Link key={idx} to={url} className={cx("nav--link", "link")}>
            {title}
          </Link>
        ))}
        <Icon
          onClick={nextTheme}
          className={cx("nav--icon", "nav--icon__padded")}
          code={themeIcon}
        />
        <Icon
          onClick={toggleVideo}
          className={cx("nav--icon")}
          code={videoIcon}
        />
        <Link to="/login" className={cx("nav--btn__styles")}>
          <Button
            onClick={() => {}}
            className={cx("nav--btn")}
            design="text"
            color="primary"
          >
            Личный кабинет
          </Button>
        </Link>
      </nav>
    );
  }
}

export default NavDesktop;
