import React from "react";
import { inject, observer } from "mobx-react";
import cn from "classnames/bind";
import { DataStore } from "store";
import { General } from "layouts";
import styles from "./News.module.scss";

const cx = cn.bind(styles);

interface Props {
  dataStore: DataStore;
}

interface State {}

@inject("dataStore")
@observer
class News extends React.Component<Props, State> {
  componentDidMount() {
    this.props.dataStore.fetchNews();
  }

  render() {
    const {
      news: { data, isLoading }
    } = this.props.dataStore;

    return (
      <General title="Блог" isLoading={isLoading}>
        <h1 className={cx("general--title")}>Арт блог</h1>
        <p className={cx("general--text")}>
          Это блог нашей студии, здесь вы найдёте интересные факты об искусстве
          фотографии, камерах и фотографах. Также на этой странице мы публикуем
          различные конкурсы, новости, уникальные предложения и выгодные акции
          для наших подписчиков. Оставайтесь в курсе всех новостей и знакомьтесь
          с акциями первыми!
        </p>
      </General>
    );
  }
}

export default News;
