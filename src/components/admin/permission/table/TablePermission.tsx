import Access from "@/components/share/Access";
import LoadingSpinner from "@/components/share/LoadingSpinner";
import { ALL_PERMISSION } from "@/constants/permissions";
import { colors, fontSize } from "@/constants/tokens";
import { formattedDate } from "@/constants/utils";
import { useGetPermissionData } from "@/hooks/data/useGetPermissionData";
import { useAppDispatch } from "@/redux/hooks";
import { fetchPermission } from "@/redux/slice/PermissionSlice";
import { callDeletePermission } from "@/services/api";
import { IPermission } from "@/types/backend";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { showMessage } from "react-native-flash-message";
import { DateType } from "react-native-ui-datepicker";
import CreateButton from "../../table/CreateButton";
import Pagination from "../../table/Pagination";
import TableFilter from "../../table/TableFilter";
import TableHeader from "../../table/TableHeader";
import ModalPermission from "../ModalPermission";
import PermissionTableData from "./PermissionTableData";

const state = {
  tableHead: [
    "No",
    "Name",
    "Api path",
    "Method",
    "Module",
    "Created At",
    "Updated At",
    "Action",
  ],
  widthArr: [50, 200, 180, 120, 120, 180, 180, 150],
};

const TablePermission = () => {
  const { permissions, meta, isFetching, setQuery } =
    useGetPermissionData(true);

  const [isShowModal, setIsShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<"createdAt" | "updatedAt" | null>(
    null
  );
  const [name, setName] = useState("");
  const [apiPath, setApiPath] = useState("");
  const [method, setMethod] = useState("");
  const [module, setModule] = useState("");
  const [dataInit, setDataInit] = useState<IPermission | null>(null);
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
      if (apiPath && apiPath.length > 0) {
        query += `&apiPath=${apiPath}`;
      }
      if (module && module.length > 0) {
        query += `&module=${module}`;
      }
      if (method && method.length > 0) {
        query += `&method=${method}`;
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
  }, [
    currentPage,
    sortOrder,
    name,
    apiPath,
    module,
    method,
    sortField,
    dateRange,
  ]);

  const fields = [
    {
      name: "Name",
      value: name,
      placeholder: "Filter by name",
      onChange: setName,
    },
    {
      name: "Method",
      value: method,
      placeholder: "Filter by method",
      onChange: setMethod,
    },
    {
      name: "Module",
      value: module,
      placeholder: "Filter by module",
      onChange: setModule,
    },
    {
      name: "Api path",
      value: apiPath,
      placeholder: "Filter by api path",
      onChange: setApiPath,
    },
  ];

  const handlePressAction = (id: string, type: "EDIT" | "DELETE") => {
    const permission = permissions.find((item) => item.id === id);
    if (permission) {
      setDataInit(permission);
      type === "EDIT" && setIsShowModal(true);
    }
  };

  const handleDelete = async () => {
    if (dataInit) {
      const res = await callDeletePermission(dataInit.id ?? "");
      if (res.result) {
        dispatch(fetchPermission(`pageSize=9&pageNumber=${currentPage}`));
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

  return (
    <>
      <ScrollView contentContainerStyle={{ paddingBottom: 10 }}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableTitle}>List Permission</Text>
          <Access permission={ALL_PERMISSION.PERMISSION.CREATE} hideChildren>
            <CreateButton
              text="Create Permission"
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
                <PermissionTableData
                  widthArr={state.widthArr}
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
      <ModalPermission
        setDataInit={setDataInit}
        dataInit={dataInit}
        isOpen={isShowModal}
        setIsOpen={setIsShowModal}
        currentPage={currentPage}
      />
    </>
  );
};

export default TablePermission;

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
