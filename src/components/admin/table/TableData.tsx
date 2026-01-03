import Access from "@/components/share/Access";
import { ALL_PERMISSION } from "@/constants/permissions";
import { FontAwesome6 } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Row, Table } from "react-native-table-component";
import DeletePopup from "./DeletePopup";

interface ITableRow {
  id: string;
  cells: (string | React.ReactNode)[];
}

interface IProps {
  table: "USER" | "ROLE" | "TRACK" | "PLAYLIST" | "PERMISSION";
  currentPage: number;
  widthArr: number[];
  rows: ITableRow[];
  handleDelete: () => Promise<void>;
  handlePressAction: (id: string, type: "EDIT" | "DELETE") => void;
  customRender?: (
    cell: any,
    colIndex: number,
    rowData: ITableRow
  ) => React.ReactNode;
}

const TableData = ({
  table,
  widthArr,
  rows,
  handleDelete,
  handlePressAction,
  customRender,
}: IProps) => {
  const [visiblePopup, setVisiblePopup] = useState("");

  return (
    <Table borderStyle={{ borderWidth: 1, borderColor: "#C1C0B9" }}>
      {rows.map((rowData, rowIndex) => (
        <Row
          key={rowData.id}
          widthArr={widthArr}
          data={rowData.cells.map((cell, colIndex) => {
            // Custom render injection
            if (customRender) {
              const rendered = customRender(cell, colIndex, rowData);
              if (rendered) return rendered;
            }

            // Last column = Actions
            if (colIndex === rowData.cells.length - 1) {
              return (
                <View
                  key={colIndex}
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    gap: 20,
                  }}
                >
                  <Access
                    permission={ALL_PERMISSION[table].UPDATE}
                    hideChildren
                  >
                    <TouchableOpacity
                      onPress={() => handlePressAction(rowData.id, "EDIT")}
                    >
                      <FontAwesome6 name="edit" size={20} color="#ffa500" />
                    </TouchableOpacity>
                  </Access>
                  <Access
                    permission={ALL_PERMISSION[table].DELETE}
                    hideChildren
                  >
                    <DeletePopup
                      handleDelete={handleDelete}
                      visiblePopup={visiblePopup}
                      marker={rowData.id}
                      setVisiblePopup={setVisiblePopup}
                      table={table.toLowerCase()}
                      children={
                        <TouchableOpacity
                          onPress={() => {
                            setVisiblePopup(rowData.id);
                            handlePressAction(rowData.id, "DELETE");
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
          style={[
            styles.row,
            { backgroundColor: rowIndex % 2 ? "#1f1f1f" : "#141414" },
          ]}
        />
      ))}
    </Table>
  );
};

const styles = StyleSheet.create({
  text: { textAlign: "center", fontWeight: "400", color: "#f0f0f0" },
  row: { height: 50 },
});

export default TableData;
