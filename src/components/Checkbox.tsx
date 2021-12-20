import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
// @ts-ignore
import checkboxOff from "../../assets/images/checkbox_off.png";
// @ts-ignore
import checkboxOn from "../../assets/images/checkbox_on.png";

interface CheckboxProps {
  checked?: boolean;
  onChanged?: (checked: boolean) => void;
}

export default function Checkbox(props: CheckboxProps) {
  const handleOnChanged = () => {
    if (props.onChanged) {
      const checkedState = props.checked ? props.checked : false;
      const newCheckedState = !checkedState;
      props.onChanged(newCheckedState);
    }
  };

  return (
    <TouchableOpacity onPress={handleOnChanged}>
      <Image
        style={styles.checkboxImg}
        source={props.checked ? checkboxOn : checkboxOff}
        resizeMode="contain"
        resizeMethod="resize"
      />
    </TouchableOpacity>
  );
}

const checkboxSize = 26;

const styles = StyleSheet.create({
  checkboxImg: {
    width: checkboxSize,
    height: checkboxSize,
  },
});
