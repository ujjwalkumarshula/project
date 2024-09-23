import React from "react";
import { StyleSheet, View, useColorScheme } from "react-native";
import Icon, { IconType } from "react-native-dynamic-vector-icons";
import { isReadyRef, navigationRef } from "react-navigation-helpers";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// ? Screens
import HomeScreen from "@screens/home/HomeScreen";
// import TeamScreen from "@screens/team/TeamScreen";
import ProfileScreen from "@screens/profile/ProfileScreen";
// import LeaveScreen from "@screens/leaves/LeaveScreen";
import DetailScreen from "@screens/leavedetail/LeaveDetailScreen";
// import { useTheme } from "@react-navigation/native";

/**
 * ? Local & Shared Imports
 */
import { SCREENS } from "@shared-constants";
import { LightTheme, palette } from "@theme/themes";
import { ScreenHeight, ScreenWidth } from "@freakycoder/react-native-helpers";
// import { FadeOutDown } from "react-native-reanimated";
import TaskScreen from "@screens/task/TaskScreen";
// import { DarkTheme, LightTheme, palette } from "@theme/themes";
import LoginScreen from "@screens/login/LoginScreen";
import OnboardingScreen from "@screens/obboarding/OnboardingScreen";
import TeamMemberDetailScreen from "@screens/teamMemberDetail/TeamMemberDetailScreen";
import AddTeamMemberScreen from "@screens/addteammember/AddTeamMemberScreen";
import { useAuth } from "context/AuthContext";
import AddTaskScreen from "@screens/addTask/AddTaskScreen";

// ? If you want to use stack or tab or both
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Navigation = () => {
  const { isLoggedIn, isOnboarded } = useAuth();

  const scheme = useColorScheme();
  const isDarkMode = scheme === "dark";
  // const theme = useTheme();
  // const { colors } = theme;

  const horizontalAnimation = {
    cardStyleInterpolator: ({ current, layouts }: any) => {
      return {
        cardStyle: {
          transform: [
            {
              translateX: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [layouts.screen.width, 0],
              }),
            },
          ],
        },
      };
    },
  };

  React.useEffect((): any => {
    return () => (isReadyRef.current = false);
  }, []);

  const renderTabIcon = (
    route: any,
    focused: boolean,
    color: string,
    size: number
  ) => {
    let iconName = "home";
    switch (route.name) {
      case SCREENS.HOME:
        iconName = focused ? "home" : "home-outline";
        break;
      case SCREENS.NOTIFICATION:
        iconName = focused ? "notifications" : "notifications-outline";
        break;
      case SCREENS.LEAVE:
        iconName = focused ? "calendar" : "calendar-outline";
        break;
      case SCREENS.TEAM:
        iconName = focused ? "people" : "people-outline";
        break;
      case SCREENS.TASK:
        iconName = focused ? "receipt" : "receipt-outline";
        break;
      case SCREENS.PROFILE:
        iconName = focused ? "person" : "person-outline";
        break;
      default:
        iconName = focused ? "home" : "home-outline";
        break;
    }
    // if (route.name != "Team") {
    return (
      <>
        <View style={[focused ? styles.isActiveLine : ""]}></View>
        <View style={[focused ? styles.isActive : ""]}></View>
        <Icon
          name={iconName}
          type={IconType.Ionicons}
          size={size}
          color={color}
          style={{ zIndex: 99, fontSize: ScreenWidth * 0.062 }}
        />
      </>
    );
    // } else {
    //   return (
    //     <>
    //       <View style={styles.taskVieewIcon}>
    //         <Icon
    //           name={iconName}
    //           type={IconType.Ionicons}
    //           size={size}
    //           style={styles.taskIcon}
    //         />
    //       </View>
    //     </>
    //   );
    // }
  };

  const TabScreenOption = { tabBarShowLabel: false };

  const renderTabNavigation = () => {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) =>
            renderTabIcon(route, focused, color, size),
          tabBarActiveTintColor: palette.primary,
          tabBarInactiveTintColor: "gray",
          tabBarStyle: {
            backgroundColor: isDarkMode ? palette.black : palette.white,
            height: ScreenHeight * 0.06,
            position: "relative",
            paddingHorizontal: ScreenWidth * 0.036,
          },
        })}
      >
        <Tab.Screen
          options={TabScreenOption}
          name={SCREENS.HOME}
          component={HomeScreen}
        />
        {/* <Tab.Screen
          options={TabScreenOption}
          name={SCREENS.LEAVE}
          component={LeaveScreen}
        />
        <Tab.Screen
          options={TabScreenOption}
          name={SCREENS.TEAM}
          component={TeamScreen}
        /> */}
        <Tab.Screen
          options={TabScreenOption}
          name={SCREENS.TASK}
          component={TaskScreen}
        />
        <Tab.Screen
          options={TabScreenOption}
          name={SCREENS.NOTIFICATION}
          component={TaskScreen}
        />
        <Tab.Screen
          options={TabScreenOption}
          name={SCREENS.PROFILE}
          component={ProfileScreen}
        />
      </Tab.Navigator>
    );
  };

  const getInitialRouteName = () => {
    console.log(isOnboarded);
    if (!isLoggedIn) {
      return SCREENS.LOGIN;
    }

    if (!isOnboarded) {
      return SCREENS.ONBOARDING;
    }
    return SCREENS.HOME;
  };

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        isReadyRef.current = true;
      }}
      // theme={isDarkMode ? DarkTheme : LightTheme}
      theme={isDarkMode ? LightTheme : LightTheme}
    >
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={getInitialRouteName()}
      >
        {isLoggedIn == false ? (
          <>
            <Stack.Screen
              name={SCREENS.LOGIN}
              component={LoginScreen}
              options={horizontalAnimation}
            />
            <Stack.Screen
              name={SCREENS.ONBOARDING}
              component={OnboardingScreen}
              options={horizontalAnimation}
            />
          </>
        ) : (
          <>
            <Stack.Screen name={SCREENS.HOME} component={renderTabNavigation} />
            <Stack.Screen
              name={SCREENS.ADDTEAMMEMBER}
              options={horizontalAnimation}
            >
              {(props) => <AddTeamMemberScreen {...props} />}
            </Stack.Screen>
            <Stack.Screen name={SCREENS.DETAIL} options={horizontalAnimation}>
              {(props) => <DetailScreen {...props} />}
            </Stack.Screen>
            <Stack.Screen
              name={SCREENS.TEAMMEMBERDETAIL}
              options={horizontalAnimation}
            >
              {(props) => <TeamMemberDetailScreen {...props} />}
            </Stack.Screen>
            <Stack.Screen name={SCREENS.ADDTASK} options={horizontalAnimation}>
              {(props) => <AddTaskScreen {...props} />}
            </Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create<any>({
  isActive: {
    position: "absolute",
    backgroundColor: "#cfe1fb",
    width: ScreenWidth * 0.12,
    height: ScreenHeight * 0.036,
    marginLeft: "auto",
    marginRight: "auto",
    top: 0,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.2,
    borderTopStartRadius: ScreenWidth * 0.04,
    borderTopEndRadius: ScreenWidth * 0.04,
    // borderBottomStartRadius: ScreenWidth * 0.2,
    // borderBottomEndRadius: ScreenWidth * 0.3,
  },

  isActiveLine: {
    position: "absolute",
    backgroundColor: "#3085FE",
    width: ScreenWidth * 0.06,
    height: ScreenHeight * 0.003,
    marginLeft: "auto",
    marginRight: "auto",
    top: 0,
    justifyContent: "center",
    alignItems: "center",
  },

  taskVieewIcon: {
    position: "absolute",
    backgroundColor: "#3085FE",
    bottom: ScreenHeight * 0.02,
    width: ScreenWidth * 0.18,
    height: ScreenWidth * 0.18,
    borderRadius: ScreenWidth * 0.5,
    borderWidth: ScreenWidth * 0.012,
    borderColor: "#f2f2f2",
    justifyContent: "center",
    alignItems: "center",
  },

  taskIcon: {
    color: "#fff",
    fontSize: ScreenWidth * 0.068,
  },
});
export default Navigation;
