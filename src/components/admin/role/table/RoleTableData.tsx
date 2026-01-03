import { fontSize } from "@/constants/tokens";
import { formattedDate } from "@/constants/utils";
import { useGetRoleData } from "@/hooks/data/useGetRoleData";
import dayjs from "dayjs";
import React from "react";
import { Text, View } from "react-native";
import TableData from "../../table/TableData";

interface IProps {
  currentPage: number;
  widthArr: number[];
  handleDelete: () => Promise<void>;
  handlePressAction: (id: string, type: "EDIT" | "DELETE") => void;
}

const RoleTableData = (props: IProps) => {
  const { roles } = useGetRoleData(false);

  const rows =
    roles.map((role, index) => ({
      id: role.id ?? "",
      cells: [
        index + 1 + (props.currentPage - 1) * 8,
        role.name,
        role.description,
        role.isActive,
        dayjs(role.createdAt).format(formattedDate),
        dayjs(role.updatedAt).format(formattedDate),
        "actions",
      ],
    })) || [];

  return (
    <TableData
      currentPage={props.currentPage}
      widthArr={props.widthArr}
      rows={rows}
      table="ROLE"
      handleDelete={props.handleDelete}
      handlePressAction={props.handlePressAction}
      customRender={(cell: boolean, colIndex) => {
        if (colIndex === 3) {
          return (
            <View
              style={{
                backgroundColor: cell ? "#D1FAE5" : "#FEE2E2",
                paddingVertical: 3,
                paddingHorizontal: 9,
                borderRadius: 12,
                alignSelf: "center",
              }}
            >
              <Text
                style={{
                  fontSize: fontSize.xs,
                  color: cell ? "#065F46" : "#991B1B",
                  fontWeight: "600",
                }}
              >
                {cell ? "ACTIVE" : "INACTIVE"}
              </Text>
            </View>
          );
        }
      }}
    />
  );
};

export default RoleTableData;
