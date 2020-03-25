import React from "react";
import cn from "classnames/bind";
import { Button } from "components";
import styles from "./Default.module.scss";

const cx = cn.bind(styles);

class Default extends React.Component {
  redirectToHome = () => {
    window.location.replace("/");
  };

  render() {
    return (
      <section className={cx("container")}>
        <h1 className={cx("container--title")}>
          <span>Страница</span>
          <span>не найдена</span>
        </h1>
        <Button onClick={this.redirectToHome} color="primary" design="fill">
          На главную
        </Button>
      </section>
    );
  }
}

export default Default;
