import React from "react";
import { Link } from "react-router-dom";
import { inject, observer } from "mobx-react";
import cn from "classnames/bind";
import { UserStore } from "store";
import { Form } from "layouts";
import { Button, Input } from "components";
import { User } from "types/user";
import styles from "./Login.module.scss";

const cx = cn.bind(styles);

interface Props {
  userStore: UserStore;
}

interface State {
  input: User.handleLogin;
}

@inject("userStore")
@observer
class Login extends React.Component<Props, State> {
  state: State = { input: { email: "", password: "" } };

  handleUserInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      input: { ...this.state.input, [event.target.name]: event.target.value }
    });
  };

  handleUserLogin = () => {
    this.props.userStore.loginUser(this.state.input);
  };

  render() {
    const { isLoading } = this.props.userStore.user;
    const { email, password } = this.state.input;

    return (
      <Form title="Вход в личный кабинет">
        <div className={cx("container")}>
          <h1 className={cx("container--title", "title")}>
            Войти в личный кабинет
          </h1>
          <Input
            onChange={this.handleUserInput}
            value={email}
            type="email"
            label="Почта"
            name="email"
          />
          <Input
            onChange={this.handleUserInput}
            value={password}
            type="password"
            label="Пароль"
            name="password"
          />
          <Link className={cx("container--link")} to="/signup">
            Еще не зарегистрированы?
          </Link>
          <Link className={cx("container--link")} to="/password-reset/confirm">
            Забыли пароль?
          </Link>
          <Button
            onClick={this.handleUserLogin}
            className={cx("container--button")}
            design="fill"
            color="primary"
            isLoading={isLoading}
          >
            Войти
          </Button>
        </div>
      </Form>
    );
  }
}

export default Login;
