import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { ScreenHeight, ScreenWidth } from "@freakycoder/react-native-helpers";
import { ExtendedTheme } from "@react-navigation/native";
import fonts from "@fonts";

interface Style {
  container: ViewStyle;
  contentContainer: ViewStyle;
  formContainer: ViewStyle;
  logo: ViewStyle;
  logoSize: ImageStyle;
  headingContainer: ViewStyle;
  heading: TextStyle;
  inputField: ViewStyle;
  subHeading: TextStyle;
  input: TextStyle;
  inputLabel: TextStyle;
  focusInput: ViewStyle;
  blurInput: ViewStyle;
  button: ViewStyle;
  buttonText: TextStyle;
  disabledButton: ViewStyle;
  forgetPass: ViewStyle;
  forgetPassText: TextStyle;
  modalContainer: ViewStyle;
  modalContent: ViewStyle;
  modalImageContainer: ViewStyle;
  modalImage: ImageStyle;
  modalHeading: TextStyle;
  modalHeadingContainer: ViewStyle;
  modalSubHeading: TextStyle;
  modalButtonContainer: ViewStyle;
  modalButton: ViewStyle;
  cameraContainer: ViewStyle;
  camera: ViewStyle;
  buttonContainer: ViewStyle;

  camImageContainer: ViewStyle;
  camImage: ImageStyle;
  camButton: ViewStyle;
  camBackButton: ViewStyle;
  camButtonContainer: ViewStyle;
  camButtons: ViewStyle;
}

export default (theme: ExtendedTheme) => {
  const { colors } = theme;
  return StyleSheet.create<Style>({
    container: {
      flex: 1,
      alignItems: "flex-start",
      backgroundColor: colors.white,
      padding: ScreenWidth * 0.06,
    },

    contentContainer: {},

    logo: {
      width: ScreenWidth * 0.2,
      height: ScreenWidth * 0.2,
    },

    logoSize: {
      width: ScreenWidth * 0.2,
      height: ScreenWidth * 0.2,
    },

    headingContainer: {
      marginTop: ScreenWidth * 0.06,
      width: ScreenWidth * 0.7,
    },

    heading: {
      fontFamily: fonts.lexend.medium,
      fontSize: ScreenWidth * 0.08,
      letterSpacing: 0.6,
    },

    subHeading: {
      marginTop: ScreenWidth * 0.02,
      letterSpacing: 0.4,
      fontSize: ScreenWidth * 0.036,
    },

    formContainer: {
      marginTop: ScreenWidth * 0.06,
    },

    inputField: {
      position: "relative",
      marginBottom: ScreenWidth * 0.04,
    },

    inputLabel: {
      position: "absolute",
      left: 0,
      paddingHorizontal: ScreenWidth * 0.04,
      paddingVertical: ScreenWidth * 0.03,
      fontSize: ScreenWidth * 0.028,
    },

    input: {
      margin: 0,
      width: ScreenWidth * 0.88,
      // height: ScreenWidth * 0.14,
      borderWidth: ScreenWidth * 0.003,
      borderRadius: ScreenWidth * 0.028,
      fontSize: ScreenWidth * 0.038,
      paddingHorizontal: ScreenWidth * 0.04,
      paddingTop: ScreenWidth * 0.062,
      zIndex: 99,
    },

    blurInput: {
      borderColor: colors.black,
    },

    focusInput: {
      borderColor: colors.primary,
    },
    validInput: {},
    invalidInput: {},

    button: {
      // marginTop: 30,
      backgroundColor: colors.primary,
      paddingVertical: ScreenWidth * 0.04,
      paddingHorizontal: ScreenWidth * 0.06,
      borderRadius: 10,
      alignItems: "center",
    },

    buttonText: {
      fontSize: ScreenWidth * 0.042,
    },
    disabledButton: {
      backgroundColor: colors.primary,
      paddingVertical: ScreenWidth * 0.04,
      paddingHorizontal: ScreenWidth * 0.06,
      borderRadius: 10,
      alignItems: "center",
      opacity: 0.6,
    },

    forgetPass: {
      alignItems: "flex-end",
      marginBottom: ScreenWidth * 0.06,
    },

    forgetPassText: {
      fontSize: ScreenWidth * 0.034,
    },

    modalContainer: {
      width: ScreenWidth,
      height: ScreenHeight,
      backgroundColor: colors.blackOverlay,
      flex: 1,
      alignItems: "center",
      justifyContent: "flex-end",
    },

    modalContent: {
      backgroundColor: colors.white,
      width: ScreenWidth,
      height: ScreenHeight * 0.44,
      borderTopLeftRadius: ScreenWidth * 0.06,
      borderTopRightRadius: ScreenWidth * 0.06,
      alignItems: "center",
      justifyContent: "center",
    },

    modalImageContainer: {
      width: ScreenWidth * 0.3,
      height: ScreenWidth * 0.3,
      backgroundColor: colors.lightGray,
      borderRadius: 100,
    },

    modalImage: {
      width: ScreenWidth * 0.3,
      height: ScreenWidth * 0.3,
      borderRadius: 100,
      flex: 1,
    },

    modalHeading: {
      fontFamily: fonts.lexend.medium,
      fontSize: ScreenWidth * 0.06,
      letterSpacing: 0.6,
    },

    modalHeadingContainer: {
      marginTop: ScreenWidth * 0.06,
      width: ScreenWidth,
      alignContent: "center",
      alignItems: "center",
    },

    modalSubHeading: {
      marginTop: ScreenWidth * 0.02,
      letterSpacing: 0.4,
      fontSize: ScreenWidth * 0.036,
      alignItems: "center",
      textAlign: "center",
    },

    modalButtonContainer: {
      marginTop: ScreenWidth * 0.06,
    },

    modalButton: {
      width: ScreenWidth * 0.8,
      backgroundColor: colors.primary,
      paddingVertical: ScreenWidth * 0.04,
      paddingHorizontal: ScreenWidth * 0.06,
      borderRadius: 10,
      alignItems: "center",
    },

    camera: {
      position: "absolute",
      width: ScreenWidth,
      height: ScreenHeight,
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
    },

    buttonContainer: {
      backgroundColor: "rgba(0,0,0,0.2)",
      position: "absolute",
      justifyContent: "center",
      alignItems: "center",
      width: ScreenWidth,
      bottom: ScreenHeight * 0.02,
      padding: 20,
      zIndex: 9999,
    },

    camButton: {
      height: 80,
      width: 80,
      borderRadius: 40,
      //ADD backgroundColor COLOR GREY
      backgroundColor: "#B2BEB5",

      alignSelf: "center",
      borderWidth: 4,
      borderColor: "white",
      zIndex: 9999,
    },

    cameraContainer: {
      position: "absolute",
      top: 0,
      right: 0,
      width: ScreenWidth,
      height: ScreenHeight,
      zIndex: 9,
    },

    camBackButton: {
      backgroundColor: "rgba(0,0,0,0.0)",
      position: "absolute",
      justifyContent: "center",
      width: ScreenWidth,
      top: 0,
      padding: 20,
    },
    camButtonContainer: {
      backgroundColor: "rgba(0,0,0,0.2)",
      position: "absolute",
      justifyContent: "center",
      alignItems: "center",
      width: ScreenWidth,
      bottom: 0,
      padding: 20,
    },
    camButtons: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: ScreenWidth,
    },

    camImageContainer: {
      position: "relative",
      flex: 1,
      width: ScreenWidth,
      height: ScreenHeight,
      aspectRatio: 9 / 16,
      zIndex: 99,
    },

    camImage: {
      width: ScreenWidth,
      height: ScreenHeight,
      aspectRatio: 9 / 16,
    },
  });
};
