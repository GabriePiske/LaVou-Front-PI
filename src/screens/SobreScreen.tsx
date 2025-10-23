// src/screens/SobreScreen.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  Platform,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Svg, { Path } from "react-native-svg";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

const COLORS = {
  primary: "#334DB3",
  text: "#0F172A",
  sub: "#6B7280",
  white: "#FFFFFF",
  lightBlue: "#E4E8FF",
};

export default function SobreScreen() {
  const router = useRouter();
  const [pressed, setPressed] = useState(false);

  const total = 3;
  const active = 1;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* ONDA SUPERIOR */}
      <View style={styles.headerWaveWrap}>
        <Svg width={width} height={190} viewBox={`0 0 ${width} 190`}>
          <Path
            d={`M0,0 L${width},0 L${width},130 C${width * 0.7},170 ${width * 0.3},110 0,150 Z`}
            fill={COLORS.primary}
          />
        </Svg>

        {/* Seta voltar */}
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color={COLORS.white} />
        </TouchableOpacity>

        {/* Logo */}
        <Image
          source={require("../../assets/images/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* CONTEÚDO CENTRAL */}
      <View style={styles.content}>
        {/* Imagem ilustrativa (sobre1.png) */}
        <View style={styles.illustration}>
          <Image
            source={require("../../assets/images/sobre1.png")}
            style={styles.illustrationImage}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.title}>
          Verifique a disponibilidade{"\n"}das máquinas
        </Text>

        <Text style={styles.subtitle}>
          Veja a disponibilidade das máquinas em tempo real{"\n"}
          e selecione a ideal para as suas necessidades{"\n"}
          de lavanderia. Chega de filas!
        </Text>

        {/* Indicadores */}
        <View style={styles.dots}>
          {Array.from({ length: total }).map((_, i) => (
            <View key={i} style={[styles.dot, i === active && styles.dotActive]} />
          ))}
        </View>
      </View>

      {/* RODAPÉ */}
      <View style={styles.footer}>
        <Svg width={width} height={140} viewBox={`0 0 ${width} 140`} style={StyleSheet.absoluteFill}>
          <Path
            d={`M0,45 C${width * 0.25},85 ${width * 0.75},5 ${width},55 L${width},140 L0,140 Z`}
            fill={COLORS.primary}
          />
        </Svg>

        <TouchableOpacity style={styles.skipBtn} onPress={() => router.replace("/")}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>

        {/* Botão circular branco com seta azul */}
        <TouchableOpacity
          style={[styles.nextFab, pressed && { backgroundColor: COLORS.lightBlue }]}
          onPress={() => router.push("/")}
          activeOpacity={0.8}
          onPressIn={() => setPressed(true)}
          onPressOut={() => setPressed(false)}
        >
          <Ionicons name="arrow-forward" size={20} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

/* ---------------- ESTILOS ---------------- */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },

  headerWaveWrap: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },

  backBtn: {
    position: "absolute",
    top: Platform.select({ ios: 90, android: 65 }),
    left: 24,
    height: 38,
    width: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },

  logo: {
    position: "absolute",
    top: Platform.select({ ios: 80, android: 55 }),
    alignSelf: "center",
    width: 130,
    height: 42,
  },

  content: {
    flex: 1,
    paddingHorizontal: 26,
    alignItems: "center",
  },

  illustration: {
    width: width * 0.58,
    height: width * 0.58,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 16,
  },
  illustrationImage: {
    width: "100%",
    height: "100%",
  },

  title: {
    textAlign: "center",
    color: COLORS.primary,
    fontSize: 20,
    fontWeight: "800",
    lineHeight: 26,
    marginTop: 4,
  },

  subtitle: {
    textAlign: "center",
    color: COLORS.sub,
    fontSize: 13,
    lineHeight: 18,
    marginTop: 10,
  },

  dots: {
    flexDirection: "row",
    gap: 8,
    marginTop: 12,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#D6DBFF",
  },
  dotActive: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
  },

  footer: {
    height: Math.max(120, height * 0.15),
    justifyContent: "flex-end",
    paddingHorizontal: 22,
    paddingBottom: 26,
  },

  skipBtn: {
    position: "absolute",
    left: 22,
    bottom: 26,
    paddingVertical: 8,
    paddingHorizontal: 6,
  },
  skipText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "600",
  },

  nextFab: {
    position: "absolute",
    right: 22,
    bottom: 20,
    height: 44,
    width: 44,
    borderRadius: 22,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 6,
  },
});
