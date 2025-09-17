import { formattedDate } from "@/constants/utils";
import { EUser, useGetUserData } from "@/hooks/data/useGetUserData";
import dayjs from "dayjs";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import TableData from "../../table/TableData";

interface IProps {
  currentPage: number;
  handleDelete: () => Promise<void>;
  handlePressAction: (email: string, type: "EDIT" | "DELETE") => void;
}

const roleColors: Record<string, string> = {
  admin: "#d32029",
  user: "#52c41a",
  artist: "#722ed1",
  tester: "#fadb14",
};

const UserTableData = (props: IProps) => {
  const { data } = useGetUserData(EUser.USER, false);

  const rows =
    data.map((user, index) => ({
      id: user.id ?? "",
      cells: [
        index + 1 + (props.currentPage - 1) * 8,
        user.email,
        user.username,
        user.role.name,
        dayjs(user.createdAt).format(formattedDate),
        dayjs(user.updatedAt).format(formattedDate),
        "actions",
      ],
    })) || [];

  return (
    <TableData
      currentPage={props.currentPage}
      widthArr={[50, 200, 150, 120, 180, 180, 150]}
      rows={rows}
      table="USER"
      handleDelete={props.handleDelete}
      handlePressAction={props.handlePressAction}
      customRender={(cell, colIndex) => {
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
      }}
    />
  );
};

const styles = StyleSheet.create({
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
