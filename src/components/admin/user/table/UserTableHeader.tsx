import { colors } from "@/constants/tokens";
import { FontAwesome6 } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Row, Table } from "react-native-table-component";

interface IProps {
  sortField: "createdAt" | "updatedAt" | null;
  setSortField: (v: "createdAt" | "updatedAt" | null) => void;
  sortOrder: "asc" | "desc";
  setSortOrder: (v: "asc" | "desc") => void;
}

const state = {
  tableHead: [
    "No",
    "Email",
    "Username",
    "Role",
    "Created At",
    "Updated At",
    "Action",
  ],
  widthArr: [50, 200, 150, 120, 180, 180, 150],
};

const UserTableHeader = (props: IProps) => {
  const handleSort = (field: "createdAt" | "updatedAt") => {
    if (props.sortField !== field) {
      props.setSortField(field);
      props.setSortOrder("desc");
    } else if (props.sortOrder === "desc") {
      props.setSortOrder("asc");
    } else if (props.sortOrder === "asc") {
      props.setSortField(null);
      props.setSortOrder("desc");
    }
  };

  return (
    <Table borderStyle={{ borderWidth: 1, borderColor: "#C1C0B9" }}>
      <Row
        data={state.tableHead.map((head) => {
          if (head === "Created At" || head === "Updated At") {
            const field = head === "Created At" ? "createdAt" : "updatedAt";
            const isActive = props.sortField === field;
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                key={head}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() => handleSort(field)}
              >
                <Text style={styles.textHeader}>{head}</Text>
                <FontAwesome6
                  name={
                    isActive
                      ? props.sortOrder === "asc"
                        ? "sort-up"
                        : "sort-down"
                      : "sort"
                  }
                  size={14}
                  color={isActive ? colors.primary : "#8c8c8c"}
                  style={{ marginLeft: 6 }}
                />
              </TouchableOpacity>
            );
          }
          return (
            <Text key={head} style={styles.textHeader}>
              {head}
            </Text>
          );
        })}
        widthArr={state.widthArr}
        style={styles.header}
      />
    </Table>
  );
};

const styles = StyleSheet.create({
  header: { height: 50, backgroundColor: "#262626" },
  textHeader: {
    textAlign: "center",
    fontWeight: "bold",
    color: colors.primary,
  },
});

export default UserTableHeader;
