import React from "react";
import { Link } from "react-router-dom";
import cn from "classnames/bind";
import Icon, { IconCode } from "../Icon/Icon";
import styles from "./Footer.module.scss";

const cx = cn.bind(styles);

const contacts = [
  {
    children: "+7 922 267-00-55",
    url: "tel:+79222670055"
  },
  {
    children: "info@fotoflash.studio",
    url: "mailto:info@fotoflash.studio"
  },
  {
    children: "город Тюмень, улица Зоологическая, 31",
    url: "https://bit.ly/359ypm4"
  }
];

const policy = [
  {
    children: "Политика конфициальности",
    url: "https://bit.ly/2JCPM5L"
  },
  {
    children: "ОФЕРТА",
    url: "https://bit.ly/3dX8X8C"
  }
];

const routes = [
  { children: "Главная", url: "/" },
  { children: "Личный кабинет", url: "/login" },
  { children: "Бронирование", url: "/rent" },
  { children: "Оборудование", url: "/equipment" },
  { children: "Новости", url: "/news" }
];

interface ColumnProps {
  routes: LinkProps[];
  title: string;
  type: "internal" | "external";
}

interface LinkProps {
  url: string;
  children: React.ReactNode;
}

const ExternalLink = ({ url, children }: LinkProps) => (
  <a
    className={cx("column--link", "link")}
    target="_blank"
    rel="noopener noreferrer"
    href={url}
  >
    {children}
  </a>
);

const InternalLink = ({ url, children }: LinkProps) => (
  <Link className={cx("column--link", "link")} to={url}>
    {children}
  </Link>
);

const Column = ({ routes, title, type }: ColumnProps) => {
  if (type === "external") {
    return (
      <div className={cx("column", "grid--item")}>
        <span className={cx("column--title")}>{title}</span>
        {routes.map(({ url, children }, idx) => (
          <ExternalLink key={`externalLink${idx}`} url={url}>
            {children}
          </ExternalLink>
        ))}
      </div>
    );
  } else {
    return (
      <div className={cx("column", "grid--item")}>
        <span className={cx("column--title")}>{title}</span>
        {routes.map(({ url, children }, idx) => (
          <InternalLink key={`internalLink${idx}`} url={url}>
            {children}
          </InternalLink>
        ))}
      </div>
    );
  }
};

class Footer extends React.PureComponent {
  render() {
    return (
      <footer className={cx("grid")}>
        <div className={cx("column", "grid--item__large")}>
          <span className={cx("title")}>Fotoflash Studio</span>
          <span className={cx("column--text")}>
            FOTOFLASH studio - профессиональная арендная фотостудия с
            эксклюзивными дизайнерскими интерьерами, мебелью премиум класса и
            новейшим оборудованием Profoto.
            <br />
            <a
              href="https://bit.ly/2Zy59Gp"
              target="_blank"
              rel="noopener noreferrer"
              className={cx("column--link")}
            >
              <Icon code="vk" className={cx("column--icon")} />
            </a>
            <a
              href="https://bit.ly/34cHcE3"
              target="_blank"
              rel="noopener noreferrer"
              className={cx("column--link")}
            >
              <Icon code="instagram" className={cx("column--icon")} />
            </a>
          </span>
        </div>
        <Column routes={routes} title="Навигация" type="internal" />
        <Column routes={contacts} title="Контакты" type="external" />
        <Column routes={policy} title="Конфиденциальность" type="external" />
      </footer>
    );
  }
}

export default Footer;
