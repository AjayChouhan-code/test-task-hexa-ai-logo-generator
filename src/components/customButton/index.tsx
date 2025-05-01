import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import React from "react";
import { moderateScale } from "@/src/utils/helper";
import { Colors } from "@/src/utils/colors";
import { Loader } from "../loader";
import { CustomText } from "../customText";
import { LinearGradient } from "expo-linear-gradient";

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  text: string;
  prefix?: JSX.Element;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  weight?: "regular" | "500" | "600" | "700" | "800";
  color?: string;
};

export const CustomButton = ({
  containerStyle,
  textStyle,
  text,
  prefix,
  onPress,
  disabled,
  loading,
  weight,
  color,
}: Props) => {
  return (
    <LinearGradient
      colors={[Colors.PersianBlue, Colors.Veronica]}
      style={[styles.container, containerStyle]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
        disabled={disabled}
      >
        {loading ? (
          <Loader color={Colors.Black} size="small" />
        ) : (
          <CustomText
            style={[styles.text, textStyle]}
            weight={weight}
            color={color}
          >
            {text}
          </CustomText>
        )}
        {prefix}
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    borderRadius: moderateScale(100),
    height: moderateScale(56),
  },
  text: {
    fontSize: moderateScale(16),
  },
  button : {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  }
});
