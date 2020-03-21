import { observable, action, autorun } from "mobx";
import {
  setCurrentTheme,
  setNextTheme,
  setCurrentVideoState,
  setNextVideoState
} from "utils";
import { Utils } from "types/utils";

export class AppStore {
  @observable theme: Utils.Theme = setCurrentTheme();
  @observable videoState: Utils.Video = setCurrentVideoState();

  constructor() {
    this.initWatcher();
  }

  private initWatcher = () => {
    autorun(() => {
      localStorage.setItem("theme", this.theme);
      localStorage.setItem("videoState", this.videoState);
    });
  };

  @action.bound
  nextTheme = () => {
    this.theme = setNextTheme();
  };

  @action.bound
  toggleVideo = () => {
    this.videoState = setNextVideoState();
  };
}

export default AppStore;
