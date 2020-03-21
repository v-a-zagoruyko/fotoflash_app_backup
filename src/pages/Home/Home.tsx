import React from "react";
import cn from "classnames/bind";
import { General } from "layouts";
import styles from "./Home.module.scss";

const cx = cn.bind(styles);

interface Props {}
interface State {}

class Home extends React.Component<Props, State> {
  render() {
    return (
      <General title="Главная страница" isLoading={false}>
        333
      </General>
    );
  }
}

export default Home;
