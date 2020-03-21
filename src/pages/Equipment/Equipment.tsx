import React from "react";
import { inject, observer } from "mobx-react";
import cn from "classnames/bind";
import { DataStore } from "store";
import { General } from "layouts";
import styles from "./Equipment.module.scss";

const cx = cn.bind(styles);

interface Props {
  dataStore: DataStore;
}

interface State {}

@inject("dataStore")
@observer
class Equipment extends React.Component<Props, State> {
  componentDidMount() {
    this.props.dataStore.fetchEquipment();
  }

  render() {
    const {
      equipment: { data, isLoading }
    } = this.props.dataStore;

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
      </General>
    );
  }
}

export default Equipment;
