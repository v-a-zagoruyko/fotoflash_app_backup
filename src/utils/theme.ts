import { Utils } from "types/utils";
import light from "styles/light.module.scss";
import dark from "styles/dark.module.scss";

const lightTheme = {
  "--primary": light.primary,
  "--secondary": light.secondary,
  "--disabled": light.disabled,
  "--background": light.background,
  "--surface": light.surface,
  "--error": light.error,
  "--onPrimary": light.onPrimary,
  "--onSecondary": light.onSecondary,
  "--onBackground": light.onBackground,
  "--onSurface": light.onSurface,
  "--onError": light.onError
};

const darkTheme = {
  "--primary": dark.primary,
  "--secondary": dark.secondary,
  "--disabled": dark.disabled,
  "--background": dark.background,
  "--surface": dark.surface,
  "--error": dark.error,
  "--onPrimary": dark.onPrimary,
  "--onSecondary": dark.onSecondary,
  "--onBackground": dark.onBackground,
  "--onSurface": dark.onSurface,
  "--onError": dark.onError
};

const setTheme = (nextTheme: Utils.Theme = "light") => {
  const theme = nextTheme === "light" ? lightTheme : darkTheme;

  Object.keys(theme).forEach(key => {
    const value = (theme as any)[key];
    document.documentElement.style.setProperty(key, value);
  });
};

export const setCurrentTheme = () => {
  const theme = localStorage.getItem("theme");

  switch (theme) {
    case "dark":
      setTheme("dark");
      return "dark";
    case "light":
    default:
      setTheme("light");
      return "light";
  }
};

export const setNextTheme = () => {
  const theme = localStorage.getItem("theme");

  switch (theme) {
    case "dark":
      setTheme("light");
      return "light";
    case "light":
    default:
      setTheme("dark");
      return "dark";
  }
};
