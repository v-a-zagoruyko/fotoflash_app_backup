import React from "react";
import { Helmet } from "react-helmet";
import cn from "classnames/bind";
import styles from "./General.module.scss";

const cx = cn.bind(styles);

interface Props {
  title: string;
  isLoading: boolean;
}

interface State {}

class General extends React.Component<Props, State> {
  render() {
    const { title, children, isLoading } = this.props;

    return (
      <>
        <Helmet>
          <title>{`FOTOFLASH.studio - ${title}`}</title>
        </Helmet>
        <section className={cx("container")}>
          <article className={cx("container--content")}>
            {isLoading ? null : children}
          </article>
        </section>
      </>
    );
  }
}

export default General;
