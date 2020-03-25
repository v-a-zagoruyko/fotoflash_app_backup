import { observable, action } from "mobx";
import axios from "axios";
import dayjs from "dayjs";
import { Data } from "types/data";

export class DataStore {
  @observable news: { data?: Data.News[]; isLoading: boolean } = {
    isLoading: false
  };
  @observable equipment: { data?: Data.Equipment[]; isLoading: boolean } = {
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

      // toast.error(error.response.data[Object.keys(error.response.data)[0]][0]);
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

      // toast.error(error.response.data[Object.keys(error.response.data)[0]][0]);
      console.error(
        error.response.data[Object.keys(error.response.data)[0]][0]
      );
    }
  };
}

export default DataStore;
