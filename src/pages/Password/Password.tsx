import React from "react";
import { Link } from "react-router-dom";
import { inject, observer } from "mobx-react";
import cn from "classnames/bind";
import { UserStore } from "store";
import { Form } from "layouts";
import { Button, Input } from "components";
import { User } from "types/user";
import styles from "./Password.module.scss";

const cx = cn.bind(styles);

interface Props {
  userStore: UserStore;
}

interface State {
  inputRestore: User.handleRestorePassword;
  inputChange: User.handleChangePassword;
}

@inject("userStore")
@observer
class Password extends React.Component<Props, State> {
  location = window.location.hash.split("/");

  state: State = {
    inputRestore: { email: "" },
    inputChange: {
      uid: this.location[this.location.length - 3],
      token: this.location[this.location.length - 2],
      new_password1: "",
      new_password2: ""
    }
  };

  handleUserInputRestore = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      inputRestore: {
        ...this.state.inputRestore,
        [event.target.name]: event.target.value
      }
    });
  };

  handleUserInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      inputChange: {
        ...this.state.inputChange,
        [event.target.name]: event.target.value
      }
    });
  };

  handleUserRestorePassword = () => {
    this.props.userStore.restoreUserPassword(this.state.inputRestore);
  };

  handleUserChangePassword = () => {
    this.props.userStore.changeUserPassword(this.state.inputChange);
  };

  render() {
    const { isLoading } = this.props.userStore.user;
    const { email } = this.state.inputRestore;
    const { new_password1, new_password2 } = this.state.inputChange;

    if (this.location.length !== 6) {
      return (
        <Form title="Восстановление пароля">
          <div className={cx("container")}>
            <h1 className={cx("container--title", "title")}>
              Восстановить пароль
            </h1>
            <Input
              onChange={this.handleUserInputRestore}
              value={email}
              type="email"
              label="Почта"
              name="email"
            />
            <Link className={cx("container--link")} to="/signup">
              Еще не зарегистрированы?
            </Link>
            <Button
              onClick={this.handleUserRestorePassword}
              className={cx("container--button")}
              design="fill"
              color="primary"
              isLoading={isLoading}
            >
              Восстановить пароль
            </Button>
          </div>
        </Form>
      );
    }

    return (
      <Form title="Восстановление пароля">
        <div className={cx("container")}>
          <h1 className={cx("container--title", "title")}>
            Восстановить пароль
          </h1>
          <Input
            onChange={this.handleUserInputChange}
            value={new_password1}
            type="password"
            label="Пароль"
            name="new_password1"
          />
          <Input
            onChange={this.handleUserInputChange}
            value={new_password2}
            type="password"
            label="Повторите пароль"
            name="new_password2"
          />
          <Button
            onClick={this.handleUserChangePassword}
            className={cx("container--button")}
            design="fill"
            color="primary"
            isLoading={isLoading}
          >
            Изменить пароль
          </Button>
        </div>
      </Form>
    );
  }
}

export default Password;
