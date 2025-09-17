import Access from "@/components/share/Access";
import LoadingSpinner from "@/components/share/LoadingSpinner";
import { ALL_PERMISSION } from "@/constants/permissions";
import { colors, fontSize } from "@/constants/tokens";
import { formattedDate } from "@/constants/utils";
import { useGetRoleData } from "@/hooks/data/useGetRoleData";
import { useAppDispatch } from "@/redux/hooks";
import { fetchRole } from "@/redux/slice/RoleSlice";
import { callDeleteRole } from "@/services/api";
import { IRole } from "@/types/backend";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { showMessage } from "react-native-flash-message";
import { DateType } from "react-native-ui-datepicker";
import CreateButton from "../../table/CreateButton";
import Pagination from "../../table/Pagination";
import TableFilter from "../../table/TableFilter";
import TableHeader from "../../table/TableHeader";
import ModalRole from "../modal/ModalRole";
import RoleTableData from "./RoleTableData";

const state = {
  tableHead: [
    "No",
    "Name",
    "Description",
    "Is active",
    "Created At",
    "Updated At",
    "Action",
  ],
  widthArr: [50, 150, 200, 120, 180, 180, 150],
};

const TableRole = () => {
  const { roles, meta, isFetching, setQuery } = useGetRoleData(true);

  const [isShowModal, setIsShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<"createdAt" | "updatedAt" | null>(
    null
  );
  const [name, setName] = useState("");
  const [active, setActive] = useState("");
  const [dataInit, setDataInit] = useState<IRole | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [dateRange, setDateRange] = useState<{
    startDate: DateType | null;
    endDate: DateType | null;
  }>({
    startDate: null,
    endDate: null,
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (setQuery) {
      let query = `pageSize=9&pageNumber=${currentPage}`;
      if (name && name.length > 0) {
        query += `&name=${name}`;
      }
      if (active === "no" || active === "yes") {
        query += `&isActive=${active === "yes"}`;
      }
      if (sortField === "createdAt") {
        query += `&sortByCreatedAt=${sortOrder === "asc"}`;
      }
      if (sortField === "updatedAt") {
        query += `&sortByUpdatedAt=${sortOrder === "asc"}`;
      }
      if (
        dateRange &&
        dateRange.endDate &&
        dateRange.startDate &&
        dateRange.startDate < dateRange.endDate
      ) {
        query += `&startDate=${dayjs(dateRange.startDate).format(
          formattedDate
        )}&endDate=${dayjs(dateRange.endDate).format(formattedDate)}`;
      }
      setQuery(query);
    }
  }, [currentPage, sortOrder, active, name, sortField, dateRange]);

  const handlePressAction = (id: string, type: "EDIT" | "DELETE") => {
    const role = roles.find((item) => item.id === id);
    if (role) {
      setDataInit(role);
      type === "EDIT" && setIsShowModal(true);
    }
  };

  const handleDelete = async () => {
    if (dataInit) {
      const res = await callDeleteRole(dataInit.id ?? "");
      if (res.result) {
        dispatch(fetchRole(`pageSize=8&pageNumber=${currentPage}`));
        setDataInit(null);
      } else {
        showMessage({
          message: "Error occurred",
          description: res.message,
          type: "danger",
        });
      }
    }
  };

  const fields = [
    {
      name: "Name",
      value: name,
      placeholder: "Filter by name",
      onChange: setName,
    },
    {
      name: "Active",
      value: active,
      placeholder: "Filter by active",
      onChange: setActive,
    },
  ];

  return (
    <>
      <ScrollView contentContainerStyle={{ paddingBottom: 10 }}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableTitle}>List Role</Text>
          <Access permission={ALL_PERMISSION.ROLE.CREATE} hideChildren>
            <CreateButton
              text="Create Role"
              onPress={() => setIsShowModal(true)}
            />
          </Access>
        </View>
        <TableFilter
          fields={fields}
          dateRange={{ ...dateRange, setDateRange }}
        />
        <ScrollView horizontal={true}>
          <View>
            <TableHeader
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
              sortField={sortField}
              setSortField={setSortField}
              state={state}
            />
            {isFetching ? (
              <View style={styles.spinner}>
                <LoadingSpinner size={50} color={colors.primary} />
              </View>
            ) : (
              <ScrollView style={styles.dataWrapper}>
                <RoleTableData
                  handleDelete={handleDelete}
                  handlePressAction={handlePressAction}
                  currentPage={currentPage}
                />
              </ScrollView>
            )}
          </View>
        </ScrollView>
      </ScrollView>
      {!isFetching && (
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          meta={meta}
        />
      )}
      <ModalRole
        currentPage={currentPage}
        setDataInit={setDataInit}
        dataInit={dataInit}
        isOpen={isShowModal}
        setIsOpen={setIsShowModal}
      />
    </>
  );
};

const styles = StyleSheet.create({
  dataWrapper: { marginTop: -1 },
  tableHeader: {
    marginVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tableTitle: {
    color: colors.primary,
    fontWeight: "600",
    fontSize: fontSize.base,
  },
  spinner: {
    alignItems: "center",
    marginTop: 150,
  },
});

export default TableRole;
