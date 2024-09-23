import React, { useMemo } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import createStyles from "../OnboardingScreen.style";
import { useTheme } from "@react-navigation/native";
import Text from "@shared-components/text-wrapper/TextWrapper";
import { AnimatedRef, SharedValue } from "react-native-reanimated";
import { OnboardingData } from "data/data";
import {
  requestCalendarPermission,
  requestCameraPermission,
  requestLocationPermission,
} from "@services/event-emitter/permission";
import { SCREENS } from "@shared-constants";
import * as NavigationService from "react-navigation-helpers";
import { useAuth } from "context/AuthContext";

type Props = {
  dataLength: number;
  flatListIndex: SharedValue<number>;
  flatListRef: AnimatedRef<FlatList<OnboardingData>>;
  // x: SharedValue<number>;
};

export const CustomButton = ({
  dataLength,
  flatListIndex,
  flatListRef,
  // x,
}: Props) => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { setOnboard } = useAuth();

  const handlePermission = async () => {
    if (
      (await requestCameraPermission()) &&
      (await requestLocationPermission()) &&
      (await requestCalendarPermission())
    ) {
      setOnboard(true)
      NavigationService.push(SCREENS.LOGIN);
    } else {
      NavigationService.push(SCREENS.LOGIN);
    }
  };

  const renderContent = () => (
    <TouchableOpacity
      onPress={async () => {
        if (flatListIndex?.value < dataLength - 1) {
          flatListRef.current?.scrollToIndex({
            index: flatListIndex.value + 1,
          });
        } else {
          handlePermission();
        }
      }}
    >
      <View style={styles.button}>
        <Text h4 color={colors.white}>
          Next
        </Text>
      </View>
    </TouchableOpacity>
  );

  return <View>{renderContent()}</View>;
};
