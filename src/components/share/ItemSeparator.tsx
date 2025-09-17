import { utilsStyles } from "@/styles";
import { View } from "react-native";

interface IProps {
  marginVertical: number;
  marginLeft: number;
}

const ItemDivider = (props: IProps) => {
  return (
    <View
      style={{
        ...utilsStyles.itemSeparator,
        marginVertical: props.marginVertical,
        marginLeft: props.marginLeft,
      }}
    />
  );
};

export default ItemDivider;
