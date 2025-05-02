import {
  View,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as Clipboard from "expo-clipboard";

import { Cancel, Copy } from "@/src/assets/images/svgs";
import { CustomText } from "@/src/components/customText";
import { Colors } from "@/src/utils/colors";
import { moderateScale } from "@/src/utils/helper";
import { TextConstants } from "@/src/utils/textConstants";
import { Wrapper } from "@/src/components/wrapper";
import { PNGImages } from "@/src/assets/images";

export default function OutputScreen() {
  const router = useRouter();
  const { prompt, generatedImage, logoStyle } = useLocalSearchParams();

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(prompt);
    alert("Text copied to clipboard!");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Wrapper>
          <View style={styles.wrapper}>
            <View style={styles.header}>
              <CustomText
                color={Colors.White}
                weight="800"
                style={styles.headerTitle}
              >
                {TextConstants.Your_Design}
              </CustomText>
              <TouchableOpacity onPress={() => router.back()}>
                <Cancel />
              </TouchableOpacity>
            </View>
            <Image
              source={
                generatedImage
                  ? {
                      uri: generatedImage,
                    }
                  : PNGImages.GeneratedImage
              }
              style={styles.generatedImage}
            />
            <View style={styles.details}>
              <View style={styles.detailsHeader}>
                <CustomText
                  color={Colors.White}
                  weight="700"
                  style={styles.promptText}
                >
                  {TextConstants.Prompt}
                </CustomText>
                <TouchableOpacity
                  style={styles.rightContainer}
                  onPress={() => copyToClipboard()}
                >
                  <Copy />
                  <CustomText
                    color={Colors.QuickSilver}
                    weight="regular"
                    style={styles.copyText}
                  >
                    {TextConstants.Copy}
                  </CustomText>
                </TouchableOpacity>
              </View>
              <CustomText
                color={Colors.White}
                weight="regular"
                style={styles.promptDescription}
              >
                {prompt ? prompt : TextConstants.Default_Prompt_Text}
              </CustomText>
              <View style={styles.detailsFooter}>
                <CustomText
                  color={Colors.White}
                  weight="regular"
                  style={styles.footerText}
                >
                  {logoStyle}
                </CustomText>
              </View>
            </View>
          </View>
        </Wrapper>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Black,
    height: "100%",
  },
  scrollView: {
    flex: 1,
  },
  wrapper: {
    padding: moderateScale(24),
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: moderateScale(16),
  },
  headerTitle: {
    fontSize: moderateScale(22),
  },
  generatedImage: {
    height: moderateScale(342),
    width: "100%",
  },
  details: {
    backgroundColor: Colors.RaisinBlack,
    marginTop: moderateScale(24),
    padding: moderateScale(12),
    borderRadius: moderateScale(12),
  },
  detailsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  promptText: {
    fontSize: moderateScale(15),
  },
  rightContainer: {
    flexDirection: "row",
  },
  copyText: {
    fontSize: moderateScale(11),
    marginLeft: 6,
  },
  promptDescription: {
    fontSize: moderateScale(16),
    marginVertical: moderateScale(12),
  },
  detailsFooter: {
    width: moderateScale(76),
    height: moderateScale(24),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: moderateScale(50),
    backgroundColor: Colors.ShadowGray,
  },
  footerText: {
    fontSize: moderateScale(12),
  },
});
