import React from "react";
import { Link } from "react-router-dom";
import { inject, observer } from "mobx-react";
import Media from "react-media";
import cn from "classnames/bind";
import { UserStore } from "store";
import { Private } from "layouts";
import { Button, Icon } from "components";
import { User } from "types/user";
import styles from "./Profile.module.scss";

const cx = cn.bind(styles);

const bonus = {
  SILVER: { name: "Серебряная карта", description: "Ваша серебряная карта" },
  GOLD: { name: "Золотая карта", description: "Ваша золотая карта" },
  PLATINUM: { name: "Платиновая карта", description: "Ваша платиновая карта" }
};

interface Props {
  userStore: UserStore;
}

interface State {}

@inject("userStore")
@observer
class Profile extends React.Component<Props, State> {
  componentDidMount() {
    this.props.userStore.fetchUser();
    this.props.userStore.fetchRent();
  }

  render() {
    const {
      user: { data: userData, isLoading: isUserLoading },
      rent: { data: rentData, isLoading: isRentLoading }
    } = this.props.userStore;

    return (
      <Private isLoading={isUserLoading || isRentLoading}>
        {userData && (
          <>
            <nav className={cx("profile-nav")}>
              <Link className={cx("profile-nav--link", "link")} to="/">
                <Icon className={cx("profile-nav--icon")} code="left" />
                На главную
              </Link>
              <Link className={cx("profile-nav--link", "link")} to="/rent">
                К бронированию
                <Icon className={cx("profile-nav--icon")} code="right" />
              </Link>
            </nav>
            <div className={cx("profile--bio")}>
              <div>
                <img
                  className={cx("profile--face")}
                  src={userData.face || "https://bit.ly/33S32gt"}
                  alt=""
                />
                <span>
                  <h1 className={cx("profile--name", "title")}>
                    {userData.name}
                  </h1>
                  <p
                    className={cx(
                      "profile--bonus",
                      `profile--bonus__${userData.card.type}`,
                      "text"
                    )}
                    title={bonus[userData.card.type].description}
                  >
                    {bonus[userData.card.type].name}, Баланс:{" "}
                    {userData.card.balance}
                  </p>
                </span>
              </div>
              <Media queries={{ small: { maxWidth: 992 } }}>
                {matches =>
                  !matches.small && (
                    <div>
                      <Button design="text" color="primary">
                        Изменить профиль
                      </Button>
                      <Button
                        onClick={this.props.userStore.logoutUser}
                        design="text"
                        color="primary"
                      >
                        Выйти
                      </Button>
                    </div>
                  )
                }
              </Media>
            </div>
            <Media queries={{ small: { maxWidth: 992 } }}>
              {matches =>
                matches.small && (
                  <>
                    <Button
                      className={cx("profile--btn")}
                      design="text"
                      color="primary"
                    >
                      Изменить профиль
                    </Button>
                    <Button
                      onClick={this.props.userStore.logoutUser}
                      className={cx("profile--btn")}
                      design="text"
                      color="primary"
                    >
                      Выйти
                    </Button>
                  </>
                )
              }
            </Media>
          </>
        )}
        <div className={cx("rent")}></div>
        {rentData?.map((item, idx) => {
          const { location, date, start, price, end } = item;
          const { title } = location;

          return (
            <details key={`rent${idx}`}>
              <summary className={cx("rent--item")}>
                <p className={cx("rent--title", "title")}>{title}</p>
                <div className={cx("rent--block")}>
                  <p className={cx("rent--text", "title")}>
                    Дата<span>{date.format("D MMMM YYYY")}</span>
                  </p>
                  <p className={cx("rent--text", "title")}>
                    Время
                    <span>
                      {start.format("HH:00")} - {end.format("HH:00")}
                    </span>
                  </p>
                  <p className={cx("rent--text", "title")}>
                    Стоимость
                    <span>{price} ₽</span>
                  </p>
                </div>
              </summary>
              {/* <div className={cx("rent--info")}></div> */}
            </details>
          );
        })}
      </Private>
    );
  }
}

export default Profile;
