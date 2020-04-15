import { observable, action } from "mobx";
import axios from "axios";
import dayjs, { Dayjs } from "dayjs";
import { toast } from "react-toastify";
import { Data } from "types/data";
import "dayjs/locale/ru";

dayjs.locale("ru");

export class DataStore {
  @observable news: { data?: Data.News[]; isLoading: boolean } = {
    isLoading: false
  };
  @observable locations: { data?: Data.Location[]; isLoading: boolean } = {
    isLoading: false
  };
  @observable equipment: { data?: Data.Equipment[]; isLoading: boolean } = {
    isLoading: false
  };
  @observable busy: { data: number[]; isLoading: boolean } = {
    data: [],
    isLoading: false
  };

  @action.bound
  fetchNews = async () => {
    try {
      this.news.isLoading = true;

      const { data } = await axios({
        method: "get",
        headers: {
          "Content-Type": "application/json"
        },
        url: `${process.env.REACT_APP_API_V0}/apiv0/news/`
      });

      this.news.data = data.map((x: any) => {
        return {
          ...x,
          date: dayjs(x.date),
          origin: { source: x.source, link: x.link }
        };
      });

      this.news.isLoading = false;
    } catch (error) {
      this.news.isLoading = false;

      toast.error(error.response.data[Object.keys(error.response.data)[0]][0]);
      console.error(
        error.response.data[Object.keys(error.response.data)[0]][0]
      );
    }
  };

  @action.bound
  fetchLocations = async () => {
    try {
      this.locations.isLoading = true;

      const { data } = await axios({
        method: "get",
        headers: {
          "Content-Type": "application/json"
        },
        url: `${process.env.REACT_APP_API_V0}/apiv0/locations/`
      });

      this.locations.data = data.map((x: any) => {
        const time = x.time
          ? x.time.map((y: any) => ({
              ...y,
              cost: {
                base: y.base,
                atLate: y.atLate,
                atWeekends: y.atWeekends,
                night: y.night,
                nightHalf: y.nightHalf
              }
            }))
          : undefined;

        return {
          ...x,
          cost: {
            hour: x.base,
            atLate: x.atLate,
            atWeekends: x.atWeekends,
            night: x.night,
            nightHalf: x.nightHalf
          },
          gallery: x.gallery ? x.gallery.map((y: any) => y.image) : [],
          time
        };
      });

      this.locations.isLoading = false;
    } catch (error) {
      this.locations.isLoading = false;

      toast.error(error.response.data[Object.keys(error.response.data)[0]][0]);
      console.error(
        error.response.data[Object.keys(error.response.data)[0]][0]
      );
    }
  };

  @action.bound
  fetchEquipment = async () => {
    try {
      this.equipment.isLoading = true;

      const { data } = await axios({
        method: "get",
        headers: {
          "Content-Type": "application/json"
        },
        url: `${process.env.REACT_APP_API_V0}/apiv0/equipment/`
      });

      this.equipment.data = data.map((x: any) => {
        return {
          ...x,
          type: x.type.title,
          cost: { hour: x.hour, day: x.day }
        };
      });

      this.equipment.isLoading = false;
    } catch (error) {
      this.equipment.isLoading = false;

      toast.error(error.response.data[Object.keys(error.response.data)[0]][0]);
      console.error(
        error.response.data[Object.keys(error.response.data)[0]][0]
      );
    }
  };

  @action.bound
  fetchBusyTime = async (id: number, date: Dayjs) => {
    try {
      this.busy.isLoading = true;

      const { data } = await axios({
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token")
        },
        url: `${
          process.env.REACT_APP_API_V0
        }/apiv0/locationrent/?id=${id}&date=${date.format("YYYY-MM-DD")}`
      });

      this.busy.data = data;
      this.busy.isLoading = false;
    } catch (error) {
      this.busy.isLoading = false;

      toast.error(error.response.data[Object.keys(error.response.data)[0]][0]);
      console.error(
        error.response.data[Object.keys(error.response.data)[0]][0]
      );
    }
  };
}

export default DataStore;
