import React from "react";
import { LogBox, StatusBar, View, useColorScheme } from "react-native";
import "react-native-gesture-handler";
import SplashScreen from "react-native-splash-screen";

/**
 * ? Local Imports
 */
import Navigation from "./src/navigation";
import {   
  ScreenHeight,
  ScreenWidth,
  isAndroid,
} from "@freakycoder/react-native-helpers";
import { AuthProvider } from "context/AuthContext";
import { LoaderProvider, useLoader } from "context/LoaderContext";
import LottieView from "lottie-react-native";

LogBox.ignoreAllLogs();

const App = () => {
  const scheme = useColorScheme();
  const isDarkMode = scheme === "dark";
  const { isLoading } = useLoader();
  React.useEffect(() => {
    StatusBar.setBarStyle(isDarkMode ? "light-content" : "dark-content");
    if (isAndroid) {
      StatusBar.setBackgroundColor("rgba(0,0,0,0)");
      StatusBar.setTranslucent(true);
    }

    setTimeout(() => {
      SplashScreen.hide();
    }, 750);
  }, [scheme, isDarkMode]);

  return (
    <>
      <AuthProvider>
        <Navigation />
        <LoaderProvider>
          {isLoading == true ? (
            <View>
              <LottieView
                loop
                autoPlay
                source={require("/assets/gif/loader-advance.json")}
                style={{
                  width: ScreenWidth,
                  height: ScreenHeight,
                  zIndex: 99,
                }}
              />
            </View>
          ) : (
            <></>
          )}
        </LoaderProvider>
      </AuthProvider>
    </>
  );
};

export default App;
