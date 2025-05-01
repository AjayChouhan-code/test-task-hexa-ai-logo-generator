import {
  View,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";

import { Cancel, Copy } from "@/assets/images/svgs";
import { CustomText } from "@/src/components/customText";
import { Colors } from "@/src/utils/colors";
import { moderateScale } from "@/src/utils/helper";
import { TextFile } from "@/src/utils/textFile";
import { Wrapper } from "@/src/components/wrapper";

export default function AboutScreen() {
  const router = useRouter();
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
                {TextFile.Your_Design}
              </CustomText>
              <TouchableOpacity onPress={() => router.back()}>
                <Cancel />
              </TouchableOpacity>
            </View>
            <Image
              source={{
                uri: "data:image/png;base64,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",
              }}
              style={styles.generatedImage}
            />
            <View style={styles.details}>
              <View style={styles.detailsHeader}>
                <CustomText
                  color={Colors.White}
                  weight="700"
                  style={styles.promptText}
                >
                  {TextFile.Prompt}
                </CustomText>
                <TouchableOpacity style={styles.rightContainer}>
                  <Copy />
                  <CustomText
                    color={Colors.QuickSilver}
                    weight="regular"
                    style={styles.copyText}
                  >
                    {TextFile.Copy}
                  </CustomText>
                </TouchableOpacity>
              </View>
              <CustomText
                color={Colors.White}
                weight="regular"
                style={styles.promptDescription}
              >
                A professional logo for Harrison & Co. Law Firm, using balanced
                serif fonts
              </CustomText>
              <View style={styles.detailsFooter}>
                <CustomText
                  color={Colors.White}
                  weight="regular"
                  style={styles.footerText}
                >
                  Monogram
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
    padding: moderateScale(24)
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
