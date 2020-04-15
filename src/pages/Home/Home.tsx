import React from "react";
import cn from "classnames/bind";
import { General } from "layouts";
import { Button } from "components";
import styles from "./Home.module.scss";

const cx = cn.bind(styles);

interface Props {}
interface State {}

class Home extends React.Component<Props, State> {
  render() {
    return (
      <General title="Главная страница" isLoading={false}>
        <h1 className={cx("title")}>Арт-Пространство FOTOFLASH</h1>
        <p className={cx("text")}>
          Рады сообщить вам, что мы открыли свои двери!
          <br />
          <br />
          FOTOFLASH studio - профессиональная арендная фотостудия с
          эксклюзивными дизайнерскими интерьерами, мебелью премиум класса и
          новейшим оборудованием Profoto. Помимо превосходных интерьеров в
          каждой из наших студий максимум естественного света за счет огромных
          панорамных окон и солнечной стороны.
          <br />
          <br />
          Бронируйте фотосессии онлайн, регистрируйтесь, следите за новостями
          студии и получайте бонусы и подарки эксклюзивно на сайте.
        </p>
        <div className={cx("block")}>
          <img
            className={cx("block--img")}
            src="https://bit.ly/2QWmsvo"
            alt=""
          />
          <div className={cx("block--text")}>
            <h1 className={cx("title")}>Аренда студии</h1>
            <p className={cx("text")}>
              Запечатлеть мгновение современному человеку помогает новейшая
              фотографическая техника. А вот создать для фото соответствующий
              антураж можно несколькими способами.
              <br />
              <br />
              Аренда фотостудии в Тюмени недорого с возможностью выбора,
              бронирование на различных сроках, является великолепной
              возможностью сформировать профессиональное портфолио или провести
              фотосессию.
            </p>
            <Button
              onClick={() => window.location.replace("/#/rent")}
              design="fill"
              color="primary"
            >
              Перейти к бронированию
            </Button>
          </div>
        </div>
        <div className={cx("block")}>
          <div className={cx("block--text")}>
            <h1 className={cx("title")}>Оборудование для фотосессий</h1>
            <p className={cx("text")}>
              Хороший свет - залог хорошей фотографии. В естественных условиях у
              фотографа нет возможности повлиять на солнечный свет, он может
              только подстроиться под имеющиеся условия, далеко не всегда
              благоприятные.
              <br />
              <br />
              Что лучше использовать – постоянный свет или импульсный? Какая
              вспышка лучше? Подойдёт ли выбранная портретная тарелка к
              имеющемуся моноблоку? На все эти и множество других вопросов с
              удовольствием ответят наши специалисты.
            </p>
            <Button
              onClick={() => window.location.replace("/#/equipment")}
              design="fill"
              color="primary"
            >
              Посмотреть оборудование
            </Button>
          </div>
          <img
            className={cx("block--img")}
            src="https://bit.ly/2QWmsvo"
            alt=""
          />
        </div>
        <div className={cx("block")}>
          <img
            className={cx("block--img")}
            src="https://bit.ly/2QWmsvo"
            alt=""
          />
          <div className={cx("block--text")}>
            <h1 className={cx("title")}>Команда профессионалов</h1>
            <p className={cx("text")}>
              Мы всегда рады проконсультировать вас по поводу выбора
              необходимого вам фотооборудования и деталей фотосессии. Каждый
              клиент у нас может рассчитывать на индивидуальный подход.
              <br />
              <br />
              Наши специалисты всегда готовы внимательно изучить ваши
              потребности и предложить вам тот вариант, который будет
              оптимальным именно для решения ваших задач.
            </p>
          </div>
        </div>
        <h1 className={cx("title", "title__padded")}>Контакты</h1>
        <p className={cx("text")}>
          Смотрите маршрут проезда, чтобы не тратить время на поиски в других
          приложениях. Звоните по номеру телефона и уточняйте акции, свободное
          время, аренду оборудования, наши специалисты ответят на любой ваш
          вопрос. Подписывайтесь на наши социальные сети, будьте в курсе всех
          новостей.
        </p>
        <p className={cx("text")}>
          Номер телефона:{" "}
          <b>
            <a className={cx("link")} href="tel:+79222670055">
              +7 922 267-00-55
            </a>
          </b>
        </p>
        <p className={cx("text")}>
          Почта:{" "}
          <b>
            <a className={cx("link")} href="mailto:mail@fotoflash.studio">
              info@fotoflash.studio
            </a>
          </b>
        </p>
        <p className={cx("text")}>
          <b>
            <a className={cx("link")} href="https://bit.ly/359ypm4">
              2GIS
            </a>
          </b>
        </p>
        <p className={cx("text")}>
          <br />
          ИП:
          <b> Гладаренко Лилия Васильевна</b>
          <br />
          ИНН:
          <b> 720403866940</b>
          <br />
          625046, Российская федерация, Тюменская область,
          <br />
          г. Тюмень, ул. Зоологическая, д. 27
        </p>
      </General>
    );
  }
}

export default Home;
