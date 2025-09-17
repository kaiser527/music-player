import ItemDivider from "@/components/share/ItemSeparator";
import { colors, fontSize } from "@/constants/tokens";
import { IPermission } from "@/types/backend";
import _ from "lodash";
import React, { useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import Accordion from "react-native-collapsible/Accordion";
import PermissionList from "./PermissionList";

interface IList {
  module: string;
  permissions: IPermission[];
  allCheck: boolean;
}

interface IProps {
  lisPermissions: IList[];
  setListPermissions: (v: IList[]) => void;
}

const ModuleApi = (props: IProps) => {
  const [activeSections, setActiveSections] = useState<number[]>([]);

  const handleSwitchAll = (value: boolean, module: string) => {
    const listPermissionClone = _.cloneDeep(props.lisPermissions);
    const index = listPermissionClone.findIndex(
      (item) => item.module === module
    );
    listPermissionClone[index].allCheck = value;
    listPermissionClone[index].permissions.forEach((item) => {
      item.isChecked = value;
    });
    props.setListPermissions(listPermissionClone);
  };

  const handleSingleSwitch = (
    value: boolean,
    permissionId: string,
    module: string
  ) => {
    const listPermissionClone = _.cloneDeep(props.lisPermissions);
    const indexL = listPermissionClone.findIndex(
      (item) => item.module === module
    );
    const indexP = listPermissionClone[indexL].permissions.findIndex(
      (item) => item.id === permissionId
    );
    listPermissionClone[indexL].permissions[indexP].isChecked = value;
    listPermissionClone[indexL].allCheck = listPermissionClone[
      indexL
    ].permissions.every((item) => item.isChecked);
    props.setListPermissions(listPermissionClone);
  };

  return (
    <View style={styles.wrapper}>
      <Accordion
        sections={props.lisPermissions}
        activeSections={activeSections}
        expandMultiple={true}
        renderHeader={(section, _, isActive) => (
          <View style={{ paddingRight: 28 }}>
            <View style={styles.accordionHeader}>
              <Text style={styles.accordionTitle}>{section.module}</Text>
              <Switch
                style={{ transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }] }}
                trackColor={{
                  false: "#767577",
                  true: "rgba(252, 60, 68, 0.15)",
                }}
                onValueChange={(v) => handleSwitchAll(v, section.module)}
                thumbColor={section.allCheck ? colors.primary : "#f4f3f4"}
                value={section.allCheck}
              />
            </View>
            {!isActive && <ItemDivider marginLeft={28} marginVertical={4} />}
          </View>
        )}
        renderContent={(section) => (
          <PermissionList
            module={section.module}
            handleSingleSwitch={handleSingleSwitch}
            permissions={section.permissions}
          />
        )}
        onChange={setActiveSections}
        touchableProps={{
          activeOpacity: 1,
          underlayColor: "transparent",
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#252525",
    width: "100%",
    borderRadius: 8,
    paddingVertical: 10,
  },
  accordionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginHorizontal: 10,
    marginRight: -18,
  },
  accordionTitle: {
    color: colors.primary,
    fontSize: fontSize.sm - 3,
    fontWeight: "600",
    marginTop: 3,
  },
});

export default ModuleApi;
