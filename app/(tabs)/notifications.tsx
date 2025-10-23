import React from "react";
import { StatusBar } from "react-native";
import NotificationsScreen from "../../src/screens/NotificationsScreen";

export default function Page() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <NotificationsScreen />
    </>
  );
}
