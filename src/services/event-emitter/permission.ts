import { PermissionsAndroid, Platform } from "react-native";
import {
  promptForEnableLocationIfNeeded,
} from "react-native-android-location-enabler";

import {
  check,
  RESULTS,
  request,
  PermissionStatus,
  Permission,
  PERMISSIONS,
  IOSPermission,
  AndroidPermission,
} from "react-native-permissions";

export const isIOS = Platform.OS === "ios";


export const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: "Attendance App Requires Camera Permission",
        message: "Access Granted for Camera, Boosting Efficiency and Security!",
        buttonNegative: "Deny",
        buttonPositive: "Allow",
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the camera");
      return true;
    } else {
      console.log("Camera permission denied");
      return false;
    }
  } catch (err) {
    console.warn(err);
    return false;
  }
};

export const requestLocationPermission = async () => {
  try {
    const enableLocation = await promptForEnableLocationIfNeeded();
    console.log(enableLocation);
    const grantedFine = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "App Requires Fine Location Permission",
        message:
          "Access Granted for Location, Boosting Efficiency and Security!",
        buttonNegative: "Deny",
        buttonPositive: "Allow",
      }
    );

    const grantedCoarse = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      {
        title: "App Requires Coarse Location Permission",
        message:
          "Access Granted for Location, Boosting Efficiency and Security!",
        buttonNegative: "Deny",
        buttonPositive: "Allow",
      }
    );

    const grantedBack = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
      {
        title: "App Requires Background Location Permission",
        message:
          "Access Granted for Location, Boosting Efficiency and Security!",
        buttonNegative: "Deny",
        buttonPositive: "Allow",
      }
    );
    if (
      (grantedFine && grantedCoarse && grantedBack) ===
      PermissionsAndroid.RESULTS.GRANTED
    ) {
      return true;
    } else {
      console.log("Location permission denied");
      return false;
    }
  } catch (err) {
    console.warn(err);
    return false;
  }
};

export const requestCalendarPermission = async () => {
  try {
    const write_calendar = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_CALENDAR,
      {
        title: "Attendance App Requires Calendar Permission",
        message:
          "Access Granted for Calendar, Boosting Efficiency and Security!",
        buttonNegative: "Deny",
        buttonPositive: "Allow",
      }
    );
    const read_calendar = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CALENDAR,
      {
        title: "Attendance App Requires Calendar Permission",
        message:
          "Access Granted for Calendar, Boosting Efficiency and Security!",
        buttonNegative: "Deny",
        buttonPositive: "Allow",
      }
    );
    if (
      write_calendar === PermissionsAndroid.RESULTS.GRANTED &&
      read_calendar === PermissionsAndroid.RESULTS.GRANTED
    ) {
      console.log("You can use the calendar");
      return true;
    } else {
      console.log("calendar permission denied");
      return false;
    }
  } catch (err) {
    console.warn(err);
    return false;
  }
};



export const checkForPermission = async (
  permissionOf: AndroidPermission | IOSPermission
) => {
  const response = await check(permissionOf);
  switch (response) {
    case RESULTS.UNAVAILABLE:
    case RESULTS.LIMITED:
    case RESULTS.GRANTED:
    case RESULTS.BLOCKED:
      return response;
    case RESULTS.DENIED:
      return await requestForPermission(permissionOf);
  }
};

export const requestForPermission = async (permissionOf: Permission) =>
  await request(permissionOf);

export const getBooleanForPermission = (permissionStatus: PermissionStatus) => {
  if (!isIOS) {
    if (
      permissionStatus === RESULTS.GRANTED ||
      permissionStatus === RESULTS.LIMITED
    ) {
      return true;
    }
  } else {
    if (permissionStatus === RESULTS.GRANTED) {
      return true;
    }
  }
  return false;
};

export const getStorageOrLibraryPermission = async () => {
  let permission: PermissionStatus;
  if (!isIOS) {
    permission = await checkForPermission(
      PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE
    );
  } else {
    permission = await checkForPermission(PERMISSIONS.IOS.PHOTO_LIBRARY);
  }
  return getBooleanForPermission(permission);
};

export const getPhotoPermission = async () => {
  let permission: PermissionStatus;
  if (!isIOS) {
    if (Number(Platform.Version) >= 30) {
      permission = await checkForPermission(
        PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
      );
    } else {
      permission = await checkForPermission(
        PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
      );
    }
  } else {
    permission = await checkForPermission(PERMISSIONS.IOS.CAMERA);
  }
  return getBooleanForPermission(permission);
};

export const getVideoPermission = async () => {
  let permission: PermissionStatus;
  if (!isIOS) {
    if (Number(Platform.Version) >= 30) {
      permission = await checkForPermission(
        PERMISSIONS.ANDROID.READ_MEDIA_VIDEO
      );
    } else {
      permission = await checkForPermission(
        PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
      );
    }
  } else {
    permission = await checkForPermission(PERMISSIONS.IOS.CAMERA);
  }
  return getBooleanForPermission(permission);
};

export const getMicrophonePermission = async () => {
  let permission: PermissionStatus;
  if (!isIOS) {
    permission = await checkForPermission(PERMISSIONS.ANDROID.RECORD_AUDIO);
  } else {
    permission = await checkForPermission(PERMISSIONS.IOS.MICROPHONE);
  }
  return getBooleanForPermission(permission);
};

export const getCameraPermission = async () => {
  let permission: PermissionStatus;
  if (!isIOS) {
    permission = await checkForPermission(PERMISSIONS.ANDROID.CAMERA);
  } else {
    permission = await checkForPermission(PERMISSIONS.IOS.CAMERA);
  }
  return getBooleanForPermission(permission);
};