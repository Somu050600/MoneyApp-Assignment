import React from "react";
import { TextInput, View, StyleSheet } from "react-native";

const GridInput = ({ value, onChange }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChange}
        underlineColorAndroid="transparent"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    width: 100,
  },
});

export default GridInput;
