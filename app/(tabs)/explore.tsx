import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useMemo } from "react";
import {
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

const BLUE = "#354EB6";
const SOFT = "#EEF2FF";
const TEXT = "#0F172A";
const SUB = "#6B7280";
const LIGHT_BLUE = "#5B6BD5";

export default function NotificationsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const sections = useMemo(
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
    <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
      <View style={styles.container}>
        <View style={[styles.header, { paddingTop: Math.max(insets.top, 8) }]}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={22} color={TEXT} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Notificações</Text>
          <View style={{ width: 22 }} />
        </View>

        <SectionList
          sections={sections}
          keyExtractor={(item) => item.id}
          stickySectionHeadersEnabled={false}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.sectionHeader}>{title}</Text>
          )}
          ItemSeparatorComponent={() => <View style={{ height: 14 }} />}
          renderItem={({ item }) => <Row n={item} />}
        />
      </View>
    </SafeAreaView>
  );
}

function Row({ n }: { n: { id: string; icon: "chat" | "ticket" | "check"; title: string; time: string; highlight?: boolean } }) {
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

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  container: { flex: 1, backgroundColor: "#fff" },

  header: {
    paddingHorizontal: 16,
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  backBtn: {
    position: "absolute",
    left: 16,
    height: 34,
    width: 34,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: TEXT,
  },

  sectionHeader: {
    marginTop: 10,
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
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
  },
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
});
