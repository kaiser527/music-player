import CustomModal from "@/components/admin/modal/CustomModal";
import { colors } from "@/constants/tokens";
import { REACT_BACKEND_URL } from "@/constants/utils";
import { inputValidator, selectValidator } from "@/helpers/validator";
import { useGetAccount } from "@/hooks/data/useGetAccount";
import { useGetRoleData } from "@/hooks/data/useGetRoleData";
import { useAppDispatch } from "@/redux/hooks";
import { setUserLoginInfo } from "@/redux/slice/AccountSlice";
import { fetchUser } from "@/redux/slice/UserSlice";
import { callCreateUser, callUpdateUser } from "@/services/api";
import { IUser } from "@/types/backend";
import { FontAwesome6 } from "@expo/vector-icons";
import _ from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import { showMessage } from "react-native-flash-message";
import { TextInput } from "react-native-gesture-handler";
import ModalFieldList from "../modal/ModalFieldList";
import Upload from "../modal/Upload";

interface IProps {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
  dataInit?: IUser | null;
  setDataInit?: (v: IUser | null) => void;
  currentPage: number;
}

const accountTypeData = [
  { label: "Google", value: "GOOGLE" },
  { label: "Facebook", value: "FACEBOOK" },
  { label: "Local", value: "LOCAL" },
];

const ModalUser = (props: IProps) => {
  const { roles, setQuery } = useGetRoleData(true);
  const { user } = useGetAccount(false);

  const [accountType, setAccountType] = useState("");
  const [isFocusAccountType, setIsFocusAccountType] = useState(false);
  const [role, setRole] = useState("");
  const [isFocusRole, setIsFocusRole] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [previewUri, setPreviewUri] = useState<string | null>(null);

  const emailRef = useRef<string>("");
  const usernameRef = useRef<string>("");
  const passwordRef = useRef<string>("");
  const fileNameRef = useRef<string>("");
  const inputEmailRef = useRef<TextInput>(null);
  const inputUsernameRef = useRef<TextInput>(null);
  const inputPasswordRef = useRef<TextInput>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setQuery("pageSize=100&pageNumber=1");

    return () => {
      setQuery("");
    };
  }, []);

  useEffect(() => {
    if (props.dataInit) {
      setIsActive(props.dataInit.isActive ?? false);
      setRole(props.dataInit.role.id ?? "");
      setPreviewUri(
        `${REACT_BACKEND_URL}/api/v1/images/user/${props.dataInit.image}`
      );
      setAccountType(props.dataInit.accountType ?? "");
      emailRef.current = props.dataInit.email;
      usernameRef.current = props.dataInit.username;
      fileNameRef.current = props.dataInit.image;
      passwordRef.current = "********";
      inputUsernameRef.current?.setNativeProps({
        text: props.dataInit.username,
      });
      inputPasswordRef.current?.setNativeProps({ text: "********" });
      inputEmailRef.current?.setNativeProps({ text: props.dataInit.email });
    }
  }, [props.isOpen]);

  const handleClose = () => {
    if (props.setDataInit) props.setDataInit(null);
    props.setIsOpen(false);
    emailRef.current = "";
    usernameRef.current = "";
    passwordRef.current = "";
    fileNameRef.current = "";
    inputEmailRef.current?.clear();
    inputUsernameRef.current?.clear();
    inputPasswordRef.current?.clear();
    setRole("");
    setIsActive(false);
    setAccountType("");
    setIsLoading(false);
    setPreviewUri(null);
  };

  const handleConfirm = async () => {
    const validateInputFields = [
      { ref: emailRef, name: "email" },
      { ref: passwordRef, name: "password" },
      { ref: usernameRef, name: "username" },
    ];
    const validateSelectFields = [
      { label: "account type", value: accountType },
      { label: "role", value: role },
    ];
    const selectValidate = selectValidator(validateSelectFields);
    const inputValidate = inputValidator(validateInputFields);
    if (!inputValidate.isValid) {
      showMessage({
        message: "Error occurred",
        description: `${inputValidate.output} is not allowed to be empty`,
        type: "danger",
      });
      return;
    }
    if (!selectValidate.isValid) {
      showMessage({
        message: "Error occurred",
        description: `${selectValidate.output} must be selected`,
        type: "danger",
      });
      return;
    }
    setIsLoading(true);
    const defaultImage = "default-1752056150533.png";
    const res =
      props.dataInit && props.dataInit.id
        ? await callUpdateUser(props.dataInit.id, {
            username: usernameRef.current,
            image:
              fileNameRef.current.length > 0
                ? fileNameRef.current
                : defaultImage,
            isActive,
            accountType,
            roleId: role,
          })
        : await callCreateUser({
            email: emailRef.current,
            password: passwordRef.current,
            username: usernameRef.current,
            image:
              fileNameRef.current.length > 0
                ? fileNameRef.current
                : defaultImage,
            isActive,
            accountType,
            roleId: role,
          });
    if (res.result) {
      dispatch(fetchUser(`pageSize=9&pageNumber=${props.currentPage}`));
      handleClose();
      if (user.id === props.dataInit?.id) {
        dispatch(setUserLoginInfo(res.result));
      }
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
      name: "User Email",
      icon: <FontAwesome6 name="envelope" size={14} color="grey" />,
      placeholder: "Enter email",
      valueRef: emailRef,
      inputRef: inputEmailRef,
    },
    {
      name: "Username",
      icon: <FontAwesome6 name="user" size={13} color="grey" />,
      placeholder: "Enter username",
      valueRef: usernameRef,
      inputRef: inputUsernameRef,
    },
    {
      name: "Password",
      icon: <FontAwesome6 name="lock" size={13} color="grey" />,
      placeholder: "Enter password",
      valueRef: passwordRef,
      inputRef: inputPasswordRef,
      disable: _.isNull(props.dataInit),
    },
  ];

  const selects = [
    {
      value: accountType,
      setValue: setAccountType,
      isFocus: isFocusAccountType,
      setIsFocus: setIsFocusAccountType,
      data: accountTypeData,
      label: "Account type",
      isSearch: true,
      icon: (
        <FontAwesome6
          style={styles.icon}
          color={isFocusAccountType ? colors.text : "grey"}
          name="address-card"
          size={13}
        />
      ),
    },
    {
      value: role,
      setValue: setRole,
      isFocus: isFocusRole,
      setIsFocus: setIsFocusRole,
      data: roles.map((item) => ({ label: item.name, value: item.id ?? "" })),
      label: "Role",
      isSearch: true,
      icon: (
        <FontAwesome6
          style={styles.icon}
          color={isFocusRole ? colors.text : "grey"}
          name="shield-halved"
          size={13}
        />
      ),
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
      dataInit={props.dataInit}
      isOpen={props.isOpen}
      isLoading={isLoading}
      title="user"
      handleConfirm={handleConfirm}
      handleClose={handleClose}
    >
      <ModalFieldList fields={fields} selects={selects} switchs={switchs} />
      <Upload
        setPreviewUri={setPreviewUri}
        previewUri={previewUri}
        fileNameRef={fileNameRef}
      />
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  icon: {
    marginRight: 8.5,
    marginTop: 1.5,
  },
});

export default ModalUser;
