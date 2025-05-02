import React from "react";
import { Text, StyleSheet, StyleProp, TextStyle } from "react-native";

import { Colors } from "@/src/utils/colors";
import { getFontFamily } from "@/src/utils/helper";

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
    fontFamily: getFontFamily("regular"),
  },
});
