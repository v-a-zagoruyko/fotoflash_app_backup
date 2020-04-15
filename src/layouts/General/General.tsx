import React from "react";
import Media from "react-media";
import { Helmet } from "react-helmet";
import * as Skelet from "react-loading-skeleton";
import cn from "classnames/bind";
import { NavDesktop, NavMobile, Footer } from "components";
import styles from "./General.module.scss";

const cx = cn.bind(styles);

interface Props {
  title: string;
  isLoading: boolean;
}

interface State {}

class General extends React.Component<Props, State> {
  Loading = () => {
    return (
      <aside className={cx("grid")}>
        <div className={cx("grid--item")}>
          <h6 className={cx("title")}>
            <Skelet.default />
          </h6>
          <p className={cx("caption")}>
            <Skelet.default count={5} />
          </p>
        </div>
        <div className={cx("grid--item")}>
          <h6 className={cx("title")}>
            <Skelet.default />
          </h6>
          <p className={cx("text")}>
            <Skelet.default count={5} />
          </p>
        </div>
        <div className={cx("grid--item")}>
          <h6 className={cx("title")}>
            <Skelet.default />
          </h6>
          <p className={cx("text")}>
            <Skelet.default count={5} />
          </p>
        </div>
        <div className={cx("grid--item")}>
          <h6 className={cx("title")}>
            <Skelet.default />
          </h6>
          <p className={cx("text")}>
            <Skelet.default count={5} />
          </p>
        </div>
        <div className={cx("grid--item")}>
          <h6 className={cx("title")}>
            <Skelet.default />
          </h6>
          <p className={cx("text")}>
            <Skelet.default count={5} />
          </p>
        </div>
        <div className={cx("grid--item")}>
          <h6 className={cx("title")}>
            <Skelet.default />
          </h6>
          <p className={cx("text")}>
            <Skelet.default count={5} />
          </p>
        </div>
      </aside>
    );
  };

  render() {
    const { title, children, isLoading } = this.props;

    return (
      <>
        <Helmet>
          <title>{`FOTOFLASH.studio - ${title}`}</title>
        </Helmet>
        <section className={cx("container")}>
          <Media queries={{ small: { maxWidth: 992 } }}>
            {matches => (matches.small ? <NavMobile /> : <NavDesktop />)}
          </Media>
          <article className={cx("general-container")}>
            {isLoading ? this.Loading() : children}
          </article>
          <Footer />
        </section>
      </>
    );
  }
}

export default General;
