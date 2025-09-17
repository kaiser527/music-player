import CustomModal from "@/components/admin/modal/CustomModal";
import { fontSize } from "@/constants/tokens";
import { inputValidator } from "@/helpers/validator";
import { useGetPermissionData } from "@/hooks/data/useGetPermissionData";
import { useAppDispatch } from "@/redux/hooks";
import { fetchRole } from "@/redux/slice/RoleSlice";
import { callCreateRole, callUpdateRole } from "@/services/api";
import { IPermission, IRole } from "@/types/backend";
import { FontAwesome6 } from "@expo/vector-icons";
import _ from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { showMessage } from "react-native-flash-message";
import ModalFieldList from "../../modal/ModalFieldList";
import ModuleApi from "./ModuleApi";

interface IProps {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
  dataInit?: IRole | null;
  setDataInit?: (v: IRole | null) => void;
  currentPage: number;
}

const ModalRole = (props: IProps) => {
  const { permissions, setQuery } = useGetPermissionData(true);

  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [listPermissions, setListPermissions] = useState<
    {
      module: string;
      permissions: IPermission[];
      allCheck: boolean;
    }[]
  >([]);

  const nameRef = useRef<string>("");
  const descriptionRef = useRef<string>("");
  const inputDescriptionRef = useRef<TextInput | null>(null);
  const inputNameRef = useRef<TextInput | null>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setQuery("pageSize=100&pageNumber=1");
  }, []);

  useEffect(() => {
    if (permissions && permissions.length > 0)
      setListPermissions(
        groupByPermission(permissions).map((item) => ({
          ...item,
          permissions: item.permissions.map((p) => ({
            ...p,
            isChecked: false,
          })),
          allCheck: false,
        }))
      );
  }, [permissions]);

  useEffect(() => {
    if (props.dataInit && listPermissions && listPermissions.length > 0) {
      nameRef.current = props.dataInit.name;
      descriptionRef.current = props.dataInit.description;
      inputDescriptionRef.current?.setNativeProps({
        text: props.dataInit.description,
      });
      inputNameRef.current?.setNativeProps({ text: props.dataInit.name });
      setIsActive(props.dataInit.isActive ?? false);

      const userPermissions = groupByPermission(props.dataInit.permission);
      const listPermissionClone = _.cloneDeep(listPermissions);
      listPermissionClone.forEach((x) => {
        let allCheck = true;
        x.permissions.forEach((y) => {
          const temp = userPermissions.find((z) => z.module === x.module);
          if (temp) {
            const isExist = temp.permissions.find((k) => k.id === y.id);
            if (isExist) y.isChecked = true;
            else allCheck = false;
          } else allCheck = false;
        });
        x.allCheck = allCheck;
      });
      setListPermissions(listPermissionClone);
    }
  }, [props.isOpen]);

  const handleClose = () => {
    if (props.setDataInit) props.setDataInit(null);
    props.setIsOpen(false);
    setIsActive(false);
    setIsLoading(false);
    nameRef.current = "";
    descriptionRef.current = "";
    inputNameRef.current?.clear();
    inputDescriptionRef.current?.clear();
    if (listPermissions && listPermissions.length > 0) {
      const listPermissionClone = _.cloneDeep(listPermissions);
      listPermissionClone.forEach((l) => {
        l.allCheck = false;
        l.permissions.forEach((p) => {
          p.isChecked = false;
        });
      });
      setListPermissions(listPermissionClone);
    }
  };

  const groupByPermission = (data: IPermission[]) => {
    return _(data)
      .groupBy((x) => x.module)
      .map((value, key) => {
        return { module: key, permissions: value };
      })
      .value();
  };

  const handleConfirm = async () => {
    const validateFields = [
      { ref: nameRef, name: "name" },
      { ref: descriptionRef, name: "description" },
    ];
    const { isValid, output } = inputValidator(validateFields);
    if (!isValid) {
      showMessage({
        message: "Error occurred",
        description: `${output} is not allowed to be empty`,
        type: "danger",
      });
      return;
    }
    const permissionIds: string[] = [];
    listPermissions.forEach((x) => {
      x.permissions.forEach((y) => {
        if (y.isChecked && y.id) permissionIds.push(y.id);
      });
    });
    setIsLoading(true);
    const res =
      props.dataInit && props.dataInit.id
        ? await callUpdateRole(props.dataInit.id, {
            name: nameRef.current,
            isActive,
            description: descriptionRef.current,
            permissionIds,
          })
        : await callCreateRole({
            name: nameRef.current,
            isActive,
            description: descriptionRef.current,
            permissionIds,
          });
    setIsLoading(false);
    if (res.result) {
      dispatch(fetchRole(`pageSize=9&pageNumber=${props.currentPage}`));
      handleClose();
    } else {
      showMessage({
        message: "Error occurred",
        description: res.message,
        type: "danger",
      });
    }
  };

  const fields = [
    {
      name: "Name",
      icon: <FontAwesome6 name="id-badge" size={13} color="grey" />,
      placeholder: "Role name",
      valueRef: nameRef,
      inputRef: inputNameRef,
    },
    {
      name: "Description",
      icon: <FontAwesome6 name="file-alt" size={13} color="grey" />,
      placeholder: "Role description",
      valueRef: descriptionRef,
      inputRef: inputDescriptionRef,
    },
  ];

  const switchs = [
    {
      value: isActive,
      setValue: setIsActive,
      name: "Is Active",
    },
  ];

  return (
    <CustomModal
      handleClose={handleClose}
      handleConfirm={handleConfirm}
      isLoading={isLoading}
      dataInit={props.dataInit}
      title="role"
      isOpen={props.isOpen}
    >
      <ModalFieldList fields={fields} switchs={switchs} />
      <View>
        <Text style={styles.moduleText}>Module</Text>
        <View>
          <ScrollView style={{ height: 300 }}>
            <ModuleApi
              setListPermissions={setListPermissions}
              lisPermissions={listPermissions}
            />
          </ScrollView>
        </View>
      </View>
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  moduleText: {
    color: "grey",
    fontSize: fontSize.sm - 1.5,
    marginBottom: 10,
  },
});

export default ModalRole;
