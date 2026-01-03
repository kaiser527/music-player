import { colors, fontSize } from "@/constants/tokens";
import { useGetAccount } from "@/hooks/data/useGetAccount";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

interface IProps {
  hideChildren?: boolean;
  children: React.ReactNode;
  permission: { method: string; apiPath: string; module: string };
}

const Access = (props: IProps) => {
  const { permission, hideChildren = false } = props;
  const [allow, setAllow] = useState<boolean>(true);
  const { user } = useGetAccount(false);
  const permissions = user.role.permission;

  useEffect(() => {
    if (user) {
      const check = permissions.find(
        (item) =>
          item.apiPath === permission.apiPath &&
          item.method === permission.method &&
          item.module === permission.module
      );
      if (check) {
        setAllow(true);
      } else setAllow(false);
    }
  }, [permissions]);

  return (
    <>
      {allow === true ? (
        <>{props.children}</>
      ) : (
        <>
          {hideChildren === false ? (
            <View style={styles.container}>
              <Text style={styles.title}>Access Denied</Text>
              <Text style={styles.subTitle}>
                You are not authorized to view this content.
              </Text>
            </View>
          ) : (
            <>{/* render nothing */}</>
          )}
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 24,
    flex: 1,
  },
  title: {
    fontSize: fontSize.lg - 2,
    fontWeight: "600",
    marginBottom: 8,
    color: colors.text,
  },
  subTitle: {
    fontSize: fontSize.sm - 1,
    color: "#666",
    textAlign: "center",
    paddingHorizontal: 20,
  },
});

export default Access;
