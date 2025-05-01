import React from "react";
import { Text, StyleSheet, StyleProp, TextStyle } from "react-native";

import { Colors } from "@/src/utils/colors";

type Props = {
  children: any;
  style?: StyleProp<TextStyle>;
  weight?: "regular" | "500" | "600" | "700" | "800";
  color?: string;
  numOfLines?: number;
};

export const CustomText = ({
  children,
  style,
  weight,
  color,
  numOfLines,
}: Props) => {
  const getFontFamily = (weight?: Props["weight"]) => {
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

  return (
    <Text
      style={[
        styles.textStyle,
        { fontFamily: getFontFamily(weight), color: color ?? Colors.Black },
        style,
      ]}
      numberOfLines={numOfLines}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontFamily: "ManropeRegular",
  },
});
