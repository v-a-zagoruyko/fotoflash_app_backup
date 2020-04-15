import { Dayjs } from "dayjs";
import { Data } from "./data";

export namespace User {
  export type handleLogin = {
    email: string;
    password: string;
  };

  export type handleSignUp = {
    email: string;
    password1: string;
    password2: string;
  };

  export type handleRestorePassword = {
    email: string;
  };

  export type handleChangePassword = {
    uid: string;
    token: string;
    new_password1: string;
    new_password2: string;
  };

  export type Profile = {
    id: number;
    email: string;
    name: string;
    phone: string;
    face: string | null;
    card: {
      type: "SILVER" | "GOLD" | "PLATINUM";
      balance: number;
    };
  };

  export type Rent = {
    location: Data.Location;
    equipment: Data.Equipment[];
    date: Dayjs;
    start: Dayjs;
    end: Dayjs;
    price: number;
  };
}
