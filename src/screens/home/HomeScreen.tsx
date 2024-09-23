import React, { useEffect, useMemo, useRef, useState } from "react";
import { BackHandler, FlatList, Image, ScrollView, View } from "react-native";
import Icon, { IconType } from "react-native-dynamic-vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import createStyles from "./HomeScreen.style";
import TodayData from "./mock/TodayData";
import RNBounceable from "@freakycoder/react-native-bounceable";
import { useTheme } from "@react-navigation/native";
import Text from "@shared-components/text-wrapper/TextWrapper";
import CalendarItem from "./components/calendar-item/CalendarItem";
import TodayAttendance from "./components/today-attendance/TodayAttendance";
import ActivityData from "./mock/ActivityData";
import ActivityCard from "./components/activity-item/ActivityCard";
import SlideButton from "rn-slide-button";
import { ScreenWidth } from "@freakycoder/react-native-helpers";
import {
  requestCalendarPermission,
  requestCameraPermission,
  requestLocationPermission,
} from "@services/event-emitter/permission";
import { useAuth } from "context/AuthContext";
import { getLocationName } from "@services/global.service";
import GetLocation from "react-native-get-location";
import * as NavigationService from "react-navigation-helpers";
import { SCREENS } from "@shared-constants";
import AwesomeCamera from "@shared-components/camera/CameraCapture";

const profileURI =
  // eslint-disable-next-line max-len
  "https://images.unsplash.com/photo-1544568100-847a948585b9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2574&q=80";

const HomeScreen: React.FC = () => {
  const { userInfo } = useAuth();
  const parseData = JSON.parse(userInfo ? userInfo : {});
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  const [locationName, setLocationName] = useState(null);
  const [weekDays, setWeekDays] = useState<any>([]);
  const [addressLoading, setIsAddressLoading] = useState<any>();

  const flatListRef = useRef<any>(null);

  const [showCamera, setShowCamera] = useState<boolean>(false);
  // const [imageSource, setImageSource] = useState('');


  const [isOpen, setIsOpen] = useState(false);

  const handleSetIsOpen = (open: boolean) => {
    setIsOpen(open);
  };

  useEffect(() => {
    console.log("camera is shown", showCamera);

    setIsAddressLoading(true);
    const backAction = () => {
      // BackHandler.exitApp()
      // setIsCameraVisible(false);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    requestLocationPermission().then((res) => {
      if (res == true) {
        const options = {
          enableHighAccuracy: true,
          timeout: 60000,
          accuracy: true,
        };
        GetLocation.getCurrentPosition(options).then(async (position: any) => {
          const address = await getLocationName(
            position.latitude,
            position.longitude
          );

          setLocationName(address?.[1]?.["long_name"]);
          setIsAddressLoading(false);
        });
      }
    });

    getWeekDays();
    scrollToActiveItem();
    return () => backHandler.remove();
  }, []);

  const handlePermission = async () => {
    if (
      (await requestCameraPermission()) &&
      (await requestLocationPermission()) &&
      (await requestCalendarPermission())
    ) {
      // cam(true);
    } else {
      // setIsCameraVisible(false);
    }
  };

  const getWeekDays = () => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const today = new Date();

    // Get the first day (Sunday) of the current week
    const firstDayOfWeek = new Date(today);
    firstDayOfWeek.setDate(today.getDate() - today.getDay());

    const weekdays = [];

    for (let i = 0; i < 7; i++) {
      const currentDay = new Date(firstDayOfWeek);
      currentDay.setDate(firstDayOfWeek.getDate() + i);

      const dayName = days[currentDay.getDay()];
      const dayDate = currentDay.getDate(); // Get only the date
      const isActive = currentDay.getDay() === today.getDay(); // Mark the current weekday as active

      weekdays.push({
        date: dayDate,
        day: dayName,
        isActive: isActive || false,
      });
    }
    setWeekDays(weekdays);
  };

  const scrollToActiveItem = () => {
    const activeIndex = weekDays.findIndex((item: any) => item.isActive);
    if (activeIndex !== -1 && flatListRef.current) {
      flatListRef.current.scrollToIndex({ index: activeIndex });
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                               Render Methods                               */
  /* -------------------------------------------------------------------------- */

  const renderNotifiButton = () => (
    <RNBounceable>
      <View style={styles.notificationIconContainer}>
        <Icon
          name="notifications-outline"
          type={IconType.Ionicons}
          color={colors.iconBlack}
          style={styles.notificationIcon}
        />
      </View>
    </RNBounceable>
  );

  const renderHeader = () => (
    <>
      <View style={styles.header}>
        <View style={styles.profileDetailContainer}>
          <RNBounceable
            onPress={() => {
              NavigationService.navigate(SCREENS.PROFILE);
            }}
          >
            <Image
              resizeMode="cover"
              source={{ uri: profileURI }}
              style={styles.profilePicImageStyle}
            />
          </RNBounceable>
          <View style={styles.profileInfo}>
            <Text color={colors.titleSecond} style={styles.profileInfoTitle}>
              {/* {capitalizeEachWord()} */}
              {parseData["data"]?.name}
            </Text>
            {addressLoading == true ? (
              <Text
                color={colors.subtitleSecond}
                style={styles.profileInfoSubTitle}
              >
                Loading Address...
              </Text>
            ) : (
              <Text
                color={colors.subtitleSecond}
                style={styles.profileInfoSubTitle}
              >
                {locationName}
              </Text>
            )}
          </View>
        </View>
        {renderNotifiButton()}
      </View>
      {renderCalendarList()}
    </>
  );

  const renderCalendarList = () => (
    <View style={styles.calendarListContainer}>
      <FlatList
        ref={flatListRef}
        style={styles.calendarListFlatlist}
        horizontal
        data={weekDays}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_item, index) => index.toString()} // Use index as key
        renderItem={({ item }) => (
          <CalendarItem data={item} isActive={item.isActive} key={item.date} />
        )}
      />
    </View>
  );

  const renderTodayCards = () => (
    <View style={[styles.attendanceContent, styles.scrollViewHeight]}>
      <View style={styles.attendanceContentTotalAttSec}>
        <Text
          color={colors.titleSecond}
          style={styles.attendanceContentTotalAttTitle}
        >
          Total Attendance
        </Text>
        <View style={styles.attendanceCardsContainer}>
          {TodayData.map((data) => (
            <TodayAttendance key={data.id} data={data}></TodayAttendance>
          ))}
        </View>
      </View>
      {renderActivityCards()}
    </View>
  );

  const renderActivityCards = () => (
    <View style={styles.activityContent}>
      <View style={styles.activityContentContainer}>
        <Text
          color={colors.titleSecond}
          style={styles.attendanceContentTotalAttTitle}
        >
          Your Today's Activity
        </Text>
        <View style={styles.activityContentCardsContainer}>
          {ActivityData.map((data) => (
            <ActivityCard key={data.id} data={data}></ActivityCard>
          ))}
        </View>
      </View>
    </View>
  );

  const renderContent = () => (
    <>
      <ScrollView>{renderTodayCards()}</ScrollView>
      <View style={styles.renderContent}>
        <Text>
          <SlideButton
            width={ScreenWidth * 0.8}
            borderRadius={ScreenWidth * 0.048}
            thumbStyle={styles.slideButton}
            containerStyle={styles.slideContainer}
            autoReset={true}
            animation={true}
            icon={
              <Icon
                name="arrow-forward-outline"
                type={IconType.Ionicons}
                color={colors.primary}
                style={styles.notificationIcon}
              />
            }
            onSlideStart={() => {}}
            onSlideEnd={async () => {
              await handlePermission();
              // setIsCameraVisible(true);
              setShowCamera(true);
              handleSetIsOpen(true)
            }}
            title="Swipe to Check In"
          />
        </Text>
      </View>
    </>
  );

  return (
    <>
      <SafeAreaView style={styles.container}>
        {/* {renderCamera()} */}
        {renderHeader()}
        {renderContent()}
        {isOpen && (
        <AwesomeCamera
          setIsOpen={handleSetIsOpen}
          getData={(data) => {
            console.log(data);
          }}
        />
      )}
      </SafeAreaView>
    </>
  );
};

export default HomeScreen;
