import { usePathname } from "expo-router";
import { RefObject, useEffect } from "react";
import { ScrollView } from "react-native";

export const useScrollToTop = (scrollRef: RefObject<ScrollView | null>) => {
  const pathName = usePathname();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ y: 0, animated: true });
    }
  }, [pathName]);
};
