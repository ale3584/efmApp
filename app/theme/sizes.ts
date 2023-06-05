import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 20,
  padding: 30,
  small: 24,
  big: 32,

  // font sizes
  large: 40,
  h1: 30,
  h2: 24,
  h3: 20,
  h4: 16,
  h5: 14,
  h6: 13,
  body1: 30,
  body2: 22,
  body3: 16,
  body4: 14,
  body5: 13,
  body6: 12,

  // app dimensions
  width,
  height,
};