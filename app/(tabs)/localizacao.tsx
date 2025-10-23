import React from "react";
import { StatusBar } from "react-native";
import LocalizacaoScreen from "../../src/screens/LocalizacaoScreen";

export default function Page() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <LocalizacaoScreen />
    </>
  );
}
