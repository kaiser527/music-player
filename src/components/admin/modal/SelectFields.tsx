import { colors, fontSize } from "@/constants/tokens";
import { FontAwesome } from "@expo/vector-icons";
import React, { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { TextInput } from "react-native-gesture-handler";

interface IProps {
  selects?: {
    isFocus: boolean;
    setIsFocus: (v: boolean) => void;
    value: string;
    setValue: (v: string) => void;
    data: { label: string; value: string }[];
    icon: ReactNode;
    label: string;
    searchPlaceholder?: string;
    isSearch?: boolean;
    fullWidth?: boolean;
  }[];
}

const SelectFields = (props: IProps) => {
  return (
    <>
      {props.selects &&
        props.selects.length > 0 &&
        props.selects.map((item, index) => {
          const renderLabel = () => {
            if (item.value || item.isFocus) {
              return (
                <Text
                  style={[
                    styles.label,
                    { color: item.isFocus ? colors.text : colors.primary },
                  ]}
                >
                  {item.label}
                </Text>
              );
            }
            return null;
          };

          return (
            <View
              style={{ width: item.fullWidth ? "100%" : "47.7%" }}
              key={`select-${index}`}
            >
              <View style={{ marginTop: 5 }} key={`select-${index}`}>
                {renderLabel()}
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={{
                    ...styles.selectedTextStyle,
                    color: item.isFocus && item.value ? "grey" : colors.text,
                  }}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  onFocus={() => item.setIsFocus(true)}
                  onBlur={() => item.setIsFocus(false)}
                  search={item.isSearch}
                  placeholder={!item.isFocus ? "Select item" : "..."}
                  searchPlaceholder="Search..."
                  onChange={(option) => {
                    item.setValue(option.value);
                    item.setIsFocus(false);
                  }}
                  value={item.value}
                  data={item.data}
                  itemTextStyle={{ color: "grey" }}
                  containerStyle={{ backgroundColor: "#111" }}
                  renderLeftIcon={() => <>{item.icon}</>}
                  renderInputSearch={(onSearch) => (
                    <View
                      style={{
                        paddingHorizontal: 12,
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      <FontAwesome name="search" size={12.5} color="grey" />
                      <TextInput
                        style={{ color: colors.text }}
                        placeholder="Search..."
                        placeholderTextColor="grey" // 👈 works here
                        onChangeText={onSearch}
                      />
                    </View>
                  )}
                  renderItem={(option) => (
                    <View
                      style={{
                        backgroundColor:
                          option.value === item.value ? "#1a1a1a" : "#111",
                      }}
                    >
                      <Text
                        style={{
                          color:
                            option.value === item.value
                              ? colors.primary
                              : colors.text,
                          fontSize: fontSize.xs + 1.5,
                          padding: 12,
                        }}
                      >
                        {option.label}
                      </Text>
                    </View>
                  )}
                />
              </View>
            </View>
          );
        })}
    </>
  );
};

const styles = StyleSheet.create({
  selectContainer: {
    backgroundColor: "#1a1a1a",
    padding: 16,
  },
  dropdown: {
    height: 32,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: "#111",
    marginTop: 22,
  },
  label: {
    position: "absolute",
    left: 22,
    top: 12,
    zIndex: 999,
    paddingHorizontal: 5,
    fontSize: fontSize.xs,
  },
  placeholderStyle: {
    fontSize: fontSize.xs + 0.5,
    color: "grey",
  },
  selectedTextStyle: {
    fontSize: fontSize.xs + 0.5,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default SelectFields;
