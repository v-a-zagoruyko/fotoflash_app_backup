import React from "react";
import { inject, observer } from "mobx-react";
import cn from "classnames/bind";
import { DataStore } from "store";
import { General } from "layouts";
import { Card, Icon } from "components";
import { Data } from "types/data";
import styles from "./News.module.scss";

const cx = cn.bind(styles);

interface Props {
  dataStore: DataStore;
}

interface State {
  article: Data.News | null;
}

@inject("dataStore")
@observer
class News extends React.Component<Props, State> {
  state: State = { article: null };

  componentDidMount() {
    this.props.dataStore.fetchNews();
  }

  handleOpenArticle = (article: Data.News) => {
    this.setState({ article });
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
  };

  handleCloseArticle = () => {
    this.setState({ article: null });
    document.body.style.overflow = "auto";
    document.documentElement.style.overflow = "initial";
  };

  Article = () => {
    const { title, date, html, origin, coverUrl } = this.state.article!;

    return (
      <aside className={cx("modal")}>
        <div
          onClick={this.handleCloseArticle}
          className={cx("modal--overlay")}
        />
        <article className={cx("container", "article")}>
          <Icon
            onClick={this.handleCloseArticle}
            className={cx("article--close")}
            code="close"
          />
          <img className={cx("container--img")} src={coverUrl} alt={title} />
          <div className={cx("container--text")}>
            <h1 className={cx("title", "title__padded")}>{title}</h1>
            <p className={cx("article--date")}>{date.format("DD MMMM")}</p>
            {origin.link && origin.source && (
              <a
                href={origin.link}
                target="_blank"
                rel="noopener noreferrer"
                className={cx("article--link")}
              >
                {origin.source}
              </a>
            )}
            <p className={cx("article--scroll", "text")}>{html}</p>
          </div>
        </article>
      </aside>
    );
  };

  render() {
    const {
      news: { data, isLoading }
    } = this.props.dataStore;
    const { article } = this.state;

    return (
      <General title="Блог" isLoading={isLoading}>
        <h1 className={cx("title")}>Арт блог</h1>
        <p className={cx("text")}>
          Это блог нашей студии, здесь вы найдёте интересные факты об искусстве
          фотографии, камерах и фотографах. Также на этой странице мы публикуем
          различные конкурсы, новости, уникальные предложения и выгодные акции
          для наших подписчиков. Оставайтесь в курсе всех новостей и знакомьтесь
          с акциями первыми!
        </p>
        <div className={cx("grid")}>
          {data?.map((news, idx) => {
            const { title, date, html, coverUrl } = news;

            return (
              <Card
                key={`news${idx}`}
                className={cx("grid--item")}
                onPrimary={() => this.handleOpenArticle(news)}
                design="horizontal"
                title={title}
                subtitle={date.format("DD MMMM")}
                image={coverUrl}
                primary="Читать дальше"
              >
                {html}
              </Card>
            );
          })}
        </div>
        {article && this.Article()}
      </General>
    );
  }
}

export default News;
