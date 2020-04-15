import { observable, action } from "mobx";
import axios from "axios";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { User } from "types/user";
import { history } from "utils/history";

dayjs.locale("ru");

export class UserStore {
  @observable user: { data?: User.Profile; isLoading: boolean } = {
    isLoading: false
  };
  @observable rent: { data?: User.Rent[]; isLoading: boolean } = {
    isLoading: false
  };

  @action.bound
  fetchRent = async () => {
    try {
      this.rent.isLoading = true;

      const { data } = await axios({
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token")
        },
        url: `${process.env.REACT_APP_API_V0}/apiv0/userlocationrent/`
      });

      this.rent.data = data.map((x: any) => {
        return {
          ...x,
          date: dayjs(x.date),
          start: dayjs().hour(x.start.split(":")[0]),
          end: dayjs().hour(x.end.split(":")[0])
        };
      });

      this.rent.isLoading = false;
    } catch (error) {
      this.rent.isLoading = false;

      toast.error(error.response.data[Object.keys(error.response.data)[0]][0]);
      console.error(
        error.response.data[Object.keys(error.response.data)[0]][0]
      );
    }
  };

  @action.bound
  fetchUser = async () => {
    try {
      this.user.isLoading = true;

      const { data } = await axios({
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token")
        },
        url: `${process.env.REACT_APP_API_V0}/user/user/`
      });

      this.user.data = data;
      this.user.isLoading = false;
    } catch (error) {
      localStorage.removeItem("token");
      this.user.isLoading = false;

      toast.error(error.response.data[Object.keys(error.response.data)[0]][0]);
      console.error(
        error.response.data[Object.keys(error.response.data)[0]][0]
      );
    }
  };

  @action.bound
  loginUser = async ({ email, password }: User.handleLogin) => {
    try {
      this.user.isLoading = true;

      const { data } = await axios({
        method: "post",
        data: { email, password },
        headers: {
          "Content-Type": "application/json"
        },
        url: `${process.env.REACT_APP_API_V0}/user/login/`
      });

      localStorage.setItem("token", `JWT ${data.token}`);
      this.user.data = data.user;
      this.user.isLoading = false;
      history.push("/user");
    } catch (error) {
      this.user.isLoading = false;

      toast.error(error.response.data[Object.keys(error.response.data)[0]][0]);
      console.error(
        error.response.data[Object.keys(error.response.data)[0]][0]
      );
    }
  };

  @action.bound
  signUpUser = async ({ email, password1, password2 }: User.handleSignUp) => {
    try {
      this.user.isLoading = true;

      const { data } = await axios({
        method: "post",
        data: { email, password1, password2 },
        headers: {
          "Content-Type": "application/json"
        },
        url: `${process.env.REACT_APP_API_V0}/user/registration/`
      });

      localStorage.setItem("token", `JWT ${data.token}`);
      this.user.data = data.user;
      this.user.isLoading = false;
      history.push("/user");
    } catch (error) {
      this.user.isLoading = false;

      toast.error(error.response.data[Object.keys(error.response.data)[0]][0]);
      console.error(
        error.response.data[Object.keys(error.response.data)[0]][0]
      );
    }
  };

  @action.bound
  restoreUserPassword = async ({ email }: User.handleRestorePassword) => {
    try {
      this.user.isLoading = true;

      await axios({
        method: "post",
        data: { email },
        headers: {
          "Content-Type": "application/json"
        },
        url: `${process.env.REACT_APP_API_V0}/user/password/reset/`
      });

      this.user.isLoading = false;
      toast.success(`Письмо успешно отправлено на ${email}!`);
    } catch (error) {
      this.user.isLoading = false;

      toast.error(error.response.data[Object.keys(error.response.data)[0]][0]);
      console.error(
        error.response.data[Object.keys(error.response.data)[0]][0]
      );
    }
  };

  @action.bound
  changeUserPassword = async ({
    uid,
    token,
    new_password1,
    new_password2
  }: User.handleChangePassword) => {
    try {
      this.user.isLoading = true;

      await axios({
        method: "post",
        data: { uid, token, new_password1, new_password2 },
        headers: {
          "Content-Type": "application/json"
        },
        url: `${process.env.REACT_APP_API_V0}/user/password/reset/confirm/`
      });

      this.user.isLoading = false;
      toast.success("Пароль успешно изменен!");
      history.push("/login");
    } catch (error) {
      this.user.isLoading = false;

      toast.error(error.response.data[Object.keys(error.response.data)[0]][0]);
      console.error(
        error.response.data[Object.keys(error.response.data)[0]][0]
      );
    }
  };

  @action.bound
  logoutUser = async () => {
    try {
      this.user.isLoading = true;

      await axios({
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token")
        },
        url: `${process.env.REACT_APP_API_V0}/user/logout/`
      });

      localStorage.removeItem("token");
      this.user.isLoading = false;
      history.push("/");
    } catch (error) {
      localStorage.removeItem("token");
      this.user.isLoading = false;

      toast.error(error.response.data[Object.keys(error.response.data)[0]][0]);
      console.error(
        error.response.data[Object.keys(error.response.data)[0]][0]
      );
    }
  };
}

export default UserStore;
