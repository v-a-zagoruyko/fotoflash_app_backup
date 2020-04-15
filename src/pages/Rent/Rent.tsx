import React from "react";
import { inject, observer } from "mobx-react";
import DatePicker, { registerLocale } from "react-datepicker";
import dayjs, { Dayjs } from "dayjs";
import cn from "classnames/bind";
import { DataStore } from "store";
import { General } from "layouts";
import { Card, Icon } from "components";
import { Data } from "types/data";
import styles from "./Rent.module.scss";
import "dayjs/locale/ru";
import ru from "date-fns/locale/ru";

dayjs.locale("ru");
registerLocale("ru", ru);

const cx = cn.bind(styles);

interface Props {
  dataStore: DataStore;
}

interface State {
  order: Data.Rent;
}

const initialOrder: Data.Rent = {
  date: dayjs(),
  start: dayjs().hour(9),
  end: dayjs().hour(10)
};

const getTimeArray = (start: number, end: number) => {
  const time = [];
  for (let i = start; i <= end; i++) {
    time.push(
      dayjs()
        .hour(i)
        .minute(0)
    );
  }
  return time;
};

const isWeekend = (day: number) => {
  switch (day) {
    case 0:
    case 5:
    case 6:
      return true;
    default:
      return false;
  }
};

// const getHourCost = (order: Data.Rent, hour: number) => {
//   const { date, location } = order;
//   let cost_ = location!.cost;

//   if (location!.time) {
//     location!.time.forEach((x) => {
//       if (
//         date.isAfter(dayjs(x.start)) &&
//         date.isBefore(
//           dayjs(x.end)
//             .hour(23)
//             .minute(59)
//         )
//       ) {
//         cost_ = x.cost;
//       }
//     });
//   }

//   const { base, atLate, atWeekends } = cost_;
//   let cost = base;
//   if (hour >= 22) cost += atLate;
//   if (isWeekend(date.day())) cost += atWeekends;
//   return cost;
// };

@inject("dataStore")
@observer
class Rent extends React.Component<Props, State> {
  state: State = { order: initialOrder };

  startTimerange = getTimeArray(9, 23);
  endTimerange = getTimeArray(10, 24);

  componentDidMount() {
    const { fetchLocations } = this.props.dataStore;
    fetchLocations();
  }

  setLocation = (location: Data.Location) => {
    const { order } = this.state;
    this.props.dataStore.fetchBusyTime(location.id, order.date);
    this.setState({ order: { ...order, location } });
  };

  setDate = (date: Date | null) => {
    if (!date) return null;
    const { order } = this.state;
    this.setState({ order: { ...order, date: dayjs(date) } });
    this.props.dataStore.fetchBusyTime(order.location!.id, order.date);
  };

  setStartTime = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const index = Number(e.target.value);
    this.setState({
      order: {
        ...this.state.order,
        start: this.startTimerange[index],
        end: this.endTimerange[index]
      }
    });
  };

  setEndTime = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const index = Number(e.target.value);
    this.setState({
      order: { ...this.state.order, end: this.endTimerange[index] }
    });
  };

  // setPhotograph = (photograph: Data.Staff) => {
  //   this.setState({ order: { ...this.state.order, photograph } });
  // };

  // unsetPhotograph = () => {
  //   this.setState({ order: { ...this.state.order, photograph: undefined } });
  // };

  Locations = () => {
    const {
      locations: { data, isLoading }
    } = this.props.dataStore;
    const { order } = this.state;

    if (!data || isLoading) {
      return;
    }

    return (
      <div className={cx("locations-grid")}>
        {data.map((location, idx) => {
          const { title, cost, html, gallery } = location;
          const isSelected = location === order.location;
          const onPrimary = isSelected
            ? () => {}
            : () => this.setLocation(location);
          const primary = isSelected ? "Добавлено!" : "Выбрать студию";

          return (
            <Card
              key={`locationCard${idx}`}
              onPrimary={onPrimary}
              primary={primary}
              image={gallery}
              title={title}
              subtitle={`от ${cost.hour} ₽ в час`}
              design="horizontal"
            >
              <div dangerouslySetInnerHTML={{ __html: html }} />
            </Card>
          );
        })}
      </div>
    );
  };

  DateTimePeriod = () => {
    const {
      busy: { data }
    } = this.props.dataStore;
    const { location, date, start, end } = this.state.order;
    let cost = 0;
    const hours = end.hour() - start.hour();
    const startIndex = this.startTimerange.indexOf(
      this.startTimerange.filter(time => time.hour() === start.hour())[0]
    );
    const endIndex = this.endTimerange.indexOf(
      this.endTimerange.filter(time => time.hour() === end.hour())[0]
    );
    const median = Math.min(...data.filter(x => x > start.hour()));

    if (location) {
      for (let i = start.hour(); i < end.hour(); i++) {
        // cost += getHourCost(i);
      }
    }

    return (
      <div className={cx("datetime", { datetime_disabled: !location })}>
        <div className={cx("datetime-grid")}>
          <div className={cx("datetime-card")}>
            <h6 className={cx("datetime-title")}>Дата проведения фотосессии</h6>
            <DatePicker
              onChange={date => this.setDate(date)}
              className={cx("datetime-input")}
              minDate={new Date()}
              selected={new Date(date.format())}
              dateFormat="d MMMM"
              locale="ru"
              disabled={!location}
            />
          </div>
          <div className={cx("datetime-card")}>
            <h6 className={cx("datetime-title")}>Время начала фотосесии</h6>
            <select
              onChange={this.setStartTime}
              className={cx("datetime-select")}
              value={startIndex}
              disabled={!location}
            >
              {this.startTimerange.map((time, idx) => (
                <option
                  key={`startTime${idx}`}
                  value={idx}
                  disabled={data.includes(time.hour())}
                >
                  {time.format("HH:mm")}
                </option>
              ))}
            </select>
          </div>
          <div className={cx("datetime-card")}>
            <h6 className={cx("datetime-title")}>Время конца фотосесии</h6>
            <select
              onChange={this.setEndTime}
              className={cx("datetime-select")}
              value={endIndex}
              disabled={!location}
            >
              {this.endTimerange.map((time, idx) => (
                <option
                  key={`endTime${idx}`}
                  value={idx}
                  disabled={idx < startIndex || time.hour() > median}
                >
                  {time.format("HH:mm")}
                </option>
              ))}
            </select>
          </div>
        </div>
        {location && (
          <span className={cx("datetime-caption")}>
            Итоговая стоимость за {hours} часов: <span>{`${cost} ₽`}</span>
          </span>
        )}
      </div>
    );
  };

  render() {
    const {
      locations: { isLoading: isLocationsLoading }
    } = this.props.dataStore;
    const isLoading = isLocationsLoading;

    return (
      <General title="Бронирование" isLoading={isLoading}>
        <h1 className={cx("title")}>Выберите локацию</h1>
        <p className={cx("text")}>
          Это блог нашей студии, здесь вы найдёте интересные факты об искусстве
          фотографии, камерах и фотографах. Также на этой странице мы публикуем
          различные конкурсы, новости, уникальные предложения и выгодные акции
          для наших подписчиков. Оставайтесь в курсе всех новостей и знакомьтесь
          с акциями первыми!
        </p>
        {this.Locations()}
        <h1 className={cx("title")}>Выберите дату и время</h1>
        <p className={cx("text")}>
          Это блог нашей студии, здесь вы найдёте интересные факты об искусстве
          фотографии, камерах и фотографах. Также на этой странице мы публикуем
          различные конкурсы, новости, уникальные предложения и выгодные акции
          для наших подписчиков. Оставайтесь в курсе всех новостей и знакомьтесь
          с акциями первыми!
        </p>
        {this.DateTimePeriod()}
        <h1 className={cx("title")}>Выберите фотографа</h1>
        <p className={cx("text")}>
          Это блог нашей студии, здесь вы найдёте интересные факты об искусстве
          фотографии, камерах и фотографах. Также на этой странице мы публикуем
          различные конкурсы, новости, уникальные предложения и выгодные акции
          для наших подписчиков. Оставайтесь в курсе всех новостей и знакомьтесь
          с акциями первыми!
        </p>
        <h1 className={cx("title")}>
          Добавьте дополнительное оборудование или услуги
        </h1>
        <p className={cx("text")}>
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

export default Rent;
