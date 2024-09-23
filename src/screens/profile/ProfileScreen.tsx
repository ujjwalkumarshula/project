import React, { useMemo } from "react";
import { Image, ScrollView, View } from "react-native";
import createStyles from "./ProfileScreen.style";
import { useTheme } from "@react-navigation/native";
import Text from "@shared-components/text-wrapper/TextWrapper";
import { SafeAreaView } from "react-native-safe-area-context";
import { CommonButton } from "@screens/common/button/CommonButton";
import RNBounceable from "@freakycoder/react-native-bounceable";
import Icon, { IconType } from "react-native-dynamic-vector-icons";
import { ScreenWidth } from "@freakycoder/react-native-helpers";
import { useAuth } from "context/AuthContext";

const profileURI =
  "https://images.unsplash.com/photo-1639747280804-dd2d6b3d88ac?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const ProfileScreen: React.FC = () => {
  const { logout } = useAuth();
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  const logoutApp = async () => {
    logout()
  };

  const renderArrowButton = () => (
    <RNBounceable>
      <View>
        <Icon
          name="chevron-forward-outline"
          type={IconType.Ionicons}
          color={colors.iconBlack}
          style={styles.dotIcon}
        />
      </View>
    </RNBounceable>
  );

  const renderProfileButton = () => (
    <RNBounceable>
      <View>
        <Icon
          name="person-outline"
          type={IconType.Ionicons}
          color={colors.iconBlack}
          style={styles.dotIcon}
        />
      </View>
    </RNBounceable>
  );

  const renderSettingButton = () => (
    <RNBounceable>
      <View>
        <Icon
          name="settings-outline"
          type={IconType.Ionicons}
          color={colors.iconBlack}
          style={styles.dotIcon}
        />
      </View>
    </RNBounceable>
  );

  const renderTermCondButton = () => (
    <RNBounceable>
      <View>
        <Icon
          name="reader-outline"
          type={IconType.Ionicons}
          color={colors.iconBlack}
          style={styles.dotIcon}
        />
      </View>
    </RNBounceable>
  );

  const renderPolicyButton = () => (
    <RNBounceable>
      <View>
        <Icon
          name="shield-checkmark-outline"
          type={IconType.Ionicons}
          color={colors.iconBlack}
          style={styles.dotIcon}
        />
      </View>
    </RNBounceable>
  );

  const renderLogoutButton = () => (
    <RNBounceable>
      <View>
        <Icon
          name="log-out-outline"
          type={IconType.Ionicons}
          color={colors.danger}
          style={styles.dotIcon}
        />
      </View>
    </RNBounceable>
  );

  const profilePicture = () => (
    <View style={styles.profileImageContainer}>
      <Image
        resizeMode="cover"
        source={{ uri: profileURI }}
        style={styles.profileImage}
      />
    </View>
  );

  const profileHeader = () => (
    <View style={styles.profileHead}>
      {profilePicture()}
      <View style={styles.profileHeaderContent}>
        <Text color={colors.titleSecond} style={styles.profileHeaderTitle}>
          Tarun Kumar Gupta
        </Text>
        <Text color={colors.title} style={styles.profileHeaderSubHead}>
          Senior Consultant
        </Text>
      </View>
      <CommonButton
        style={""}
        textColor={colors.white}
        customStyle={{ backgroundColor: colors.primary }}
        text="Edit Profile"
        iconName=""
        onPress={() => {
          // handleItemPress(false, SCREENS.ADDTEAMMEMBER);
        }}
      />
    </View>
  );

  const content = () => (
    <View style={styles.contentContainer}>
      <RNBounceable>
        <View style={styles.mainCard}>
          <View style={styles.mainCardImg}>{renderProfileButton()}</View>
          <View style={styles.mainCardContent}>
            <Text style={styles.cardTitleName} color={colors.titleSecond}>
              Profile
            </Text>
          </View>
          <View style={styles.mainCardIcon}>{renderArrowButton()}</View>
        </View>
        <View style={styles.lineHR} />
      </RNBounceable>
      <RNBounceable>
        <View style={styles.mainCard}>
          <View style={styles.mainCardImg}>{renderSettingButton()}</View>
          <View style={styles.mainCardContent}>
            <Text style={styles.cardTitleName} color={colors.titleSecond}>
              Setting
            </Text>
          </View>
          <View style={styles.mainCardIcon}>{renderArrowButton()}</View>
        </View>
        <View style={styles.lineHR} />
      </RNBounceable>
      <RNBounceable>
        <View style={styles.mainCard}>
          <View style={styles.mainCardImg}>{renderTermCondButton()}</View>
          <View style={styles.mainCardContent}>
            <Text style={styles.cardTitleName} color={colors.titleSecond}>
              Terms & Condition
            </Text>
          </View>
          <View style={styles.mainCardIcon}>{renderArrowButton()}</View>
        </View>
        <View style={styles.lineHR} />
      </RNBounceable>
      <RNBounceable>
        <View style={styles.mainCard}>
          <View style={styles.mainCardImg}>{renderPolicyButton()}</View>
          <View style={styles.mainCardContent}>
            <Text style={styles.cardTitleName} color={colors.titleSecond}>
              Privacy Policy
            </Text>
          </View>
          <View style={styles.mainCardIcon}>{renderArrowButton()}</View>
        </View>
        <View style={styles.lineHR} />
      </RNBounceable>
      <RNBounceable onPress={logoutApp}>
        <View style={styles.mainCard}>
          <View style={styles.mainCardImgLogout}>{renderLogoutButton()}</View>
          <View style={styles.mainCardContentLogout}>
            <Text style={[styles.cardTitleName]} color={colors.danger}>
              Log Out
            </Text>
          </View>
        </View>
      </RNBounceable>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {profileHeader()}
      <ScrollView>{content()}</ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
