import React, { useEffect, useMemo, useRef, useState } from "react";
import { ActivityIndicator, Keyboard, TextInput, View } from "react-native";
import createStyles from "./AddTaskScreen.style";
import { useTheme } from "@react-navigation/native";
import Text from "@shared-components/text-wrapper/TextWrapper";
import { SafeAreaView } from "react-native-safe-area-context";
// import { postApi } from "@services/api.service";
import RNBounceable from "@freakycoder/react-native-bounceable";
import Icon, { IconType } from "react-native-dynamic-vector-icons";
import { SCREENS } from "@shared-constants";
import * as NavigationService from "react-navigation-helpers";
import { CommonButton } from "@screens/common/button/CommonButton";
import { Dropdown } from "react-native-element-dropdown";
import { ScreenHeight } from "@freakycoder/react-native-helpers";
import { postApi } from "@services/api.service";

interface AddTaskcreenProps {}

const TaskScreen: React.FC<AddTaskcreenProps> = () => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  const handleItemPress = () => {
    NavigationService.navigate(SCREENS.TASK);
  };

  //  select box
  const [isFocus, setIsFocus] = useState(false);
  const [teamMembersList, setTeamMemberList] = useState<any>();
  const [loading, setLoading] = useState(true);

  // input
  const [focusedInput, setFocusedInput] = useState("");
  const [applyLeave, setCreateTask] = useState({
    task_name: "",
    is_image_required: "",
    is_feedback_required: "",
    is_visiting_card_required: "",
    created_by: "",
    client_id: "",
  });

  const leaveFormRef = {
    titleRef: useRef(null),
    leaveRef: useRef(null),
    contactNumRef: useRef(null),
    startDateRef: useRef(null),
    endDateRef: useRef(null),
    reasonRef: useRef(null),
  };

  const feedbackRequiredData = [
    { label: "0", value: "No" },
    { label: "1", value: "Yes" },
  ];

  const visitingCardRequiredData = [
    { label: "0", value: "No" },
    { label: "1", value: "Yes" },
  ];


  // let teamMembersList:any = [];

  const imageRequiredData = [
    { label: "0", value: "No" },
    { label: "1", value: "Yes" },
  ];

  const handleFocus = (inputName: string) => {
    setFocusedInput(inputName);
  };

  const handleBlur = () => {
    setFocusedInput("");
  };

  useEffect(() => {
    setLoading(false)
    // fetchUserList();
  }, []);

  const fetchUserList = async () => {
    setLoading(true);
    try {
      const data = {
        manager_id: 2,
        client_id: 5,
      };
  
      const taskResponse: any = await postApi("/manager-team", data);
      if (taskResponse?.status == true) {
        const members = taskResponse?.data
        const membersList = members.map((member:any) => {
          return {name:member.name, id: member.user_id}
        })
        setTeamMemberList(membersList)
        console.log(teamMembersList);
      } 
    } catch (error) {
      console.error('Error fetching user list:', error);
    } finally {
      setLoading(false);
    }
  };

  // const addTask = async () => {
  //   const data = {
  //     user_id: 5,
  //   };
  //   const taskResponse: any = await postApi("/assigned-task-list", data);
  //   if (taskResponse?.status == true) {
  //   }
  // };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const renderBackButton = () => (
    <RNBounceable
      onPress={() => {
        handleItemPress();
      }}
    >
      <View style={styles.addIconContainer}>
        <Icon
          name="chevron-back-outline"
          type={IconType.Ionicons}
          color={colors.iconBlack}
          style={styles.addIcon}
        />
      </View>
    </RNBounceable>
  );

  const renderHeader = () => (
    <>
      <View style={styles.header}>
        <View style={styles.iconButtonContainer}>{renderBackButton()}</View>
        <View style={styles.headerContainer}>
          <Text color={colors.titleSecond} style={styles.headerTitle}>
            Create Task
          </Text>
        </View>
      </View>
    </>
  );

  const taskCreateForm = () => (
    <View style={styles.marginTop}>
      <View style={styles.inputField}>
        <Text style={styles.inputLabel}>Task Name</Text>
        <TextInput
          value={applyLeave.task_name}
          style={[styles.input]}
          ref={leaveFormRef.titleRef}
          autoComplete="off"
          autoCapitalize="none"
          inputMode="text"
          enterKeyHint="next"
          keyboardType="default"
          placeholder="UI/UX Design"
          placeholderTextColor={colors.subtitle}
          returnKeyType="next"
          onFocus={() => {
            handleFocus("titleRef");
          }}
          onBlur={() => {
            handleBlur();
          }}
          onChangeText={(text: any) => {
            setCreateTask((prevState) => ({
              ...prevState,
              title: text,
            }));
          }}
        />
      </View>
      <View style={styles.parentField}>
        <Text style={styles.selectInputLabel}>Image Required ?</Text>
        <View style={styles.inputField}>
          {/* <Text style={styles.inputLabel}>Leave Type</Text> */}
          <Dropdown
            style={[styles.dropdown]}
            value={applyLeave.is_image_required}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            ref={leaveFormRef.leaveRef}
            data={imageRequiredData}
            // search
            maxHeight={ScreenHeight * 0.4}
            labelField="value"
            valueField="value"
            placeholder={!isFocus ? "Image Required?" : "..."}
            searchPlaceholder="Search..."
            onFocus={() => {
              handleFocus("leaveRef");
            }}
            onBlur={() => {
              handleBlur();
            }}
            onChange={(item: any) => {
              setCreateTask((prevState) => ({
                ...prevState,
                leaveType: item.value,
              }));
              setIsFocus(false);
              Keyboard.dismiss();
            }}
          />
        </View>
      </View>
      <View style={styles.parentField}>
        <Text style={styles.selectInputLabel}>Feedback Required ?</Text>
        <View style={styles.inputField}>
          {/* <Text style={styles.inputLabel}>Leave Type</Text> */}
          <Dropdown
            style={[styles.dropdown]}
            value={applyLeave.is_feedback_required}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            ref={leaveFormRef.leaveRef}
            data={feedbackRequiredData}
            // search
            maxHeight={ScreenHeight * 0.4}
            labelField="value"
            valueField="value"
            placeholder={!isFocus ? "Feedback Required ?" : "..."}
            searchPlaceholder="Search..."
            onFocus={() => {
              handleFocus("leaveRef");
            }}
            onBlur={() => {
              handleBlur();
            }}
            onChange={(item: any) => {
              setCreateTask((prevState) => ({
                ...prevState,
                leaveType: item.value,
              }));
              setIsFocus(false);
              Keyboard.dismiss();
            }}
          />
        </View>
      </View>
      <View style={styles.parentField}>
        <Text style={styles.selectInputLabel}>Visiting Card Required ?</Text>
        <View style={styles.inputField}>
          {/* <Text style={styles.inputLabel}>Leave Type</Text> */}
          <Dropdown
            style={[styles.dropdown]}
            value={applyLeave.is_visiting_card_required}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            ref={leaveFormRef.leaveRef}
            data={visitingCardRequiredData}
            // search
            maxHeight={ScreenHeight * 0.4}
            labelField="value"
            valueField="value"
            placeholder={!isFocus ? "Visiting Card Required ?" : "..."}
            searchPlaceholder="Search..."
            onFocus={() => {
              handleFocus("leaveRef");
            }}
            onBlur={() => {
              handleBlur();
            }}
            onChange={(item: any) => {
              setCreateTask((prevState) => ({
                ...prevState,
                leaveType: item.value,
              }));
              setIsFocus(false);
              Keyboard.dismiss();
            }}
          />
        </View>
      </View>
      {/* <View style={styles.parentField}>
        <Text style={styles.selectInputLabel}>Select Team Member</Text>
        <View style={styles.inputField}>
          <Dropdown
            style={[styles.dropdown]}
            value={applyLeave.leaveType}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            ref={leaveFormRef.leaveRef}
            data={teamMembersList}
            // search
            maxHeight={ScreenHeight * 0.4}
            labelField="name"
            valueField="id"
            placeholder={!isFocus ? "Select Team Member ?" : "..."}
            searchPlaceholder="Search..."
            onFocus={() => {
              handleFocus("leaveRef");
            }}
            onBlur={() => {
              handleBlur();
            }}
            onChange={(item: any) => {
              setCreateTask((prevState) => ({
                ...prevState,
                leaveType: item.value,
              }));
              setIsFocus(false);
              Keyboard.dismiss();
            }}
          />
        </View>
      </View> */}
      <View style={styles.button}>
        <CommonButton
          style={""}
          textColor={colors.white}
          customStyle={""}
          text="Create Task"
          iconName=""
          onPress={() => {}}
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {taskCreateForm()}
    </SafeAreaView>
  );
};

export default TaskScreen;
