export const setCurrentVideoState = () => {
  const videoState = localStorage.getItem("videoState");

  switch (videoState) {
    case "off":
      return "off";
    case "on":
    default:
      return "on";
  }
};

export const setNextVideoState = () => {
  const videoState = localStorage.getItem("videoState");

  switch (videoState) {
    case "on":
      return "off";
    case "off":
    default:
      return "on";
  }
};
