import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";

type Order = { id: string; machine: string; remaining: string };
const ORDERS: Order[] = [
  { id: "1", machine: "Máquina 3", remaining: "Faltam 3 min" },
  { id: "2", machine: "Máquina 11", remaining: "Faltam 9 min" },
];

const COLORS = {
  bg: "#f7f7fb",
  text: "#0f172a",
  sub: "#6b7280",
  card: "#ffffff",
  primary: "#2f46a8",
  primaryDark: "#263a8e",
  primarySoft: "#dbe3ff",
  ring: "rgba(82, 106, 202, 0.15)",
};

export default function HomeScreen() {
  const router = useRouter();

  const goToLocalizacao = () => {
    router.push("/localizacao");
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <View>
            <Text style={styles.hello}>Olá, Joanna!</Text>
          </View>

          <View style={styles.headerActions}>
            {/* Ícone de notificações */}
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => router.push("/notifications")}
            >
              <Ionicons name="notifications-outline" size={18} color="#445" />
            </TouchableOpacity>

            {/* Ícone de informações (Sobre) */}
            <TouchableOpacity
              style={[styles.iconButton, styles.infoButton]}
              onPress={() => router.push("/sobre")}
            >
              <Ionicons name="information-circle-outline" size={18} color="#445" />
            </TouchableOpacity>
          </View>
        </View>

        {/* CARTÃO DE ENDEREÇO */}
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.addressCard}
          onPress={goToLocalizacao}
        >
          <View style={styles.addressLeft}>
            <View style={styles.playCircle}>
              <Ionicons name="play" size={14} color="#e9efff" style={{ marginLeft: 1 }} />
            </View>
            <View>
              <Text style={styles.addressTitle}>Casa</Text>
              <Text style={styles.addressSubtitle}>Três Vendas, Pelotas</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#e9efff" />
        </TouchableOpacity>

        {/* MAPA */}
        <Text style={styles.sectionTitle}>Buscar Locais</Text>

        <TouchableOpacity activeOpacity={0.9} style={styles.mapCard} onPress={goToLocalizacao}>
          <MapView
            pointerEvents="none"
            style={styles.map}
            initialRegion={{
              latitude: -31.7715,
              longitude: -52.3425,
              latitudeDelta: 0.03,
              longitudeDelta: 0.03,
            }}
          >
            <Marker coordinate={{ latitude: -31.7715, longitude: -52.3425 }} />
          </MapView>
        </TouchableOpacity>

        {/* AÇÕES */}
        <Text style={[styles.sectionTitle, { marginTop: 10 }]}>O que você quer fazer hoje?</Text>

        <View style={styles.actionRow}>
          <ActionCard
            icon={<MaterialCommunityIcons name="washing-machine" size={24} color="#3d5cba" />}
            title="Lavar"
            subtitle="Agende facilmente sua lavagem."
            onPress={() => {}}
          />
          <ActionCard
            icon={<MaterialCommunityIcons name="tumble-dryer" size={24} color="#3d5cba" />}
            title="Secar"
            subtitle="Tenha ciclos de secagem rápidos e eficientes."
            onPress={() => {}}
          />
        </View>

        {/* PEDIDOS */}
        <Text style={[styles.sectionTitle, { marginTop: 12 }]}>Pedidos em andamento</Text>

        <FlatList
          data={ORDERS}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
          renderItem={({ item }) => <OrderItem order={item} />}
          contentContainerStyle={{ paddingTop: 6 }}
        />
      </View>

      {/* FOOTER */}
      <BottomBar />
    </SafeAreaView>
  );
}

/* ---------------- COMPONENTES ---------------- */

const ActionCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  onPress: () => void;
}> = ({ icon, title, subtitle, onPress }) => (
  <TouchableOpacity activeOpacity={0.9} onPress={onPress} style={styles.actionCard}>
    <View style={styles.actionIconWrap}>{icon}</View>
    <Text style={styles.actionTitle}>{title}</Text>
    <Text style={styles.actionSubtitle}>{subtitle}</Text>
  </TouchableOpacity>
);

const OrderItem: React.FC<{ order: Order }> = ({ order }) => (
  <TouchableOpacity activeOpacity={0.9} style={styles.orderItem}>
    <View style={styles.orderLeft}>
      <View style={styles.orderIconWrap}>
        <MaterialCommunityIcons name="washing-machine" size={16} color="#5b6bd5" />
      </View>
      <Text style={styles.orderTitle}>{order.machine}</Text>
    </View>
    <Text style={styles.orderRemaining}>{order.remaining}</Text>
  </TouchableOpacity>
);

const BottomBar: React.FC = () => {
  const router = useRouter();

  return (
    <View style={styles.tabBar}>
      <TabItem
        active
        icon={<Ionicons name="home-outline" size={20} color="#2F46A8" />}
        label="Home"
        onPress={() => router.push("/")}
      />
      <TabItem icon={<Ionicons name="scan-outline" size={20} color="#fff" />} onPress={() => {}} />
      <TabItem icon={<Ionicons name="cart-outline" size={20} color="#fff" />} onPress={() => {}} />
      <TabItem
        icon={<Ionicons name="person-outline" size={20} color="#fff" />}
        onPress={() => router.push("/(tabs)/profile")}
      />
    </View>
  );
};

const TabItem: React.FC<{
  icon: React.ReactNode;
  label?: string;
  active?: boolean;
  onPress?: () => void;
}> = ({ icon, label, active, onPress }) => {
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
};

/* ---------------- ESTILOS ---------------- */
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: Platform.select({ ios: 8, android: 12 }),
    paddingBottom: 86,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  hello: { fontSize: 22, fontWeight: "700", color: COLORS.text },
  headerActions: { flexDirection: "row", gap: 10 },
  iconButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#eef2ff",
    borderWidth: 1,
    borderColor: COLORS.ring,
  },
  infoButton: { backgroundColor: "#eef2ff" },
  addressCard: {
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: COLORS.primaryDark,
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  addressLeft: { flexDirection: "row", alignItems: "center", gap: 10 },
  playCircle: {
    height: 28,
    width: 28,
    borderRadius: 14,
    backgroundColor: "#3b53bb",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
  },
  addressTitle: { color: "#e9efff", fontSize: 16, fontWeight: "700" },
  addressSubtitle: { color: "#d7ddff", fontSize: 12, marginTop: 1 },
  sectionTitle: {
    marginTop: 16,
    marginBottom: 8,
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.text,
  },
  mapCard: {
    borderRadius: 14,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#e6ebff",
  },
  map: { height: 140, width: "100%" },
  actionRow: { flexDirection: "row", gap: 12 },
  actionCard: {
    flex: 1,
    backgroundColor: "#fbfcff",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#e9edff",
    padding: 14,
  },
  actionIconWrap: {
    height: 34,
    width: 34,
    borderRadius: 10,
    backgroundColor: "#e9edff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  actionTitle: { fontSize: 14, fontWeight: "700", color: COLORS.text, marginBottom: 4 },
  actionSubtitle: { fontSize: 12, color: COLORS.sub, lineHeight: 16 },
  orderItem: {
    backgroundColor: "#f6f8ff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e1e7ff",
    paddingVertical: 12,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  orderLeft: { flexDirection: "row", alignItems: "center", gap: 10 },
  orderIconWrap: {
    width: 26,
    height: 26,
    borderRadius: 8,
    backgroundColor: "#e9edff",
    alignItems: "center",
    justifyContent: "center",
  },
  orderTitle: { fontSize: 13, fontWeight: "600", color: "#273055" },
  orderRemaining: { fontSize: 12, color: "#4a5dd1", fontWeight: "700" },
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
