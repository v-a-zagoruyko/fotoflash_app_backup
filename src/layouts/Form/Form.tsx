import React from "react";
import { Helmet } from "react-helmet";
import cn from "classnames/bind";
import styles from "./Form.module.scss";

const cx = cn.bind(styles);

interface Props {
  title: string;
}

class Form extends React.Component<Props> {
  render() {
    const { title, children } = this.props;

    return (
      <>
        <Helmet>
          <title>{`FOTOFLASH.studio - ${title}`}</title>
        </Helmet>
        <section className={cx("container")}>
          <article className={cx("container-content")}>{children}</article>
        </section>
      </>
    );
  }
}

export default Form;
