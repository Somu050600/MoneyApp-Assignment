import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Platform,
  Button,
} from "react-native";
import GridInput from "./components/GridInput";
import Navbar from "./components/Navbar";
import * as XLSX from "xlsx";
import * as FileSystem from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [gridData, setGridData] = useState(Array(10).fill(Array(5).fill("")));

  useEffect(() => {
    loadGridData();
  }, []);

  const loadGridData = async () => {
    try {
      const savedGridData = await AsyncStorage.getItem("gridData");
      if (savedGridData) {
        setGridData(JSON.parse(savedGridData));
      }
    } catch (error) {
      console.log("Error loading grid data:", error);
    }
  };

  const saveGridData = async () => {
    try {
      await AsyncStorage.setItem("gridData", JSON.stringify(gridData));
      console.log("Grid data saved successfully");
    } catch (error) {
      console.log("Error saving grid data:", error);
    }
  };

  const handleGridInputChange = (rowIndex, colIndex, text) => {
    const updatedGridData = [...gridData];
    updatedGridData[rowIndex] = [...updatedGridData[rowIndex]];
    updatedGridData[rowIndex][colIndex] = text;
    setGridData(updatedGridData);
  };

  const handleDownload = async () => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(gridData);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    const wbout = XLSX.write(workbook, { type: "binary", bookType: "xlsx" });
    const path = `${FileSystem.documentDirectory}data.xlsx`;

    try {
      await FileSystem.writeAsStringAsync(path, wbout, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const downloadPath = `${FileSystem.documentDirectory}Download/data.xlsx`;
      await FileSystem.moveAsync({ from: path, to: downloadPath });

      console.log("File downloaded successfully:", downloadPath);
    } catch (error) {
      console.log("Error creating or downloading file:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Navbar onDownload={handleDownload} />
      <ScrollView horizontal>
        <ScrollView>
          <View style={styles.row}>
            <View style={[styles.columnHeader, { width: 50 }]} />
            {Array(5)
              .fill()
              .map((_, colIndex) => (
                <View style={styles.columnHeader} key={colIndex}>
                  <Text style={styles.columnHeaderText}>
                    {String.fromCharCode(65 + colIndex)}
                  </Text>
                </View>
              ))}
          </View>
          {gridData.map((row, rowIndex) => (
            <View style={styles.row} key={rowIndex}>
              <View style={styles.rowHeader}>
                <Text style={styles.rowHeaderText}>{rowIndex + 1}</Text>
              </View>
              {row.map((value, colIndex) => (
                <GridInput
                  key={`${rowIndex}-${colIndex}`}
                  value={value}
                  onChange={(text) =>
                    handleGridInputChange(rowIndex, colIndex, text)
                  }
                />
              ))}
            </View>
          ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 35,
  },
  row: {
    flexDirection: "row",
  },
  columnHeader: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "auto",
    backgroundColor: "lightgray",
    borderWidth: 1.25,
    borderColor: "gray",
    width: 100,
  },
  columnHeaderText: {
    fontWeight: "bold",
    padding: 5,
  },
  rowHeader: {
    width: 50,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.25,
    borderColor: "gray",
    backgroundColor: "lightgray",
  },
  rowHeaderText: {
    fontWeight: "bold",
  },
});
