import { colors } from "@/constants/tokens";
import { inputValidator, selectValidator } from "@/helpers/validator";
import { useAppDispatch } from "@/redux/hooks";
import { fetchPermission } from "@/redux/slice/PermissionSlice";
import { callCreatePermission, callUpdatePermission } from "@/services/api";
import { IPermission } from "@/types/backend";
import { FontAwesome6 } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import { showMessage } from "react-native-flash-message";
import CustomModal from "../modal/CustomModal";
import ModalFieldList from "../modal/ModalFieldList";

interface IProps {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
  dataInit?: IPermission | null;
  setDataInit?: (v: IPermission | null) => void;
  currentPage: number;
}

const methodData = [
  { label: "GET", value: "GET" },
  { label: "POST", value: "POST" },
  { label: "PATCH", value: "PATCH" },
  { label: "DELETE", value: "DELETE" },
];

const moduleData = [
  { label: "USER", value: "USER" },
  { label: "TRACK", value: "TRACK" },
  { label: "ROLE", value: "ROLE" },
  { label: "PERMISSION", value: "PERMISSION" },
  { label: "PLAYLIST", value: "PLAYLIST" },
];

const ModalPermission = (props: IProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [module, setModule] = useState("");
  const [method, setMethod] = useState("");
  const [isFocusModule, setIsFocusModule] = useState(false);
  const [isFocusMethod, setIsFocusMethod] = useState(false);

  const nameRef = useRef("");
  const apiPathRef = useRef("");
  const inputNameRef = useRef<TextInput>(null);
  const inputApiPathRef = useRef<TextInput>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (props.dataInit) {
      setMethod(props.dataInit.method ?? "");
      setModule(props.dataInit.module ?? "");
      nameRef.current = props.dataInit.name;
      apiPathRef.current = props.dataInit.apiPath;
      inputApiPathRef.current?.setNativeProps({ text: props.dataInit.apiPath });
      inputNameRef.current?.setNativeProps({ text: props.dataInit.name });
    }
  }, [props.isOpen]);

  const handleClose = () => {
    if (props.setDataInit) props.setDataInit(null);
    props.setIsOpen(false);
    nameRef.current = "";
    apiPathRef.current = "";
    inputNameRef.current?.clear();
    inputApiPathRef.current?.clear();
    setMethod("");
    setModule("");
    setIsLoading(false);
  };

  const handleConfirm = async () => {
    const validateInputFields = [
      { ref: nameRef, name: "name" },
      { ref: apiPathRef, name: "api path" },
    ];
    const validateSelectFields = [
      { label: "method", value: method },
      { label: "module", value: module },
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
    const res =
      props.dataInit && props.dataInit.id
        ? await callUpdatePermission(props.dataInit.id, {
            name: nameRef.current,
            apiPath: apiPathRef.current,
            method,
            module,
          })
        : await callCreatePermission({
            name: nameRef.current,
            apiPath: apiPathRef.current,
            method,
            module,
          });
    setIsLoading(false);
    if (res.result) {
      dispatch(fetchPermission(`pageSize=9&pageNumber=${props.currentPage}`));
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
      icon: <FontAwesome6 name="tag" size={14} color="grey" />,
      placeholder: "Enter name",
      valueRef: nameRef,
      inputRef: inputNameRef,
    },
    {
      name: "Api path",
      icon: <FontAwesome6 name="link" size={13} color="grey" />,
      placeholder: "Enter api path",
      valueRef: apiPathRef,
      inputRef: inputApiPathRef,
    },
  ];

  const selects = [
    {
      value: method,
      setValue: setMethod,
      isFocus: isFocusMethod,
      setIsFocus: setIsFocusMethod,
      data: methodData,
      label: "Method",
      isSearch: true,
      icon: (
        <FontAwesome6
          style={styles.icon}
          color={isFocusMethod ? colors.text : "grey"}
          name="code"
          size={13}
        />
      ),
    },
    {
      value: module,
      setValue: setModule,
      isFocus: isFocusModule,
      setIsFocus: setIsFocusModule,
      data: moduleData,
      label: "Module",
      isSearch: true,
      icon: (
        <FontAwesome6
          style={styles.icon}
          color={isFocusModule ? colors.text : "grey"}
          name="shield-halved"
          size={13}
        />
      ),
    },
  ];

  return (
    <CustomModal
      dataInit={props.dataInit}
      isOpen={props.isOpen}
      isLoading={isLoading}
      title="permission"
      handleConfirm={handleConfirm}
      handleClose={handleClose}
    >
      <ModalFieldList fields={fields} selects={selects} />
    </CustomModal>
  );
};

export default ModalPermission;

const styles = StyleSheet.create({
  icon: {
    marginRight: 8.5,
    marginTop: 1.5,
  },
});
