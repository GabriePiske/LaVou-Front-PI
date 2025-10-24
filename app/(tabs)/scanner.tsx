import React from "react";
import { StatusBar } from "react-native";

import ScannerScreen from "../../src/screens/ScannerScreen";

export default function Page() {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <ScannerScreen />
    </>
  );
}
