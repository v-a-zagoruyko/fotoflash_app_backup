import React from "react";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { inject, observer } from "mobx-react";
import cn from "classnames/bind";
import { AppStore } from "store";
import { Icon } from "components";
import styles from "./NavMobile.module.scss";

const cx = cn.bind(styles);

const logo = {
  white: require("assets/img/logo-white.png"),
  black: require("assets/img/logo-black.png")
};

const routes = [
  { title: "Главная", url: "/", icon: "home" },
  { title: "Бронирование", url: "/rent", icon: "camera" },
  { title: "Оборудование", url: "/equipment", icon: "boxes" },
  { title: "Новости", url: "/news", icon: "newspaper" },
  { title: "Личный кабинет", url: "/login", icon: "user" }
];

interface Props {
  appStore?: AppStore;
}

interface State {
  settingsVisible: boolean;
}

@inject("appStore")
@observer
class NavMobile extends React.Component<Props, State> {
  state = {
    settingsVisible: false
  };

  toggleSettings = () => {
    this.setState({ settingsVisible: !this.state.settingsVisible });
  };

  Settings = () => {
    const { settingsVisible } = this.state;
    const { nextTheme, toggleVideo, theme, videoState } = this.props.appStore!;
    const brand = theme === "light" ? logo.black : logo.white;
    const videoIcon = videoState === "on" ? "video-slash" : "video";
    const themeIcon = theme === "light" ? "moon" : "sun";

    const settings = {
      classNames: cx("slide-animation"),
      timeout: 500,
      in: settingsVisible,
      unmountOnExit: true
    };

    return (
      <CSSTransition {...settings}>
        <aside className={cx("nav-settings")}>
          <div className={cx("nav-settings--item")}>
            <p className={cx("nav-settings--title")}>Фоновое видео</p>
            <span className={cx("nav-settings--text")}>
              Мы рекомендуем отключать фоновое видео при медленном соединений
            </span>
            <Icon
              onClick={toggleVideo}
              className={cx("nav-settings--icon")}
              code={videoIcon}
            />
          </div>
          <div className={cx("nav-settings--item")}>
            <p className={cx("nav-settings--title")}>Тема оформления</p>
            <span className={cx("nav-settings--text")}>
              Включите темную тему если посещаете нас сайт в темное время суток
            </span>
            <Icon
              onClick={nextTheme}
              className={cx("nav-settings--icon")}
              code={themeIcon}
            />
          </div>
        </aside>
      </CSSTransition>
    );
  };

  render() {
    return (
      <nav className={cx("nav")}>
        {this.Settings()}
        {routes.map(({ icon, url }, idx) => (
          <Link key={idx} to={url} className={cx("nav--link", "link")}>
            <Icon className={cx("nav--icon")} code={icon as any} />
          </Link>
        ))}
        <span onClick={this.toggleSettings} className={cx("nav--link", "link")}>
          <Icon className={cx("nav--icon")} code={"cogs"} />
        </span>
      </nav>
    );
  }
}

export default NavMobile;
