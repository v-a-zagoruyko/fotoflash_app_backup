import React from "react";
import { inject, observer } from "mobx-react";
import cn from "classnames/bind";
import { DataStore } from "store";
import { Data } from "types/data";
import { General } from "layouts";
import { Card } from "components";
import styles from "./Equipment.module.scss";

const cx = cn.bind(styles);

interface Props {
  dataStore: DataStore;
}

interface State {
  item: Data.Equipment | null;
}

@inject("dataStore")
@observer
class Equipment extends React.Component<Props, State> {
  state: State = { item: null };

  componentDidMount() {
    this.props.dataStore.fetchEquipment();
  }

  handleOpenItem = (item: Data.Equipment) => {
    this.setState({ item });
  };

  handleCloseItem = () => {
    this.setState({ item: null });
  };

  Item = () => {
    const { title, type, html } = this.state.item!;

    return (
      <div className={cx("container")} onClick={this.handleCloseItem}>
        <article className={cx("item")}>
          <h3 className={cx("item--title")}>{title}</h3>
          <p className={cx("item--subtitle")}>{type}</p>
          <p
            className={cx("item--text")}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </article>
      </div>
    );
  };

  render() {
    const {
      equipment: { data, isLoading }
    } = this.props.dataStore;
    const { item } = this.state;

    return (
      <General title="Оборудование" isLoading={isLoading}>
        <h1 className={cx("general--title")}>Оборудование</h1>
        <p className={cx("general--text")}>
          Хорошее оборудование - залог хорошей фотографии. В естественных
          условиях у фотографа нет возможности повлиять на солнечный свет, он
          может только подстроиться под имеющиеся условия, далеко не всегда
          благоприятные. Что лучше использовать – постоянный свет или
          импульсный? Какая вспышка лучше? Подойдёт ли выбранная портретная
          тарелка к имеющемуся моноблоку? На все эти и множество других вопросов
          у нас есть ответ.
        </p>
        <div className={cx("grid")}>
          {data?.map((item, idx) => {
            const { title, type, coverUrl } = item;

            return (
              <Card
                key={`equipment${idx}`}
                onPrimary={() => this.handleOpenItem(item)}
                design="vertical"
                title={title}
                subtitle={type}
                image={coverUrl}
                primary="Подробнее"
              />
            );
          })}
        </div>
        {item && this.Item()}
      </General>
    );
  }
}

export default Equipment;
