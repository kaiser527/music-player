import Access from "@/components/share/Access";
import { ALL_PERMISSION } from "@/constants/permissions";
import { formattedDate } from "@/constants/utils";
import { EUser, useGetUserData } from "@/hooks/data/useGetUserData";
import { FontAwesome6 } from "@expo/vector-icons";
import dayjs from "dayjs";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Row, Table } from "react-native-table-component";
import DeletePopup from "../../table/DeletePopup";

interface IProps {
  currentPage: number;
  handleDelete: () => Promise<void>;
  handlePressAction: (email: string, type: "EDIT" | "DELETE") => void;
}

const widthArr = [50, 200, 150, 120, 180, 180, 150];
const roleColors: Record<string, string> = {
  admin: "#d32029",
  user: "#52c41a",
  artist: "#722ed1",
  tester: "#fadb14",
};

const UserTableData = (props: IProps) => {
  const { data } = useGetUserData(EUser.USER, false);

  const [visiblePopup, setVisiblePopup] = useState("");

  const tableData =
    data.map((user, index) => [
      index + 1 + (props.currentPage - 1) * 8,
      user.email,
      user.username,
      user.role.name,
      dayjs(user.createdAt).format(formattedDate),
      dayjs(user.updatedAt).format(formattedDate),
      "actions",
    ]) || [];

  return (
    <Table borderStyle={{ borderWidth: 1, borderColor: "#C1C0B9" }}>
      {tableData.map((rowData, rowIndex) => (
        <Row
          key={rowIndex}
          data={rowData.map((cell, colIndex) => {
            if (colIndex === 3) {
              const roleName = (cell as string)?.toLowerCase();
              const roleColor = roleColors[roleName];
              return (
                <View
                  key={colIndex}
                  style={[
                    styles.roleBadge,
                    { borderColor: roleColor, borderWidth: 1 },
                  ]}
                >
                  <Text style={[styles.roleText, { color: roleColor }]}>
                    {cell}
                  </Text>
                </View>
              );
            }
            if (colIndex === rowData.length - 1) {
              return (
                <View
                  key={colIndex}
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    gap: 20,
                  }}
                >
                  <Access permission={ALL_PERMISSION.USER.UPDATE} hideChildren>
                    <TouchableOpacity
                      onPress={() =>
                        props.handlePressAction(rowData[1] as string, "EDIT")
                      }
                    >
                      <FontAwesome6 name="edit" size={20} color="#ffa500" />
                    </TouchableOpacity>
                  </Access>
                  <Access permission={ALL_PERMISSION.USER.DELETE} hideChildren>
                    <DeletePopup
                      handleDelete={props.handleDelete}
                      visiblePopup={visiblePopup}
                      marker={rowData[1] as string}
                      setVisiblePopup={setVisiblePopup}
                      table="user"
                      children={
                        <TouchableOpacity
                          onPress={() => {
                            setVisiblePopup(rowData[1] as string);
                            props.handlePressAction(
                              rowData[1] as string,
                              "DELETE"
                            );
                          }}
                        >
                          <FontAwesome6
                            name="trash"
                            size={20}
                            color="#ff4d4f"
                          />
                        </TouchableOpacity>
                      }
                    />
                  </Access>
                </View>
              );
            }
            return (
              <Text key={colIndex} style={styles.text}>
                {cell}
              </Text>
            );
          })}
          widthArr={widthArr}
          style={[
            styles.row,
            {
              backgroundColor: rowIndex % 2 ? "#1f1f1f" : "#141414",
            },
          ]}
        />
      ))}
    </Table>
  );
};

const styles = StyleSheet.create({
  text: { textAlign: "center", fontWeight: "400", color: "#f0f0f0" },
  row: { height: 50 },
  roleBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    alignSelf: "center",
  },
  roleText: {
    fontWeight: "600",
    textAlign: "center",
    fontSize: 12,
    textTransform: "capitalize",
  },
});

export default UserTableData;
