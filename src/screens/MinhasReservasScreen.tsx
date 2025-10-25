import React, { useEffect, useState } from "react";
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
  TextInput,
  ActivityIndicator,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage"; // 👈 usado para buscar o token
import { apiUrl } from "./config/api";

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

const machineIcons: Record<string, any> = {
  Lavadora: require("../../assets/images/Lavadora.png"),
  Secadora: require("../../assets/images/Secadora.png"),
};

export default function MinhasReservasScreen() {
  const router = useRouter();
  const [reservas, setReservas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchReservas = async () => {
    try {
      setLoading(true);

      const token = await AsyncStorage.getItem("token");

      if (!token) {
        alert("Sessão expirada. Faça login novamente.");
        router.replace("/");
        return;
      }

      const response = await fetch(`${apiUrl}/reservas/minhas`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao carregar reservas");
      }

      const data = await response.json();
      setReservas(data || []);
    } catch (error) {
      console.error(error);
      alert("Erro ao carregar reservas. Tenta novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservas();
  }, []);

  const reservasFiltradas = reservas.filter((item) =>
    item.tipo.toLowerCase().includes(search.toLowerCase())
  );

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
          <Text style={styles.headerTitle}>Minhas Reservas</Text>
          <View style={{ width: 22 }} />
        </View>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingBottom: 110 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Campo de busca */}
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#fff" />
          <TextInput
            placeholder="Pesquisar reservas..."
            placeholderTextColor="#fff"
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* Loading */}
        {loading ? (
          <ActivityIndicator size="large" color={COLORS.primary} style={{ marginTop: 50 }} />
        ) : reservasFiltradas.length === 0 ? (
          <Text style={{ textAlign: "center", color: COLORS.gray, marginTop: 20 }}>
            Nenhuma reserva encontrada.
          </Text>
        ) : (
          reservasFiltradas.map((item) => (
  <View key={item.id} style={styles.card}>
    <View style={styles.row}>
      <Image
        source={machineIcons[item.maquina?.tipo] || machineIcons.Lavadora}
        style={styles.icon}
      />
      <View style={{ flex: 1 }}>
        <Text style={styles.tipo}>{item.maquina?.tipo}</Text>
        <Text style={styles.local}>
          {item.maquina?.lavanderia?.nomeFantasia || "Lavanderia não informada"}
        </Text>
        <Text style={styles.data}>
          {new Date(item.inicio).toLocaleString("pt-BR")}
        </Text>
        <Text
          style={[
            styles.status,
            item.pagamento?.status === "PAGO"
              ? styles.statusCompleta
              : item.pagamento?.status === "PENDENTE"
              ? styles.statusAndamento
              : styles.statusCancelada,
          ]}
        >
          {item.pagamento?.status === "PAGO"
            ? "Completa"
            : item.pagamento?.status === "PENDENTE"
            ? "Em andamento"
            : "Cancelada"}
        </Text>
      </View>
    </View>
  </View>
))
        )}
      </ScrollView>

      <BottomBar />
    </View>
  );
}

/* BARRA INFERIOR */
function BottomBar() {
  const router = useRouter();
  return (
    <View style={styles.tabBar}>
      <TabItem
        icon={<Ionicons name="home-outline" size={20} color="#fff" />}
        onPress={() => router.replace("/")}
      />
      <TabItem
        icon={<Ionicons name="scan-outline" size={20} color="#fff" />}
        onPress={() => router.push("/(tabs)/scanner")}
      />
      <TabItem
        icon={<Ionicons name="cart-outline" size={20} color="#17108fff" />}
        active
        label="reservas"
      />
      <TabItem
        icon={<Ionicons name="person-outline" size={20} color="#fff" />}
        onPress={() => router.push("/(tabs)/profile")}
      />
    </View>
  );
}

function TabItem({ icon, label, active, onPress }: any) {
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

  content: { flex: 1, paddingHorizontal: 20, marginTop: 20 },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginBottom: 18,
  },
  searchInput: { flex: 1, marginLeft: 8, color: "#fff" },

  card: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  row: { flexDirection: "row", alignItems: "center", gap: 12 },
  icon: { width: 50, height: 50, resizeMode: "contain" },
  tipo: { fontSize: 16, fontWeight: "700", color: COLORS.text },
  local: { fontSize: 13, color: COLORS.gray, marginTop: 2 },
  data: { fontSize: 12, color: "#999", marginTop: 2 },
  status: { fontSize: 13, fontWeight: "700", marginTop: 6 },
  statusCompleta: { color: "#2F46A8" },
  statusAndamento: { color: "#FFA500" },
  statusCancelada: { color: "#D9534F" },

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
