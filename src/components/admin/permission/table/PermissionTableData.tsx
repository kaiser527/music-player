import { methodColors } from "@/constants/tokens";
import { formattedDate } from "@/constants/utils";
import { useGetPermissionData } from "@/hooks/data/useGetPermissionData";
import dayjs from "dayjs";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import TableData from "../../table/TableData";

interface IProps {
  currentPage: number;
  handleDelete: () => Promise<void>;
  widthArr: number[];
  handlePressAction: (id: string, type: "EDIT" | "DELETE") => void;
}

const PermissionTableData = (props: IProps) => {
  const { permissions } = useGetPermissionData(false);

  const rows =
    permissions.map((permission, index) => ({
      id: permission.id ?? "",
      cells: [
        index + 1 + (props.currentPage - 1) * 8,
        permission.name,
        permission.apiPath,
        permission.method,
        permission.module,
        dayjs(permission.createdAt).format(formattedDate),
        dayjs(permission.updatedAt).format(formattedDate),
        "actions",
      ],
    })) || [];

  return (
    <TableData
      currentPage={props.currentPage}
      widthArr={props.widthArr}
      rows={rows}
      table="PERMISSION"
      handleDelete={props.handleDelete}
      handlePressAction={props.handlePressAction}
      customRender={(cell, colIndex) => {
        if (colIndex === 3) {
          const method = String(cell);
          const color = methodColors[method] ?? "#8c8c8c";
          return (
            <View style={{ paddingHorizontal: 24 }}>
              <View style={[styles.methodBadge, { borderColor: color }]}>
                <Text style={[styles.methodText, { color }]}>{method}</Text>
              </View>
            </View>
          );
        }
      }}
    />
  );
};

export default PermissionTableData;

const styles = StyleSheet.create({
  methodBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: 1,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  methodText: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});
