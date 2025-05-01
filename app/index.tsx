import { ReactElement, useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

import { Colors } from "@/src/utils/colors";
import { moderateScale } from "@/src/utils/helper";
import { CustomText } from "@/src/components/customText";
import { CustomButton } from "@/src/components/customButton";
import {
  Abstract,
  Mascot,
  Monogram,
  NoStyle,
  Spark,
  Error,
} from "../assets/images/svgs";
import { Wrapper } from "@/src/components/wrapper";
import { TextFile } from "@/src/utils/textFile";

type LogoDataProps = {
  id: number;
  logo: ReactElement;
  name: string;
};

const logoStyles: LogoDataProps[] = [
  {
    id: 1,
    logo: <NoStyle />,
    name: "No Style",
  },
  {
    id: 2,
    logo: <Monogram />,
    name: "Monogram",
  },
  {
    id: 3,
    logo: <Abstract />,
    name: "Abstract",
  },
  {
    id: 4,
    logo: <Mascot />,
    name: "Mascot",
  },
];

export default function Index() {
  const router = useRouter();

  const [prompt, setPrompt] = useState<string>("");

  const [selectedLogoStyle, setSelectedLogoStyle] = useState<number>(1);
  const [status, setStatus] = useState<string>("");

  const getLeftBoxContent = () => {
    return (
      <View
        style={[
          {
            backgroundColor:
              status === TextFile.Error
                ? Colors.NewYorkPink
                : Colors.EerieBlack,
          },
          styles.topBoxLeftContainer,
        ]}
      >
        {status === TextFile.Pending && <ActivityIndicator />}
        {status === TextFile.Completed && (
          <Image
            resizeMode="center"
            source={require("../assets/images/GenerateImage.png")}
          />
        )}
        {status === TextFile.Error && <Error />}
      </View>
    );
  };

  const getGradientColor = (): [string, string] => {
    switch (status) {
      case TextFile.Pending:
        return [Colors.RaisinBlack, Colors.RaisinBlack];
      case TextFile.Completed:
        return [Colors.PersianBlue, Colors.Veronica];
      case TextFile.Error:
        return [Colors.CoralRed, Colors.CoralRed];
      default:
        return [Colors.RaisinBlack, Colors.RaisinBlack];
    }
  };

  const getTitleText = () => {
    switch (status) {
      case TextFile.Pending:
        return TextFile.Creating_Your_Design;
      case TextFile.Completed:
        return TextFile.Your_Design_Is_Ready;
      case TextFile.Error:
        return TextFile.Something_Went_Wrong;
      default:
        break;
    }
  };

  const getSubTitleText = () => {
    switch (status) {
      case TextFile.Pending:
        return TextFile.Ready_In_Minutes;
      case TextFile.Completed:
        return TextFile.Tap_To_See_It;
      case TextFile.Error:
        return TextFile.Click_To_Try_Again;
      default:
        break;
    }
  };

  const getRightBoxContent = () => {
    const WrapperView = status === TextFile.Completed ? TouchableOpacity : View;
    return (
      <LinearGradient
        style={styles.topBoxRightContainer}
        colors={getGradientColor()}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <CustomText weight="800" style={styles.titleText} color={Colors.White}>
          {getTitleText()}
        </CustomText>
        <WrapperView onPress={() => router.push("/outputScreen")}>
          <CustomText
            weight="500"
            style={styles.subTitleText}
            color={
              status === TextFile.Pending ? Colors.DimGrey : Colors.LightGrey
            }
          >
            {getSubTitleText()}
          </CustomText>
        </WrapperView>
      </LinearGradient>
    );
  };

  const onCreateButtonPress = () => {
    setStatus(TextFile.Pending);
    setTimeout(() => {
      setStatus(TextFile.Completed);
    }, 2000);
    setTimeout(() => {
      setStatus(TextFile.Error);
    }, 5000);
  };

  const LogoStyleItem = ({ item }: { item: LogoDataProps }) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => setSelectedLogoStyle(item.id)}
      >
        <View
          style={[
            {
              borderColor: item.id === selectedLogoStyle ? Colors.White : "",
            },
            styles.logo,
          ]}
        >
          {item.logo}
        </View>

        <CustomText
          weight={item.id === selectedLogoStyle ? "700" : "regular"}
          style={styles.logoName}
          color={item.id === selectedLogoStyle ? Colors.White : Colors.DimGrey}
        >
          {item.name}
        </CustomText>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Wrapper>
        <View style={styles.header}>
          <CustomText weight="800" style={styles.headerText}>
            {TextFile.AI_Logo}
          </CustomText>
        </View>
        <View style={styles.centerContainer}>
          {status !== "" && (
            <View style={styles.processContainer}>
              {getLeftBoxContent()}
              {getRightBoxContent()}
            </View>
          )}
          <View style={styles.detailsContainer}>
            <CustomText
              weight="800"
              style={styles.promptText}
              color={Colors.White}
            >
              {TextFile.Enter_Your_Prompt}
            </CustomText>
            <View style={styles.rightContainer}>
              <Image
                style={styles.diceImage}
                source={require("../assets/images/dice.png")}
              />
              <CustomText
                weight="regular"
                style={styles.surpiseText}
                color={Colors.White}
              >
                {TextFile.Surprise_Me}
              </CustomText>
            </View>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              value={prompt}
              onChangeText={(val) => prompt?.length !== 500 && setPrompt(val)}
              placeholder={TextFile.Placeholder}
              multiline={true}
              style={styles.inputTextColor}
              placeholderTextColor={Colors.DimGrey}
            />
            <CustomText
              style={styles.testCount}
              weight="500"
              color={Colors.White}
            >
              {`${prompt.length}/500`}
            </CustomText>
          </View>
          <CustomText
            weight="800"
            style={styles.logoStylesText}
            color={Colors.White}
          >
            {TextFile.Logo_Styles}
          </CustomText>
          <FlatList
            horizontal={true}
            data={logoStyles}
            showsHorizontalScrollIndicator={false}
            style={styles.flatList}
            renderItem={({ item }) => <LogoStyleItem item={item} />}
          />
        </View>
        <CustomButton
          text={TextFile.Create}
          textStyle={styles.buttonText}
          containerStyle={styles.buttonContainer}
          color={Colors.White}
          weight="800"
          prefix={<Spark />}
          onPress={() => onCreateButtonPress()}
        />
      </Wrapper>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Black,
    height: "100%",
  },

  headerText: {
    color: Colors.White,
    alignSelf: "center",
    fontSize: moderateScale(17),
  },

  header: {
    height: moderateScale(60),
  },
  centerContainer: {
    paddingHorizontal: moderateScale(20),
  },
  processContainer: {
    flexDirection: "row",
    height: moderateScale(70),
    width: "100%",
    borderRadius: moderateScale(10),
    overflow: "hidden",
  },
  detailsContainer: {
    paddingVertical: moderateScale(12),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  promptText: {
    fontSize: moderateScale(20),
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  diceImage: {
    height: moderateScale(18),
    width: moderateScale(18),
  },
  surpiseText: {
    fontSize: moderateScale(13),
    marginLeft: moderateScale(8),
  },
  inputContainer: {
    backgroundColor: Colors.RaisinBlack,
    justifyContent: "space-between",
    height: moderateScale(175),
    padding: moderateScale(10),
    borderRadius: moderateScale(10),
    marginTop: moderateScale(12),
    marginBottom: moderateScale(24),
  },
  inputTextColor: {
    color: Colors.White,
  },
  testCount: {
    position: "absolute",
    bottom: 10,
    left: 10,
  },
  logoStylesText: {
    fontSize: moderateScale(20),
  },
  flatList: {
    marginTop: moderateScale(12),
  },
  item: {
    marginVertical: moderateScale(10),
    marginRight: moderateScale(10),
    height: 100,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    borderWidth: 2,
    borderRadius: moderateScale(16),
  },
  logoName: {
    fontSize: moderateScale(13),
    marginTop: moderateScale(6),
  },
  buttonText: {
    fontSize: moderateScale(17),
    marginRight: moderateScale(8),
  },
  buttonContainer: {
    position: "absolute",
    bottom: moderateScale(0),
  },
  topBoxLeftContainer: {
    width: "25%",
    alignItems: "center",
    justifyContent: "center",
  },
  topBoxRightContainer: {
    paddingLeft: moderateScale(12),
    justifyContent: "center",
    backgroundColor: Colors.RaisinBlack,
    width: "75%",
  },
  titleText: {
    fontSize: moderateScale(16),
  },
  subTitleText: {
    fontSize: moderateScale(13),
  },
});
