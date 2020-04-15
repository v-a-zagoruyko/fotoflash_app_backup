import React from "react";
import { Link } from "react-router-dom";
import { inject, observer } from "mobx-react";
import cn from "classnames/bind";
import { UserStore } from "store";
import { Form } from "layouts";
import { Button, Input } from "components";
import { User } from "types/user";
import styles from "./SignUp.module.scss";

const cx = cn.bind(styles);

interface Props {
  userStore: UserStore;
}

interface State {
  input: User.handleSignUp;
}

@inject("userStore")
@observer
class SignUp extends React.Component<Props, State> {
  state: State = { input: { email: "", password1: "", password2: "" } };

  handleUserInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      input: { ...this.state.input, [event.target.name]: event.target.value }
    });
  };

  handleUserSignUp = () => {
    this.props.userStore.signUpUser(this.state.input);
  };

  render() {
    const { isLoading } = this.props.userStore.user;
    const { email, password1, password2 } = this.state.input;

    return (
      <Form title="Вход в личный кабинет">
        <div className={cx("container")}>
          <h1 className={cx("container--title", "title")}>Регистрация</h1>
          <Input
            onChange={this.handleUserInput}
            value={email}
            type="email"
            label="Почта"
            name="email"
          />
          <Input
            onChange={this.handleUserInput}
            value={password1}
            type="password"
            label="Пароль"
            name="password1"
          />
          <Input
            onChange={this.handleUserInput}
            value={password2}
            type="password"
            label="Повторите пароль"
            name="password2"
          />
          <Link className={cx("container--link")} to="/login">
            Уже зарегистрированы?
          </Link>
          <Link className={cx("container--link")} to="/password-reset/confirm">
            Забыли пароль?
          </Link>
          <Button
            onClick={this.handleUserSignUp}
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

export default SignUp;
