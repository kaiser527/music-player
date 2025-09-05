import Access from "@/components/share/Access";
import LoadingSpinner from "@/components/share/LoadingSpinner";
import { ALL_PERMISSION } from "@/constants/permissions";
import { colors, fontSize } from "@/constants/tokens";
import { formattedDate } from "@/constants/utils";
import { useGetAccount } from "@/hooks/data/useGetAccount";
import { EUser, useGetUserData } from "@/hooks/data/useGetUserData";
import { useAppDispatch } from "@/redux/hooks";
import { fetchUser } from "@/redux/slice/UserSlice";
import { callDeleteUser } from "@/services/api";
import { IUser } from "@/types/backend";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { showMessage } from "react-native-flash-message";
import { ScrollView } from "react-native-gesture-handler";
import { DateType } from "react-native-ui-datepicker";
import CreateButton from "../../table/CreateButton";
import Pagination from "../../table/Pagination";
import TableFilter from "../../table/TableFilter";
import ModalUser from "../ModalUser";
import UserTableData from "./UserTableData";
import UserTableHeader from "./UserTableHeader";

const TableUser = () => {
  const { isFetching, setQuery, meta, data } = useGetUserData(EUser.USER, true);
  const { user } = useGetAccount(false);

  const [isShowModal, setIsShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [sortField, setSortField] = useState<"createdAt" | "updatedAt" | null>(
    null
  );
  const [dataInit, setDataInit] = useState<IUser | null>(null);
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
      let query = `pageSize=8&pageNumber=${currentPage}`;
      if (email && email.length > 0) {
        query += `&email=${email}`;
      }
      if (username && username.length > 0) {
        query += `&username=${username}`;
      }
      if (role && role.length > 0) {
        query += `&role=${role}`;
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
  }, [currentPage, email, username, role, sortOrder, sortField, dateRange]);

  const fields = [
    {
      name: "Email",
      value: email,
      placeholder: "Filter by email",
      onChange: setEmail,
    },
    {
      name: "Username",
      value: username,
      placeholder: "Filter by username",
      onChange: setUsername,
    },
    {
      name: "Role",
      value: role,
      placeholder: "Filter by role",
      onChange: setRole,
    },
  ];

  const handlePressAction = (email: string, type: "EDIT" | "DELETE") => {
    const user = data.find((item) => item.email === email);
    if (user) {
      setDataInit(user);
      type === "EDIT" && setIsShowModal(true);
    }
  };

  const handleDelete = async () => {
    if (dataInit) {
      if (user.id === dataInit.id) {
        showMessage({
          message: "Error occurred",
          description: "You cannot delete yourself",
          type: "danger",
        });
        return;
      }
      const res = await callDeleteUser(dataInit.id ?? "");
      if (res.result) {
        dispatch(fetchUser(`pageSize=8&pageNumber=${currentPage}`));
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
    <Access permission={ALL_PERMISSION.USER.GET_PAGINATE} hideChildren>
      <ScrollView contentContainerStyle={{ paddingBottom: 10 }}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableTitle}>List User</Text>
          <Access permission={ALL_PERMISSION.USER.CREATE} hideChildren>
            <CreateButton
              text="Create User"
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
            <UserTableHeader
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
              sortField={sortField}
              setSortField={setSortField}
            />
            {isFetching ? (
              <View style={styles.spinner}>
                <LoadingSpinner size={50} color={colors.primary} />
              </View>
            ) : (
              <ScrollView style={styles.dataWrapper}>
                <UserTableData
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
      <ModalUser
        setDataInit={setDataInit}
        dataInit={dataInit}
        isOpen={isShowModal}
        setIsOpen={setIsShowModal}
        currentPage={currentPage}
      />
    </Access>
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

export default TableUser;
