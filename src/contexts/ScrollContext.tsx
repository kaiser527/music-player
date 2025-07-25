import React, { createContext, useContext, useState } from "react";
import { NativeScrollEvent, NativeSyntheticEvent } from "react-native";

interface ScrollContextType {
  isScrolled: boolean;
  handleScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

export const ScrollProvider = ({ children }: { children: React.ReactNode }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setTimeout(() => {
      setIsScrolled(offsetY > 60);
    }, 100);
  };

  return (
    <ScrollContext.Provider value={{ isScrolled, handleScroll }}>
      {children}
    </ScrollContext.Provider>
  );
};

export const useScroll = () => {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error("useScroll must be used within a ScrollProvider");
  }
  return context;
};
