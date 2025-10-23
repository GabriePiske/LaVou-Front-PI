import React from "react";
import { StatusBar } from "react-native";
import HomeScreen from "../../src/screens/HomeScreen";

export default function Page() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <HomeScreen />
    </>
  );
}