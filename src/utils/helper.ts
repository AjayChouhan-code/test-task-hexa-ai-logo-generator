import { Dimensions, Platform } from "react-native";

const { width, height } = Dimensions.get("window");

const guidelineBaseWidth = 390;

const scale = (size: number) => (width / guidelineBaseWidth) * size;

const moderateScale = (size: number, factor = 0.25): number =>
  size + (scale(size) - size) * factor;

const getDimensions = () => {
  return { height, width };
};

const isIOS = () => Platform.OS === "ios";
const isAndroid = () => Platform.OS === "android";

const randomTime = Math.floor(Math.random() * (60000 - 30000 + 1)) + 30000;

const getFontFamily = (weight?: "regular" | "500" | "600" | "700" | "800") => {
  switch (weight) {
    case "500":
      return "ManropeMedium";
    case "600":
      return "ManropeBold";
    case "700":
      return "ManropeBold";
    case "800":
      return "ManropeExtraBold";
    case "regular":
      return "ManropeRegular";
    default:
      return "ManropeRegular";
  }
};

export {
  isIOS,
  isAndroid,
  moderateScale,
  getDimensions,
  randomTime,
  getFontFamily,
};
