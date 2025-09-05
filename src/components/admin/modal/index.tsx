import React, { ReactNode, RefObject } from "react";
import { TextInput } from "react-native-gesture-handler";
import InputFields from "./InputFields";
import SelectFields from "./SelectFields";
import SwitchFields from "./SwitchFields";

interface IProps {
  fields?: {
    valueRef: RefObject<string>;
    inputRef: RefObject<TextInput | null>;
    name: string;
    icon: ReactNode;
    placeholder: string;
  }[];
  selects?: {
    isFocus: boolean;
    setIsFocus: (v: boolean) => void;
    value: string;
    setValue: (v: string) => void;
    data: { label: string; value: string }[];
    icon: ReactNode;
    label: string;
    searchPlaceholder?: string;
    isSearch?: boolean;
  }[];
  switchs?: {
    name: string;
    value: boolean;
    setValue: (v: boolean) => void;
  }[];
}

const ModalFieldList = (props: IProps) => {
  return (
    <>
      <InputFields fields={props.fields} />
      <SwitchFields switchs={props.switchs} />
      <SelectFields selects={props.selects} />
    </>
  );
};

export default ModalFieldList;
