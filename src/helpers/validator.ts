import { IRole } from "@/types/backend";
import { RefObject } from "react";

export const inputValidator = (
  fields: { ref: RefObject<string>; name: string }[]
) => {
  let isValid: boolean = true,
    output: string = "";

  fields.forEach((item) => {
    if (item.ref.current.length === 0) {
      output = item.name;
      isValid = false;
    }
  });

  return { isValid, output };
};

export const selectValidator = (fields: { label: string; value: string }[]) => {
  let isValid: boolean = true,
    output: string = "";

  fields.forEach((item) => {
    if (item.value.length === 0) {
      output = item.label;
      isValid = false;
    }
  });

  return { isValid, output };
};

export const isIRoleValidator = (obj: any): obj is IRole => {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj.name === "string" &&
    typeof obj.description === "string" &&
    Array.isArray(obj.permission)
  );
};

export const isIRoleArrayValidator = (data: any): data is IRole[] => {
  return Array.isArray(data) && data.every(isIRoleValidator);
};
