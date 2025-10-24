import React from "react";
import { StatusBar } from "react-native";
import MinhasReservasScreen from "../../src/screens/MinhasReservasScreen";

export default function Page() {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <MinhasReservasScreen />
    </>
  );
}
