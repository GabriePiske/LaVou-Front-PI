import React from "react";
import { StatusBar } from "react-native";
import FAQScreen from "../../src/screens/FAQScreen";

export default function FAQPage() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <FAQScreen />
    </>
  );
}
