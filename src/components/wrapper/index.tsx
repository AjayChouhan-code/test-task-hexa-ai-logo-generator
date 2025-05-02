import React from "react";
import { StyleSheet, ImageBackground } from "react-native";

import {PNGImages} from '../../assets/images'

type Props = {
  children: any;
};

export const Wrapper = ({ children }: Props) => {
  return (
    <ImageBackground
      source={PNGImages.BackGradient}
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
