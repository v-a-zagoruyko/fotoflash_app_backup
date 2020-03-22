import { Dayjs } from "dayjs";

export namespace Data {
  export type News = {
    title: string;
    html: string;
    date: Dayjs;
    coverUrl: string;
    origin: {
      source: string;
      link: string;
    };
  };

  export type Equipment = {
    type: string;
    title: string;
    html: string;
    coverUrl: string;
    cost: {
      hour: number;
    };
  };
}
