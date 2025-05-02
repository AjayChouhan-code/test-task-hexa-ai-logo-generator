import { useEffect } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Stack } from "expo-router";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    ManropeBold: require("../src/assets/fonts/Manrope-Bold.ttf"),
    ManropeExtraBold: require("../src/assets/fonts/Manrope-ExtraBold.ttf"),
    ManropeMedium: require("../src/assets/fonts/Manrope-Medium.ttf"),
    ManropeRegular: require("../src/assets/fonts/Manrope-Regular.ttf"),
    ManropeSemiBold: require("../src/assets/fonts/Manrope-SemiBold.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "Home", headerShown: false }}
      />
      <Stack.Screen
        name="outputScreen"
        options={{ title: "Output", headerShown: false }}
      />
    </Stack>
  );
}
