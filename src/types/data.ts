import { Dayjs } from "dayjs";

export namespace Data {
  export type News = {
    title: string;
    html: string;
    date: Dayjs;
    coverUrl: string;
    origin: {
      source?: string;
      link?: string;
    };
  };

  export type Equipment = {
    type: string;
    title: string;
    html: string;
    coverUrl: string;
    cost: {
      hour: number;
      day: number;
    };
  };

  export type Location = {
    title: string;
    html: string;
    coverUrl: string;
    cost: {
      hour: number;
      atLate: number;
      atWeekends: number;
      night: number;
      nightHalf: number;
    };
    specialCost: {
      from: Dayjs;
      to: Dayjs;
      cost: {
        hour: number;
        atLate: number;
        atWeekends: number;
        night: number;
        nightHalf: number;
      };
    }[];
    equipment: {
      equipment: Equipment;
      number: Number;
    }[];
    gallery: string[];
  };
}
