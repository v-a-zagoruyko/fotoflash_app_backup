import React from "react";
import { inject, observer } from "mobx-react";
import cn from "classnames/bind";
import { DataStore } from "store";
import { General } from "layouts";
import { Card, Badge, Icon } from "components";
import { Data } from "types/data";
import styles from "./Equipment.module.scss";

const cx = cn.bind(styles);

interface Props {
  dataStore: DataStore;
}

interface State {
  item: Data.Equipment | null;
  selectedTypes: string[];
}

@inject("dataStore")
@observer
class Equipment extends React.Component<Props, State> {
  state: State = { item: null, selectedTypes: [] };

  componentDidMount() {
    this.props.dataStore.fetchEquipment();
  }

  toggleType = (type: string) => {
    const { selectedTypes } = this.state;
    console.log(selectedTypes);

    this.setState({
      selectedTypes: selectedTypes.includes(type)
        ? selectedTypes.filter(x => x !== type)
        : [...selectedTypes, type]
    });
  };

  handleOpenItem = (item: Data.Equipment) => {
    this.setState({ item });
  };

  handleCloseItem = () => {
    this.setState({ item: null });
  };

  Types = () => {
    const {
      equipment: { data }
    } = this.props.dataStore;
    const { selectedTypes } = this.state;
    const typesList = Array.from(new Set(data!.map(x => x.type)));

    return (
      <div className={cx("types")}>
        {typesList.map((item, idx) => {
          const isActive = selectedTypes.includes(item);

          return (
            <Badge
              key={`type${idx}`}
              onClick={() => this.toggleType(item)}
              className={cx("types--item")}
              color="primary"
              isActive={isActive}
            >
              {item}
            </Badge>
          );
        })}
      </div>
    );
  };

  render() {
    const {
      equipment: { data, isLoading }
    } = this.props.dataStore;
    const { selectedTypes } = this.state;
    const equipmentList = data?.filter(item => {
      if (selectedTypes.length > 0) {
        return selectedTypes.includes(item.type);
      }
      return item;
    });

    return (
      <General title="Оборудование" isLoading={isLoading}>
        <h1 className={cx("title")}>Оборудование</h1>
        <p className={cx("text")}>
          Хорошее оборудование - залог хорошей фотографии. В естественных
          условиях у фотографа нет возможности повлиять на солнечный свет, он
          может только подстроиться под имеющиеся условия, далеко не всегда
          благоприятные. Что лучше использовать – постоянный свет или
          импульсный? Какая вспышка лучше? Подойдёт ли выбранная портретная
          тарелка к имеющемуся моноблоку? На все эти и множество других вопросов
          у нас есть ответ.
        </p>
        {data && this.Types()}
        <div className={cx("grid")}>
          {equipmentList?.map((item, idx) => {
            const { title, html, coverUrl } = item;

            return (
              <div className={cx("grid--item", "card")}>
                <img className={cx("card--img")} src={coverUrl} alt={title} />
                <h6 className={cx("card--title")}>{title}</h6>
                <p className={cx("card--text")}>{html}</p>
              </div>
            );

            // return (
            //   <Card
            //     key={`equipment${idx}`}
            //     className={cx("grid--item")}
            //     onPrimary={() => this.handleOpenItem(item)}
            //     design="vertical"
            //     title={title}
            //     subtitle={type}
            //     image={coverUrl}
            //     primary="Подробнее"
            //   />
            // );
          })}
        </div>
      </General>
    );
  }
}

export default Equipment;
