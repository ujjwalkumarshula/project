import React from "react";
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { PhotoIdentifier } from "@react-native-camera-roll/camera-roll";
import { PhotoFile, VideoFile } from "react-native-vision-camera";

interface MediaProps {
  index?: number;
  item: PhotoIdentifier;
  themeColor: string;
  onPressItem: (obj: PhotoFile | VideoFile | PhotoIdentifier) => void;
  videoContainerStyle?: StyleProp<ViewStyle>;
  videoIconStyle?: StyleProp<ImageStyle>;
  videoIcon?: ImageSourcePropType;
  renderVideoComponent?: () => React.ReactComponentElement<any>;
}

const Media = (MediaProps: MediaProps) => {
  const {
    item,
    index,
    themeColor,
    onPressItem,
    videoContainerStyle,
    videoIconStyle,
    videoIcon,
    renderVideoComponent,
  } = MediaProps;
  const { imageStyle, isVideoStyle, videoIconStyles } = styles;
  const isVideo = item.node.type.split("/")?.[0] === "video";

  const renderVideo = () => {
    if (!isVideo) {
      return null;
    } else {
      return (
        <>
          {(renderVideoComponent !== undefined && renderVideoComponent()) || (
              <View style={[isVideoStyle, videoContainerStyle]}>
                <Image
                  source={videoIcon ?? require("@assets/images/camera/video.png")}
                  style={[videoIconStyles, videoIconStyle]}
                />
              </View>
            ) ||
            null}
        </>
      );
    }
  };

  return (
    <Pressable style={styles.center} onPress={() => onPressItem(item)}>
      <Image
        source={{ uri: item.node.image.uri }}
        style={[
          imageStyle,
          {
            borderWidth: (index! >= 0 && 1) || 0,
            borderColor: themeColor,
          },
        ]}
      />
      {renderVideo()}
    </Pressable>
  );
};

export { Media };

const styles = StyleSheet.create({
  imageStyle: {
    height: 80,
    width: 80,
    margin: 2,
  },
  isVideoStyle: {
    position: "absolute",
    alignSelf: "center",
    padding: 5,
    borderRadius: 20,
    backgroundColor: "#ffffff90",
  },
  center: { justifyContent: "center", alignItems: "center" },
  videoIconStyles: { height: 20, width: 20 },
});