import React from "react";
import { StyleSheet, ImageBackground } from "react-native";

type Props = {
  children: any;
};

export const Wrapper = ({ children }: Props) => {
  return (
    <ImageBackground
      source={require("../../../assets/images/backGradient.png")}
      style={styles.imageBackground}
    >
      {children}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    height: "100%",
  },
});
