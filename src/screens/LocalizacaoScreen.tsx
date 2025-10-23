import { Ionicons } from "@expo/vector-icons"
import * as Location from "expo-location"
import { useRouter } from "expo-router"
import React, { useEffect, useMemo, useRef, useState } from "react"
import { Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"

let MapView: any = null
let Marker: any = null
if (Platform.OS !== "web") {
  const RNMaps = require("react-native-maps")
  MapView = RNMaps.default
  Marker = RNMaps.Marker
}

type Region = {
  latitude: number
  longitude: number
  latitudeDelta: number
  longitudeDelta: number
}

const BLUE = "#2F46A8"

export default function LocalizacaoScreen() {
  const router = useRouter()
  const mapRef = useRef<any>(null)

  const [query, setQuery] = useState("")
  const [region, setRegion] = useState<Region | null>(null)
  const [address, setAddress] = useState<string>("Local Atual")

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== "granted") {
        setRegion({
          latitude: -31.771,
          longitude: -52.342,
          latitudeDelta: 0.012,
          longitudeDelta: 0.012,
        })
        return
      }
      const loc = await Location.getCurrentPositionAsync({})
      const center = { latitude: loc.coords.latitude, longitude: loc.coords.longitude }
      setRegion({ ...center, latitudeDelta: 0.012, longitudeDelta: 0.012 })
    })()
  }, [])

  async function updateAddress(lat: number, lng: number) {
    try {
      const r = await Location.reverseGeocodeAsync({ latitude: lat, longitude: lng })
      if (r?.[0]) {
        const a = r[0]
        const linha1 = [a.street, a.name].filter(Boolean).join(", ")
        const linha2 = [a.city, a.region].filter(Boolean).join(" - ")
        setAddress(`${linha1} ${linha2}`)
      }
    } catch {
      setAddress("Local Atual")
    }
  }

  const currentRegion = useMemo(() => region ?? undefined, [region])

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.replace("/")}>
          <Ionicons name="chevron-back" size={22} color="#111827" />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Definir Localização</Text>
        </View>
      </View>

      {/* Mapa */}
      <View style={styles.mapContainer}>
        {Platform.OS === "web" ? (
          <View style={[StyleSheet.absoluteFill, styles.webFallback]}>
            <Ionicons name="map-outline" size={22} color={BLUE} />
            <Text style={styles.webText}>Mapa indisponível no Web. Abra no app (Expo Go).</Text>
          </View>
        ) : (
          currentRegion &&
          MapView && (
            <MapView
              ref={mapRef}
              style={styles.map}
              initialRegion={currentRegion}
              onRegionChangeComplete={(reg: Region) => {
                setRegion(reg)
                updateAddress(reg.latitude, reg.longitude)
              }}
              showsUserLocation
              loadingEnabled
            >
              {Marker && region && (
                <Marker
                  coordinate={{
                    latitude: region.latitude,
                    longitude: region.longitude,
                  }}
                >
                  <View style={styles.markerDot} />
                  <View style={styles.markerBubble}>
                    <Text style={styles.markerText}>Local Atual</Text>
                  </View>
                </Marker>
              )}
            </MapView>
          )
        )}

        <View style={styles.searchWrap}>
          <Ionicons name="search" size={16} color="#fff" />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Pesquisar Locais"
            placeholderTextColor="#E3E9FF"
            onSubmitEditing={() => setQuery("")}
            style={styles.searchInput}
          />
        </View>

        <TouchableOpacity style={styles.savedBtn}>
          <View style={styles.savedIcon}>
            <Ionicons name="bookmark-outline" size={16} color="#fff" />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.sheet}>
        <View style={{ flexDirection: "row", alignItems: "flex-start", gap: 8 }}>
          <Ionicons name="location-outline" size={18} color={BLUE} />
          <View style={{ flex: 1 }}>
            <Text style={styles.placeTitle}>Lavanderia Avenida</Text>
            <Text style={styles.placeSub}>{address}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.confirmBtn} onPress={() => router.replace("/")}>
          <Text style={styles.confirmText}>Confirmar Localização</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tabBar}>
        <TabItem
          icon={<Ionicons name="home-outline" size={20} color="#fff" />}
          onPress={() => router.replace("/")}
        />
        <TabItem icon={<Ionicons name="scan-outline" size={20} color="#dbe3ff" />} />
        <TabItem icon={<Ionicons name="cart-outline" size={20} color="#dbe3ff" />} />
        <TabItem
          icon={<Ionicons name="person-outline" size={20} color="#fff" />}
          // ajuste a rota se seu arquivo de perfil for outro
          onPress={() => router.push("/(tabs)/profile")}
        />
      </View>
    </View>
  )
}

function TabItem({
  icon,
  onPress,
}: {
  icon: React.ReactNode
  onPress?: () => void
}) {
  return (
    <TouchableOpacity style={styles.tabItem} activeOpacity={0.8} onPress={onPress}>
      <View>{icon}</View>
    </TouchableOpacity>
  )
}

/* ----------------------------- ESTILOS ----------------------------- */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingTop: Platform.select({ ios: 50, android: 25 }) },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
    marginBottom: 8,
    position: "relative",
  },
  backBtn: {
    position: "absolute",
    left: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F3F4F6",
  },
  headerCenter: { flex: 1, alignItems: "center", justifyContent: "center" },
  headerTitle: { fontSize: 17, fontWeight: "700", color: "#111827", textAlign: "center" },

  mapContainer: {
    height: "55%",
    marginHorizontal: 10,
    marginTop: 20,
    borderRadius: 14,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  map: { ...StyleSheet.absoluteFillObject },

  searchWrap: {
    position: "absolute",
    left: 12,
    right: 12,
    top: 10,
    backgroundColor: BLUE,
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 36,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  searchInput: { flex: 1, color: "#fff", fontSize: 14 },

  savedBtn: {
    position: "absolute",
    alignSelf: "center",
    bottom: 20,
    backgroundColor: BLUE,
    borderRadius: 14,
    paddingHorizontal: 16,
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    elevation: 3,
  },
  savedIcon: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "rgba(255,255,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
  },

  sheet: {
    backgroundColor: "#fff",
    paddingHorizontal: 14,
    paddingTop: 26,
    paddingBottom: 90, 
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  placeTitle: { fontSize: 15, fontWeight: "700", color: "#111827" },
  placeSub: { fontSize: 12, color: "#6B7280", marginTop: 2 },

  confirmBtn: {
    marginTop: 24,
    backgroundColor: BLUE,
    borderRadius: 12,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: "85%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  confirmText: { color: "#fff", fontWeight: "700", fontSize: 16 },

  markerDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#000",
    borderWidth: 2,
    borderColor: "#fff",
  },
  markerBubble: {
    marginTop: 6,
    backgroundColor: "#fff",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  markerText: { fontSize: 12, color: "#111827" },

  webFallback: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EEF2FF",
    borderColor: "#E6EBFF",
    borderWidth: 1,
    borderRadius: 12,
  },
  webText: {
    marginTop: 8,
    fontSize: 12,
    color: "#2F46A8",
    fontWeight: "600",
    textAlign: "center",
    paddingHorizontal: 12,
  },

  tabBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 72,
    backgroundColor: BLUE,
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
})
