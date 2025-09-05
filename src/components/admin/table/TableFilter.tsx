import { colors, fontSize } from "@/constants/tokens";
import { formattedDate } from "@/constants/utils";
import { FontAwesome6 } from "@expo/vector-icons";
import dayjs from "dayjs";
import React, { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Accordion from "react-native-collapsible/Accordion";
import DateTimePicker, { DateType } from "react-native-ui-datepicker";

interface IProps {
  fields?: {
    name: string;
    value: string;
    placeholder: string;
    onChange: (v: string) => void;
  }[];
  dateRange?: {
    startDate: DateType;
    endDate: DateType;
    setDateRange: (v: { startDate: DateType; endDate: DateType }) => void;
  };
}

const TableFilter = (props: IProps) => {
  const [activeSections, setActiveSections] = useState<number[]>([]);

  const SECTIONS = [{ title: "Filter Options" }];

  return (
    <Accordion
      sections={SECTIONS}
      activeSections={activeSections}
      expandMultiple={false}
      renderHeader={(section, _, isActive) => (
        <View style={styles.accordionHeader}>
          <Text style={styles.accordionTitle}>{section.title}</Text>
          <Text style={styles.accordionArrow}>{isActive ? "▲" : "▼"}</Text>
        </View>
      )}
      renderContent={() => <FilterContent {...props} />}
      onChange={setActiveSections}
    />
  );
};

const FilterContent = (props: IProps) => {
  const handleChangeParams = (params: {
    startDate: DateType;
    endDate: DateType;
  }) => {
    if (!props.dateRange) return;
    props.dateRange.setDateRange({
      startDate: params.startDate,
      endDate: params.endDate,
    });
  };

  return (
    <>
      <View style={styles.wrapper}>
        {props.fields &&
          props.fields.length > 0 &&
          props.fields.map((item, index) => {
            return (
              <View style={styles.container} key={`${item.name}-${index}`}>
                <Text style={styles.label}>{item.name}</Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.input}
                    value={item.value}
                    placeholder={item.placeholder || `Enter ${item.name}`}
                    placeholderTextColor="#8c8c8c"
                    onChangeText={item.onChange}
                  />
                  {item.value.length > 0 && (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={styles.clearButton}
                      onPress={() => item.onChange("")}
                    >
                      <FontAwesome6 name="xmark" size={13} color="#8c8c8c" />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            );
          })}
      </View>
      {props.dateRange && (
        <View style={styles.rangePickerWrapper}>
          <View style={{ ...styles.container, width: "100%" }}>
            <Text style={{ ...styles.label, fontSize: fontSize.xs + 1 }}>
              Filter by Created at
            </Text>
            <View style={{ flexDirection: "row", gap: 12 }}>
              <Pressable style={styles.dateInput}>
                <FontAwesome6
                  name="calendar-day"
                  size={14}
                  color={
                    props.dateRange.startDate != null ? colors.text : "#8c8c8c"
                  }
                  style={{ marginRight: 7 }}
                />
                <Text
                  style={{
                    ...styles.dateInputText,
                    color:
                      props.dateRange.startDate != null
                        ? colors.text
                        : "#8c8c8c",
                  }}
                >
                  {props.dateRange?.startDate
                    ? dayjs(props.dateRange.startDate).format(formattedDate)
                    : "Start date"}
                </Text>
                {props.dateRange?.startDate && (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() =>
                      props.dateRange?.setDateRange({
                        startDate: null,
                        endDate: props.dateRange?.endDate,
                      })
                    }
                  >
                    <FontAwesome6 name="xmark" size={14} color="#8c8c8c" />
                  </TouchableOpacity>
                )}
              </Pressable>
              <Pressable style={styles.dateInput}>
                <FontAwesome6
                  name="calendar-check"
                  size={14}
                  color={
                    props.dateRange.endDate != null ? colors.text : "#8c8c8c"
                  }
                  style={{ marginRight: 7 }}
                />
                <Text
                  style={{
                    ...styles.dateInputText,
                    color:
                      props.dateRange.endDate != null ? colors.text : "#8c8c8c",
                  }}
                >
                  {props.dateRange?.endDate
                    ? dayjs(props.dateRange.endDate).format(formattedDate)
                    : "End date"}
                </Text>
                {props.dateRange?.endDate && (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() =>
                      props.dateRange?.setDateRange({
                        startDate: props.dateRange?.startDate,
                        endDate: null,
                      })
                    }
                  >
                    <FontAwesome6 name="xmark" size={14} color="#8c8c8c" />
                  </TouchableOpacity>
                )}
              </Pressable>
            </View>
          </View>
          <View style={styles.popupWrapper}>
            <DateTimePicker
              mode="range"
              disableMonthPicker
              disableYearPicker
              startDate={props.dateRange.startDate}
              endDate={props.dateRange.endDate}
              onChange={handleChangeParams}
              components={{
                IconPrev: (
                  <FontAwesome6
                    name="chevron-left"
                    size={14}
                    color={colors.primary}
                  />
                ),
                IconNext: (
                  <FontAwesome6
                    name="chevron-right"
                    size={14}
                    color={colors.primary}
                  />
                ),
              }}
              styles={{
                month_selector_label: {
                  fontWeight: 700,
                  color: colors.primary,
                },
                year_selector_label: {
                  fontWeight: 700,
                  color: colors.primary,
                },
                today: {
                  borderColor: colors.primary,
                  borderWidth: 1,
                  borderRadius: 30,
                },
                today_label: {
                  color: colors.primary,
                },
                selected_label: {
                  color: colors.text,
                  fontWeight: 700,
                },
                selected: {
                  backgroundColor: colors.primary,
                  borderRadius: 30,
                },
                range_fill: {
                  backgroundColor: "rgba(252, 60, 68, 0.15)",
                },
                range_middle_label: {
                  color: colors.text,
                },
                weekdays: {
                  borderBottomColor: "#333",
                  borderBottomWidth: 1,
                  paddingBottom: 5,
                },
                weekday_label: { color: colors.text },
                day_label: { color: "grey" },
              }}
            />
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    marginBottom: 20,
    marginLeft: 18.5,
  },
  rangePickerWrapper: {
    marginBottom: 20,
    paddingHorizontal: 19,
    marginTop: -4,
  },
  container: {
    width: 170,
    backgroundColor: "#1a1a1a",
    paddingTop: 6,
    paddingBottom: 12,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  label: {
    color: colors.primary,
    fontSize: fontSize.xs + 0.5,
    fontWeight: "600",
    marginBottom: 6,
  },
  inputWrapper: {
    position: "relative",
    justifyContent: "center",
  },
  input: {
    backgroundColor: "#141414",
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingRight: 28,
    paddingVertical: 8,
    fontSize: fontSize.xs,
    color: "#f0f0f0",
    height: 33,
  },
  clearButton: {
    position: "absolute",
    right: 10,
    top: "55%",
    transform: [{ translateY: -8 }],
  },
  popupWrapper: {
    marginTop: 10,
    backgroundColor: "#1a1a1a",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#333",
    overflow: "hidden",
  },
  closeIcon: {
    position: "absolute",
    top: 75,
    zIndex: 20,
    right: 8,
    padding: 6,
  },
  dateInput: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#141414",
    borderColor: "#333",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 35,
    flex: 1,
  },
  dateInputText: {
    flex: 1,
    fontSize: fontSize.xs,
  },
  accordionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#1a1a1a",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginHorizontal: 10,
    marginBottom: 20,
  },
  accordionTitle: {
    color: colors.primary,
    fontSize: fontSize.sm - 1,
    fontWeight: "600",
  },
  accordionArrow: {
    color: colors.primary,
    fontSize: fontSize.sm - 1,
  },
});

export default TableFilter;
