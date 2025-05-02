import React from "react";
import { ActivityIndicator } from "react-native";

import { Colors } from "@/src/utils/colors";

type Props = {
  size: "large" | "small";
  color: string;
};

export const Loader = ({ size = "small", color = Colors.White }: Props) => {
  return <ActivityIndicator size={size} color={color} />;
};
