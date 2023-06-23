import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const Navbar = ({ onDownload }) => {
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          color: "#fff",
          letterSpacing: 1,
        }}
      >
        Sheets
      </Text>
      <Button
        title="Download"
        color="purple"
        onPress={onDownload}
        elevation={0}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "space-between",
    height: 50,
    backgroundColor: "#2196F3",
    borderRadius: 2,
    marginBottom: 3,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: "row",
  },
});

export default Navbar;
