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
import { Keyboard, TouchableWithoutFeedback } from "react-native";

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
} from "../src/assets/images/svgs";
import { Wrapper } from "@/src/components/wrapper";
import { TextConstants } from "@/src/utils/textConstants";
import {
  handleCreate,
  subscribeToStatus,
} from "@/src/firebase/firestoreService";
import { PNGImages } from "@/src/assets/images";

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

  const [selectedLogoStyle, setSelectedLogoStyle] = useState<string>(
    logoStyles[0].name
  );
  const [status, setStatus] = useState<string>("");
  const [generatedImage, setGeneratedImage] = useState<string>("");

  const getLeftBoxContent = () => {
    return (
      <View
        style={[
          {
            backgroundColor:
              status === TextConstants.Error
                ? Colors.NewYorkPink
                : Colors.EerieBlack,
          },
          styles.topBoxLeftContainer,
        ]}
      >
        {status === TextConstants.Pending && <ActivityIndicator />}
        {status === TextConstants.Completed && (
          <Image
            resizeMode="cover"
            source={
              generatedImage
                ? { uri: generatedImage }
                : PNGImages.GeneratedImage
            }
            style={{ height: "100%", width: "100%" }}
          />
        )}
        {status === TextConstants.Error && <Error />}
      </View>
    );
  };

  const getGradientColor = (): [string, string] => {
    switch (status) {
      case TextConstants.Pending:
        return [Colors.RaisinBlack, Colors.RaisinBlack];
      case TextConstants.Completed:
        return [Colors.PersianBlue, Colors.Veronica];
      case TextConstants.Error:
        return [Colors.CoralRed, Colors.CoralRed];
      default:
        return [Colors.RaisinBlack, Colors.RaisinBlack];
    }
  };

  const getTitleText = () => {
    switch (status) {
      case TextConstants.Pending:
        return TextConstants.Creating_Your_Design;
      case TextConstants.Completed:
        return TextConstants.Your_Design_Is_Ready;
      case TextConstants.Error:
        return TextConstants.Something_Went_Wrong;
      default:
        break;
    }
  };

  const getSubTitleText = () => {
    switch (status) {
      case TextConstants.Pending:
        return TextConstants.Ready_In_Minutes;
      case TextConstants.Completed:
        return TextConstants.Tap_To_See_It;
      case TextConstants.Error:
        return TextConstants.Click_To_Try_Again;
      default:
        break;
    }
  };

  const getRightBoxContent = () => {
    const WrapperView =
      status === TextConstants.Completed ? TouchableOpacity : View;
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
        <WrapperView
          onPress={() =>
            router.push({
              pathname: "/outputScreen",
              params: {
                prompt: prompt,
                generatedImage: generatedImage,
                logoStyle:  selectedLogoStyle
              },
            })
          }
        >
          <CustomText
            weight="500"
            style={styles.subTitleText}
            color={
              status === TextConstants.Pending
                ? Colors.DimGrey
                : Colors.LightGrey
            }
          >
            {getSubTitleText()}
          </CustomText>
        </WrapperView>
      </LinearGradient>
    );
  };

  const onCreateButtonPress = async () => {
    try {
      setStatus(TextConstants.Pending);
      const id = await handleCreate(prompt, selectedLogoStyle);

      const unsubscribe = subscribeToStatus(id, (newStatus, newImageUrl) => {
        setStatus(newStatus as any);
        if (newStatus === TextConstants.Completed) {
          setGeneratedImage(newImageUrl || "");
          unsubscribe();
        }
        if (newStatus === TextConstants.Error) {
          unsubscribe();
        }
      });
    } catch (error) {
      console.error("Error creating request:", error);
      setStatus(TextConstants.Error);
    }
  };

  const LogoStyleItem = ({ item }: { item: LogoDataProps }) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => setSelectedLogoStyle(item.name)}
      >
        <View
          style={[
            {
              borderColor: item.name === selectedLogoStyle ? Colors.White : "",
            },
            styles.logo,
          ]}
        >
          {item.logo}
        </View>

        <CustomText
          weight={item.name === selectedLogoStyle ? "700" : "regular"}
          style={styles.logoName}
          color={
            item.name === selectedLogoStyle ? Colors.White : Colors.DimGrey
          }
        >
          {item.name}
        </CustomText>
      </TouchableOpacity>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.container}>
        <Wrapper>
          <View style={styles.header}>
            <CustomText weight="800" style={styles.headerText}>
              {TextConstants.AI_Logo}
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
                {TextConstants.Enter_Your_Prompt}
              </CustomText>
              <View style={styles.rightContainer}>
                <Image
                  style={styles.diceImage}
                  source={PNGImages.Dice}
                />
                <CustomText
                  weight="regular"
                  style={styles.surpiseText}
                  color={Colors.White}
                >
                  {TextConstants.Surprise_Me}
                </CustomText>
              </View>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                value={prompt}
                onChangeText={(val) => {
                  prompt?.length !== 500 && setPrompt(val)
                  if(status !== "") return setStatus("")
                }}
                placeholder={TextConstants.Placeholder}
                multiline={true}
                style={styles.inputTextColor}
                placeholderTextColor={Colors.DimGrey}
                textAlignVertical={'top'}
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
              {TextConstants.Logo_Styles}
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
            text={TextConstants.Create}
            textStyle={styles.buttonText}
            containerStyle={styles.buttonContainer}
            color={Colors.White}
            weight="800"
            prefix={<Spark />}
            disabled={prompt.trim().length === 0}
            onPress={() => onCreateButtonPress()}
          />
        </Wrapper>
      </SafeAreaView>
    </TouchableWithoutFeedback>
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
    flex: 1
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
