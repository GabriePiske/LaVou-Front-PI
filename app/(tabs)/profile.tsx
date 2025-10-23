import React from "react";
import { StatusBar } from "react-native";
import ProfileScreen from "../../src/screens/ProfileScreen"; 

export default function Page() {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <ProfileScreen />
    </>
  );
}
