import { colors } from "@/constants/tokens";
import { IMeta } from "@/types/backend";
import { Entypo } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

interface IProps {
  setCurrentPage: (v: any) => void;
  currentPage: number;
  meta: IMeta;
}

const Pagination = (props: IProps) => {
  return (
    <View style={styles.pagination}>
      {/* Prev Button */}
      <TouchableOpacity
        disabled={props.currentPage === 1}
        onPress={() =>
          props.setCurrentPage((prev: number) => Math.max(prev - 1, 1))
        }
        style={[
          styles.pageButton,
          props.currentPage === 1 && styles.pageButtonDisabled,
        ]}
      >
        <Entypo name="chevron-left" size={20} color="#fff" />
      </TouchableOpacity>

      {/* Page Numbers */}
      <View style={styles.pageNumbersWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.pageNumbersContainer}
        >
          <View style={{ flexDirection: "row", gap: 8 }}>
            {Array.from({ length: props.meta.totalPages || 1 }, (_, i) => i + 1)
              .filter((page) => {
                // show first, last, current, and nearby pages
                return (
                  page === 1 ||
                  page === (props.meta.totalPages || 1) ||
                  Math.abs(page - props.currentPage) <= 2
                );
              })
              .map((page, idx, arr) => (
                <React.Fragment key={page}>
                  {/* Add "..." where pages are skipped */}
                  {idx > 0 && arr[idx] - arr[idx - 1] > 1 && (
                    <Text style={styles.pageDots}>...</Text>
                  )}
                  <TouchableOpacity
                    onPress={() => props.setCurrentPage(page)}
                    style={[
                      styles.pageNumber,
                      props.currentPage === page && styles.pageNumberActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.pageNumberText,
                        props.currentPage === page &&
                          styles.pageNumberTextActive,
                      ]}
                    >
                      {page}
                    </Text>
                  </TouchableOpacity>
                </React.Fragment>
              ))}
          </View>
        </ScrollView>
      </View>

      {/* Next Button */}
      <TouchableOpacity
        disabled={props.currentPage === (props.meta.totalPages || 1)}
        onPress={() =>
          props.setCurrentPage((prev: number) =>
            Math.min(prev + 1, props.meta.totalPages || prev + 1)
          )
        }
        style={[
          styles.pageButton,
          props.currentPage === (props.meta.totalPages || 1) &&
            styles.pageButtonDisabled,
        ]}
      >
        <Entypo name="chevron-right" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  pagination: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    marginTop: 15,
  },
  pageNumbersWrapper: {
    flex: 1,
    alignItems: "center",
  },
  pageButton: {
    backgroundColor: "#1f1f1f",
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#444",
  },
  pageNumbersContainer: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  pageButtonDisabled: {
    opacity: 0.4,
  },

  pageNumber: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#444",
    backgroundColor: "#1f1f1f",
  },
  pageNumberActive: {
    borderColor: colors.primary,
  },
  pageNumberText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
  pageNumberTextActive: {
    color: colors.primary,
    fontWeight: "700",
  },
  pageDots: {
    color: "#999",
    fontSize: 14,
    alignSelf: "center",
  },
});

export default Pagination;
