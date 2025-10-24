import React, { useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  Platform,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import Svg, { Path } from "react-native-svg"

const { width } = Dimensions.get("window")

const COLORS = {
  primary: "#334DB3",
  lightPrimary: "#CFE0FF",
  bg: "#FFFFFF",
  text: "#0F172A",
  gray: "#6B7280",
  softCard: "#EEF2FF",
  white: "#FFFFFF",
}

export default function FAQScreen() {
  const [search, setSearch] = useState("")
  const router = useRouter()

  const perguntas = [
    "Como faço para reservar uma máquina?",
    "Posso cancelar minha reserva?",
    "O que acontece se eu chegar atrasado?",
    "Como funciona o pagamento?",
    "Qual a diferença entre os ciclos de lavagem?",
    "Posso excluir minha conta? Como?",
    "O aplicativo é gratuito ou possui taxas?",
    "Como posso alterar meus dados pessoais?",
    "O que fazer se a máquina estiver com defeito?",
    "Posso agendar lavagens com antecedência?",
    "O que significa 'máquina em manutenção'?",
    "Como recebo notificações sobre o status da lavagem?",
    "Há suporte técnico disponível no app?",
    "Posso avaliar uma lavanderia após o uso?",
    "Como funciona o sistema de cupons e descontos?",
    "É possível compartilhar minha conta com outra pessoa?",
    "O app mostra lavanderias próximas automaticamente?",
    "Preciso estar logado para reservar uma máquina?",
    "O que acontece se eu não comparecer à reserva?",
    "Como entro em contato com o suporte?",
  ]

  const filtradas = perguntas.filter((p) =>
    p.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Svg width={width} height={120} viewBox={`0 0 ${width} 120`} style={styles.wave}>
          <Path
            d={`M0,70 Q ${width * 0.35},30 ${width * 0.65},50 T ${width},30 L ${width},120 L 0,120 Z`}
            fill={COLORS.white}
          />
        </Svg>

        <View style={styles.headerBar}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.replace("/profile")}>
            <Ionicons name="arrow-back" size={22} color={COLORS.white} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Perguntas Frequentes</Text>
          <View style={{ width: 22 }} />
        </View>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingBottom: 110 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topTextBlock}>
          <Text style={styles.title}>FAQ - Dúvidas Comuns</Text>
          <Text style={styles.subtitle}>
            Encontre aqui respostas para as principais dúvidas sobre o uso do app.
          </Text>
        </View>

        {/* Campo de busca */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={16} color={COLORS.primary} />
          <TextInput
            style={styles.input}
            placeholder="Pesquisar"
            value={search}
            onChangeText={setSearch}
            placeholderTextColor={COLORS.gray}
          />
        </View>

        {filtradas.map((pergunta, i) => (
          <TouchableOpacity key={i} style={styles.button}>
            <Text style={styles.buttonText}>{pergunta}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <BottomBar />
    </View>
  )
}

function BottomBar() {
  const router = useRouter()
  return (
    <View style={styles.tabBar}>
      <TabItem
        icon={<Ionicons name="home-outline" size={20} color="#fff" />}
        onPress={() => router.replace("/")}
      />
      <TabItem icon={<Ionicons name="scan-outline" size={20} color="#fff" />} onPress={() => {}} />
      <TabItem icon={<Ionicons name="cart-outline" size={20} color="#fff" />} 
      onPress={() => router.push("/(tabs)/minhasReservas")} />
      <TabItem
        active
        label="Perfil"
        icon={<Ionicons name="person-outline" size={20} color={COLORS.primary} />}
        onPress={() => router.replace("/profile")}
      />
    </View>
  )
}

function TabItem({
  icon,
  label,
  active,
  onPress,
}: {
  icon: React.ReactNode
  label?: string
  active?: boolean
  onPress?: () => void
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
  )
}

/* ---------------- ESTILOS ---------------- */
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

  topTextBlock: { marginTop: 8 },
  title: { fontSize: 18, fontWeight: "800", color: COLORS.text },
  subtitle: { fontSize: 14, color: COLORS.gray, marginTop: 6 },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 14,
    marginBottom: 12,
    backgroundColor: COLORS.white,
  },
  input: { flex: 1, paddingVertical: 6, paddingLeft: 8, color: COLORS.text },

  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
  },

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
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: "700",
  },
})
