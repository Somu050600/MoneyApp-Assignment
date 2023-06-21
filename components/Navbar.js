import React from "react";
import { View, Button, StyleSheet } from "react-native";

const Navbar = ({ onDownload }) => {
  return (
    <View style={styles.container}>
      <Button title="Download" onPress={onDownload} elevation={0} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    backgroundColor: "#2196F3",
    borderRadius: 25,
    margin: 5,
  },
});

export default Navbar;
