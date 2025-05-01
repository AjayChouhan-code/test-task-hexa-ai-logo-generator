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

export { isIOS, isAndroid, moderateScale, getDimensions };
