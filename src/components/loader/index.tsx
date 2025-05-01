import { ActivityIndicator } from "react-native";
import React from "react";
import { Colors } from "react-native/Libraries/NewAppScreen";

type Props = {
  size: "large" | "small";
  color: string;
};

export const Loader = ({ size = "small", color = Colors.White }: Props) => {
  return <ActivityIndicator size={size} color={color} />;
};
