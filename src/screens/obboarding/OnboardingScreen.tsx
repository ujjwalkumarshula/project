import React, { useMemo } from "react";
import { View, ViewToken } from "react-native";
import createStyles from "./OnboardingScreen.style";
import { useTheme } from "@react-navigation/native";
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import data, { OnboardingData } from "data/data";
import { RenderItem } from "@screens/obboarding/components/RenderItem";
import { Pagniation } from "./components/Pagniation";
import { CustomButton } from "./components/CustomButton";
import { FlatList } from "react-native";

const OnboardingScreen: React.FC = () => {
  const theme = useTheme();
  // const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  const flatListRef = useAnimatedRef<FlatList<OnboardingData>>();
  const flatListIndex = useSharedValue(0);
  const x = useSharedValue(0);
  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }) => {
    if (viewableItems[0].index != null) {
      flatListIndex.value = viewableItems[0].index;
    }
  };

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.panigationContainer}>
        <Pagniation data={data} x={x} />
      </View>
      <Animated.FlatList
        ref={flatListRef}
        onScroll={onScroll}
        data={data}
        renderItem={({ item, index }) => {
          return <RenderItem item={item} index={index} />;
        }}
        keyExtractor={(item) => item.id}
        scrollEventThrottle={16}
        horizontal={true}
        bounces={false}
        pagingEnabled={true}
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        showsHorizontalScrollIndicator={false}
        viewabilityConfig={{
          minimumViewTime: 300,
          viewAreaCoveragePercentThreshold: 10,
        }}
      />
      <View style={styles.buttonContainer}>
        <CustomButton
          flatListRef={flatListRef}
          flatListIndex={flatListIndex}
          dataLength={data.length}
          // x={x}
        />
      </View>
    </View>
  );
};

export default OnboardingScreen;
