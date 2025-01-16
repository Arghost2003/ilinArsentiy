import { StyleSheet } from "react-native";

export const publicColors = {
  background: "#E4F1F8",
  primary: "#3787FF",
  textDark: "#060302",
  textLight: "#767372",
  error: "#F04438",
};

export const publicStyles = StyleSheet.create({
  H1: {
    fontFamily: "DMSans_500Medium",
    fontSize: 29.86,
    letterSpacing: -0.03,
    color: publicColors.textDark,
  },
  H4: {
    fontFamily: "DMSans_500Medium",
    fontSize: 17.28,
    color: publicColors.textDark,
  },
  H5: {
    fontFamily: "DMSans_500Medium",
    fontSize: 14.4,
    letterSpacing: -0.01,
    color: publicColors.textDark,
  },
  H6: {
    fontFamily: "DMSans_500Medium",
    fontSize: 12,
    color: publicColors.textDark,
  },
});
