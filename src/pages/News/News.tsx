import React from "react";
import { inject, observer } from "mobx-react";
import cn from "classnames/bind";
import { DataStore } from "store";
import { Data } from "types/data";
import { General } from "layouts";
import { Card } from "components";
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
  };

  handleCloseArticle = () => {
    this.setState({ article: null });
  };

  Article = () => {
    const { title, date, html, origin, coverUrl } = this.state.article!;

    return (
      <div className={cx("container")} onClick={this.handleCloseArticle}>
        <article className={cx("article")}>
          <img className={cx("article--img")} src={coverUrl} alt={title} />
          <div className={cx("article--content")}>
            <h3 className={cx("article--title")}>{title}</h3>
            <p className={cx("article--date")}>{date.format("DD MMMM")}</p>
            {origin && (
              <a
                href={origin.link}
                target="_blank"
                rel="noopener noreferrer"
                className={cx("article--link")}
              >
                {origin.source}
              </a>
            )}
            <p
              className={cx("article--text")}
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        </article>
      </div>
    );
  };

  render() {
    const {
      news: { data, isLoading }
    } = this.props.dataStore;
    const { article } = this.state;

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
        <div className={cx("grid")}>
          {data?.map((news, idx) => {
            const { title, date, html, coverUrl } = news;

            return (
              <Card
                key={`news${idx}`}
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
