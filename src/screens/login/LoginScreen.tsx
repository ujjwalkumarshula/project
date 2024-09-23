import React, { useMemo, useRef, useState, useEffect } from "react";
import {
  BackHandler,
  Image,
  Keyboard,
  Modal,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@react-navigation/native";
import Text from "@shared-components/text-wrapper/TextWrapper";
import createStyles from "./LoginScreen.style";
import LottieView from "lottie-react-native";
import {
  requestCameraPermission,
  requestLocationPermission,
} from "@services/event-emitter/permission";
import CameraCapture from "@shared-components/camera/CameraCapture";
import { postApi } from "@services/api.service";
import { useAuth } from "context/AuthContext";

const LoginScreen: React.FC = () => {
  const { login } = useAuth();

  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  // common
  const [focusedInput, setFocusedInput] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [error, setError] = useState(null);

  // form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  // Camera
  const [isActiveCamera, setIsActiveCamera] = useState(false);
  const [imageSource, setImageSource] = useState("");

  //  ref
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleFocus = (inputName: string) => {
    setFocusedInput(inputName);
  };

  const handleBlur = () => {
    setFocusedInput("");
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleNext = () => {
    passwordRef?.current.focus();
  };

  const validateForm = () => {
    let errors = {
      email: email,
      password: password,
    };

    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    if (!emailRegex.test(email)) {
      errors.email = "Email is invalid.";
      setIsFormValid(false);
      return false;
    }

    if (password.length < 4) {
      errors.password = "Password must be at least 6 characters.";
      setIsFormValid(false);
      return false;
    }

    setIsFormValid(true);
    return true;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const data = {
          username: email,
          password: password,
        };
        const result: any = await postApi("/employee-login", data);
        console.log(result);
        if (result?.status === false) {
          setErrorModalVisible(true);
        } else {
          setErrorModalVisible(false);
          login(result);
        }

        // setModalVisible(true);
      } catch (err: any) {
        setError(err);
      }
    }
  };

  const handlePermission = async () => {
    if (
      (await requestCameraPermission()) &&
      (await requestLocationPermission())
    ) {
      setIsActiveCamera(true);
      setModalVisible(false);
      console.log("tarun");
    } else {
      setIsActiveCamera(false);
    }
  };

  useEffect(() => {
    const backAction = () => {
      setIsActiveCamera(false);
      BackHandler.exitApp();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const renderContent = () => (
    <View
      style={styles.contentContainer}
      onTouchStart={() => {
        dismissKeyboard();
      }}
    >
      <View style={styles.logo}>
        <Image
          resizeMode="contain"
          source={require("/assets/logo.png")}
          style={styles.logoSize}
        />
      </View>
      <View style={styles.headingContainer}>
        <Text style={styles.heading} color={colors.black} bold>
          Welcome Back 👋 to{" "}
          <Text color={colors.primary} bold>
            HR Attendee
          </Text>
        </Text>
        <Text style={styles.subHeading} color={colors.subtitle}>
          Hello there, login to continue
        </Text>
      </View>
    </View>
  );

  const renderForm = () => (
    <View style={styles.formContainer}>
      <View style={styles.inputField}>
        <Text style={styles.inputLabel}>Email Address</Text>
        <TextInput
          value={email}
          style={[
            styles.input,
            focusedInput === "email" ? styles.focusInput : styles.blurInput,
          ]}
          ref={emailRef}
          autoComplete="off"
          autoCapitalize="none"
          inputMode="email"
          enterKeyHint="next"
          keyboardType="email-address"
          placeholder="example@white-force.com"
          placeholderTextColor={colors.subtitle}
          returnKeyType="next"
          onSubmitEditing={() => handleNext()}
          onFocus={() => {
            handleFocus("email");
          }}
          onBlur={() => {
            handleBlur();
          }}
          onChangeText={(text: any) => {
            setEmail(text);
            validateForm();
          }}
        />
      </View>
      <View style={styles.inputField}>
        <Text style={styles.inputLabel}>Password</Text>
        <TextInput
          value={password}
          style={[
            styles.input,
            focusedInput === "password" ? styles.focusInput : styles.blurInput,
          ]}
          ref={passwordRef}
          autoComplete="off"
          autoCapitalize="none"
          secureTextEntry={true}
          inputMode="text"
          placeholder="*******"
          placeholderTextColor={colors.subtitle}
          onFocus={() => {
            handleFocus("password");
          }}
          onBlur={() => {
            handleBlur();
          }}
          onChangeText={(text: any) => {
            setPassword(text);
            validateForm();
          }}
        />
      </View>
      <View
        style={styles.forgetPass}
        onTouchStart={() => {
          dismissKeyboard();
        }}
      >
        <Text color={colors.primary} style={styles.forgetPassText}>
          Forget Password ?
        </Text>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => {
            handleSubmit();
            Keyboard.dismiss();
          }}
        >
          <View style={[styles.button, { opacity: isFormValid ? 1 : 0.5 }]}>
            <Text style={styles.buttonText} color={colors.white}>
              Login
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderCamera = () => (
    <View>
      {isActiveCamera ? (
        <View style={styles.cameraContainer}>
          <CameraCapture
            isActive={isActiveCamera}
            style={styles}
            setIsActiveCamera={setIsActiveCamera}
            setImageSource={setImageSource}
            setModalVisible={setModalVisible}
          ></CameraCapture>
        </View>
      ) : null}
      {/* {imageSource !== "" ? (
        <View style={styles.camImageContainer}>
          <Image
            style={styles.camImage}
            source={{
              uri: `file://'${imageSource}`,
            }}
          />
          <View style={styles.camBackButton}>
            <TouchableOpacity
              style={{
                backgroundColor: "rgba(0,0,0,0.2)",
                padding: 10,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
                borderWidth: 2,
                borderColor: "#fff",
                width: 100,
              }}
              onPress={() => setIsActiveCamera(true)}
            >
              <Text style={{ color: "white", fontWeight: "500" }}>Back</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.camButtonContainer}>
            <View style={styles.camButtons}>
              <TouchableOpacity
                style={{
                  backgroundColor: "#77c3ec",
                  padding: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: "white",
                }}
                onPress={() => setIsActiveCamera(true)}
              >
                <Text style={{ color: "white", fontWeight: "500" }}>Use Photo</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : null} */}
    </View>
  );

  const renderContainer = () => (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderContent()}
        {renderForm()}
      </ScrollView>
    </View>
  );

  return (
    <>
      {renderCamera()}
      <SafeAreaView style={styles.container}>
        {renderContainer()}
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.modalImageContainer}>
                <LottieView
                  loop
                  autoPlay
                  source={require("/assets/gif/face-recognition.json")}
                  style={styles.modalImage}
                />
              </View>
              <View style={styles.modalHeadingContainer}>
                <Text style={styles.modalHeading} color={colors.black} bold>
                  Logged In{" "}
                  <Text color={colors.success} bold>
                    Successfully
                  </Text>
                </Text>
                <Text style={styles.modalSubHeading} color={colors.subtitle}>
                  Please register your face to continue {"\n"} and put your
                  attendance.
                </Text>
              </View>
              <View style={styles.modalButtonContainer}>
                <TouchableOpacity
                  onPress={() => {
                    handlePermission();
                    Keyboard.dismiss();
                  }}
                >
                  <View style={[styles.modalButton]}>
                    <Text style={styles.buttonText} color={colors.white}>
                      Register Face
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={errorModalVisible}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.modalImageContainer}>
                <LottieView
                  loop
                  autoPlay
                  source={require("/assets/gif/error.json")}
                  style={styles.modalImage}
                />
              </View>
              <View style={styles.modalHeadingContainer}>
                <Text style={styles.modalHeading} color={colors.black} bold>
                  <Text color={colors.danger} bold>
                    Error
                  </Text>
                </Text>
                <Text style={styles.modalSubHeading} color={colors.subtitle}>
                  Please check your Email Id or Password!
                </Text>
              </View>
              <View style={styles.modalButtonContainer}>
                <TouchableOpacity
                  onPress={() => {
                    setErrorModalVisible(false);
                  }}
                >
                  <View style={[styles.modalButton]}>
                    <Text style={styles.buttonText} color={colors.white}>
                      Okay
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </>
  );
};

export default LoginScreen;
