import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StatusBar,
  Platform,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

const COLORS = {
  primary: "#334DB3",
  lightPrimary: "#CFE0FF",
  bg: "#FFFFFF",
  text: "#0F172A",
  gray: "#6B7280",
  white: "#FFFFFF",
  softCard: "#EEF2FF",
};

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <Svg width={width} height={120} viewBox={`0 0 ${width} 120`} style={styles.wave}>
          <Path
            d={`M0,70 Q ${width * 0.35},30 ${width * 0.65},50 T ${width},30 L ${width},120 L 0,120 Z`}
            fill={COLORS.white}
          />
        </Svg>

        <View style={styles.headerBar}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.replace("/")}>
            <Ionicons name="arrow-back" size={22} color={COLORS.white} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Perfil</Text>
          <View style={{ width: 22 }} />
        </View>
      </View>

      {/* CONTEÚDO */}
      <ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingBottom: 110 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.centerBox}>
          <Image source={{ uri: "https://i.pravatar.cc/150?img=47" }} style={styles.avatar} />
          <Text style={styles.name}>Joanna Matthew</Text>
          <Text style={styles.phone}>+88 8800805641</Text>

          <TouchableOpacity style={styles.editButton}>
            <Feather name="edit-2" size={14} color={COLORS.primary} />
            <Text style={styles.editText}>Editar Perfil</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.list}>
          <RowItem icon="pricetag-outline" label="Cupons" onPress={() => {}} />
          <RowItem icon="time-outline" label="Minhas Reservas" onPress={() => {}} />
          <RowItem icon="help-circle-outline" label="Perguntas Frequentes" onPress={() => router.push("/faq")} />
          <RowItem icon="headset-outline" label="Suporte" onPress={() => {}} />
          <RowItem icon="log-out-outline" label="Sair" onPress={() => {}} />
        </View>
      </ScrollView>

      <BottomBar />
    </View>
  );
}

function BottomBar() {
  const router = useRouter();
  return (
    <View style={styles.tabBar}>
      <TabItem
        icon={<Ionicons name="home-outline" size={20} color="#fff" />}
        onPress={() => router.replace("/")}
      />
      <TabItem icon={<Ionicons name="scan-outline" size={20} color="#fff" />} onPress={() => {}} />
      <TabItem icon={<Ionicons name="cart-outline" size={20} color="#fff" />} onPress={() => {}} />
      {/* Perfil ativo */}
      <TabItem
        active
        label="Perfil"
        icon={<Ionicons name="person-outline" size={20} color={COLORS.primary} />}
        onPress={() => {}}
      />
    </View>
  );
}

function TabItem({
  icon,
  label,
  active,
  onPress,
}: {
  icon: React.ReactNode;
  label?: string;
  active?: boolean;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity style={styles.tabItem} activeOpacity={0.8} onPress={onPress}>
      {active ? (
        <View style={styles.activePill}>
          {icon}
          {label && <Text style={styles.activeLabel}>{label}</Text>}
        </View>
      ) : (
        <View>{icon}</View>
      )}
    </TouchableOpacity>
  );
}

const RowItem = ({
  icon,
  label,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress?: () => void;
}) => (
  <TouchableOpacity style={styles.rowItem} activeOpacity={0.7} onPress={onPress}>
    <View style={styles.rowLeft}>
      <View style={styles.rowIcon}>
        <Ionicons name={icon} size={18} color={COLORS.primary} />
      </View>
      <Text style={styles.rowText}>{label}</Text>
    </View>
    <Ionicons name="chevron-forward" size={18} color={COLORS.gray} />
  </TouchableOpacity>
);

/* ESTILOS */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },

  header: {
    height: 180,
    backgroundColor: COLORS.primary,
    position: "relative",
    overflow: "visible",
    paddingTop: Platform.select({ ios: 60, android: 40 }),
  },
  wave: { position: "absolute", bottom: -1, left: 0 },
  headerBar: {
    position: "absolute",
    top: Platform.select({ ios: 54, android: 34 }),
    left: 16,
    right: 16,
    height: 36,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: { padding: 4 },
  headerTitle: { color: COLORS.white, fontSize: 18, fontWeight: "800" },

  content: { flex: 1, paddingHorizontal: 20 },

  centerBox: { alignItems: "center", marginTop: -40, paddingTop: 50 },
  avatar: {
    width: 92,
    height: 92,
    borderRadius: 46,
    borderWidth: 4,
    borderColor: COLORS.white,
    backgroundColor: COLORS.white,
  },
  name: { fontSize: 18, fontWeight: "800", color: COLORS.text, marginTop: 10 },
  phone: { color: COLORS.gray, marginBottom: 12 },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.lightPrimary,
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 12,
  },
  editText: { color: COLORS.primary, fontWeight: "700", marginLeft: 6 },

  list: { marginTop: 20, gap: 10 },
  rowItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.softCard,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
  },
  rowLeft: { flexDirection: "row", alignItems: "center", gap: 10 },
  rowIcon: { backgroundColor: COLORS.lightPrimary, padding: 8, borderRadius: 10 },
  rowText: { fontSize: 14, fontWeight: "700", color: COLORS.text },

  tabBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 72,
    backgroundColor: "#2F46A8",
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: Platform.select({ ios: 10, android: 8 }),
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  tabItem: { alignItems: "center", justifyContent: "center", flex: 1 },
  activePill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 30,
    paddingHorizontal: 14,
    paddingVertical: 6,
    gap: 6,
  },
  activeLabel: {
    color: "#2F46A8",
    fontSize: 13,
    fontWeight: "700",
  },
});
