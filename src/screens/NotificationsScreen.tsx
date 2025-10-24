import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useMemo } from "react";
import {
  Platform,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Notif = {
  id: string;
  icon: "chat" | "ticket" | "check";
  title: string;
  time: string;
  highlight?: boolean;
};

type SectionData = { title: string; data: Notif[] };

const BLUE = "#354EB6";
const SOFT = "#EEF2FF";
const TEXT = "#0F172A";
const SUB = "#6B7280";
const LIGHT_BLUE = "#5B6BD5";

export default function NotificationsScreen() {
  const router = useRouter();

  const sections: SectionData[] = useMemo(
    () => [
      {
        title: "Hoje",
        data: [
          { id: "n1", icon: "check", title: "Sua lavagem está pronta!", time: "Agora", highlight: true },
          { id: "n2", icon: "ticket", title: "Desconto de 50% disponível!", time: "3:00 PM" },
          { id: "n3", icon: "ticket", title: "Você possui um novo cupom disponível!", time: "11:00 AM" },
        ],
      },
      {
        title: "06 Out 2025",
        data: [
          { id: "n4", icon: "chat", title: "Sua reserva expira em 10 min!", time: "11:47 PM" },
          { id: "n5", icon: "ticket", title: "Desconto semanal disponível!", time: "9:08 PM" },
          { id: "n6", icon: "chat", title: "Lavagem agendada para hoje!", time: "9:00 PM" },
          { id: "n7", icon: "chat", title: "Indique amigos e ganhe lavagens grátis!", time: "6:45 PM" },
          { id: "n8", icon: "check", title: "Máquina de lavar disponível!", time: "8:52 AM" },
          { id: "n9", icon: "chat", title: "Atualização disponível – veja o que mudou!", time: "8:50 AM" },
          { id: "n10", icon: "chat", title: "Todas as máquinas estão ocupadas, tente novamente em alguns minutos.", time: "8:50 AM" },
        ],
      },
    ],
    []
  );

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.push("/")}>
            <Ionicons name="arrow-back" size={22} color={TEXT} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Notificações</Text>
          <View style={{ width: 36 }} />
        </View>
      </View>

      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 120 }}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 14 }} />}
        renderItem={({ item }) => <NotificationRow n={item} />}
      />

      <BottomBar />
    </View>
  );
}

function NotificationRow({ n }: { n: Notif }) {
  return (
    <View style={styles.row}>
      <View style={styles.left}>
        <View style={styles.iconWrap}>
          {n.icon === "chat" && (
            <Ionicons name="chatbubble-ellipses-outline" size={16} color={BLUE} />
          )}
          {n.icon === "ticket" && (
            <MaterialCommunityIcons name="ticket-percent-outline" size={16} color={BLUE} />
          )}
          {n.icon === "check" && (
            <Ionicons name="checkmark-circle" size={16} color={BLUE} />
          )}
        </View>
        <Text style={styles.title}>{n.title}</Text>
      </View>
      <Text style={[styles.time, n.highlight && { color: LIGHT_BLUE }]}>{n.time}</Text>
    </View>
  );
}

function BottomBar() {
  const router = useRouter();
  return (
    <View style={styles.tabBar}>
      <TabItem
        icon={<Ionicons name="home-outline" size={20} color="#fff" />}
        onPress={() => router.push("/")}
      />
      <TabItem icon={<Ionicons name="scan-outline" size={20} color="#fff" />} onPress={() => {}} />
      <TabItem icon={<Ionicons name="cart-outline" size={20} color="#fff" />} 
      onPress={() => router.push("/(tabs)/minhasReservas")} />
      <TabItem
        icon={<Ionicons name="person-outline" size={20} color="#fff" />}
        onPress={() => router.push("/(tabs)/profile")}
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

/* ----------------------------- ESTILOS ----------------------------- */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  header: {
    paddingTop: Platform.select({ ios: 65, android: 45 }),
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
    backgroundColor: "#fff",
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  backBtn: {
    height: 36,
    width: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F3F4F6",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
    color: TEXT,
  },

  sectionHeader: {
    marginTop: 16,
    marginBottom: 8,
    color: SUB,
    fontSize: 12,
    fontWeight: "700",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  left: { flexDirection: "row", alignItems: "center", gap: 10, flex: 1 },
  iconWrap: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: SOFT,
    alignItems: "center",
    justifyContent: "center",
  },
  title: { color: TEXT, fontSize: 14, fontWeight: "600", flexShrink: 1 },
  time: { color: SUB, fontSize: 11, marginLeft: 8 },

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
