import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
  StatusBar,
  Dimensions,
  Linking,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

// Defina a interface BarcodeScannedEvent manualmente, pois não é mais exportada
interface CustomBarcodeScannedEvent {
  type: string;
  data: string;
}

type CameraRef = CameraView | null;

const { width } = Dimensions.get("window");
const QR_SQUARE_SIZE = width * 0.7;

export default function ScannerScreen() {
  const router = useRouter();
  const cameraRef = useRef<CameraRef>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState<string | null>(null);

  const handleBarCodeScanned = ({ type, data }: CustomBarcodeScannedEvent) => {
    if (scanned) return;

    setScanned(true);
    setScannedData(data);

    console.log(`QR Code lido! Tipo: ${type}, Dado: ${data}`);

    if (data.startsWith("http")) {
      Linking.openURL(data).catch(err => 
        console.error(`Erro ao tentar abrir link: ${err.message}. Dado lido: ${data}`)
      );
    } else {
      console.log(`Dado lido (não é URL): ${data}`);
    }

    setTimeout(() => {
      setScanned(false);
      setScannedData(null);
    }, 5000);
  };

  if (!permission) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#334DB3" />
        <Text style={{ marginTop: 10 }}>Solicitando permissão da câmera...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={{ textAlign: "center", color: "#333", marginBottom: 8 }}>
          Permissão da câmera negada.
        </Text>
        <Text style={{ textAlign: "center", color: "#666" }}>
          Vá até as configurações e ative o acesso à câmera.
        </Text>
        <TouchableOpacity 
            style={styles.settingsButton} 
            onPress={requestPermission}
        >
            <Text style={styles.settingsButtonText}>Conceder Permissão</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing="back"
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
      >
        <View style={styles.overlay}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.replace("/")} style={styles.iconButton}>
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.title}>Escanear Código QR</Text>
                <View style={styles.iconButtonPlaceholder} />
            </View>

            <View style={styles.qrFocusContainer}>
                <View style={styles.qrSquare}>
                    <View style={[styles.corner, styles.cornerTL]} />
                    <View style={[styles.corner, styles.cornerTR]} />
                    <View style={[styles.corner, styles.cornerBL]} />
                    <View style={[styles.corner, styles.cornerBR]} />
                </View>
                <Text style={styles.scanText}>
                    Aponte a câmera para um código QR.
                </Text>
                {scanned && scannedData && (
                    <Text style={styles.scannedMessage}>
                        Código Lido! Processando...
                    </Text>
                )}
            </View>
        </View>

        <View style={styles.tabBar}>
            <TabItem
                icon={<Ionicons name="home-outline" size={24} color="#fff" />}
                onPress={() => router.replace("/")}
            />
            <TabItem
                active
                label="scanner"
                icon={<Ionicons name="scan" size={24} color="#334DB3" />}
                onPress={() => {}}
            />
            <TabItem
                icon={<Ionicons name="cart-outline" size={24} color="#fff" />}
                onPress={() => router.push("/(tabs)/minhasReservas")}
            />
            <TabItem
                icon={<Ionicons name="person-outline" size={24} color="#fff" />}
                onPress={() => router.push("/(tabs)/profile")}
            />
        </View>
      </CameraView>
    </View>
  );
}

function TabItem({
  icon,
  active,
  onPress,
}: {
  icon: React.ReactNode;
  active?: boolean;
  onPress?: () => void;
  label?: string
}) {
  return (
    <TouchableOpacity style={styles.tabItem} onPress={onPress} activeOpacity={0.8}>
      {active ? <View style={styles.activePill}>{icon}</View> : <View>{icon}</View>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  settingsButton: {
    marginTop: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#334DB3",
    borderRadius: 5,
  },
  settingsButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  camera: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    paddingTop: Platform.select({ ios: 60, android: 40 }),
    paddingHorizontal: 20,
    width: '100%',
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  iconButtonPlaceholder: {
    width: 40,
    height: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  qrFocusContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrSquare: {
    width: QR_SQUARE_SIZE,
    height: QR_SQUARE_SIZE,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: 'transparent',
  },
  corner: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderColor: '#334DB3',
    borderWidth: 6,
  },
  cornerTL: {
    top: -6,
    left: -6,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderTopLeftRadius: 10,
  },
  cornerTR: {
    top: -6,
    right: -6,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    borderTopRightRadius: 10,
  },
  cornerBL: {
    bottom: -6,
    left: -6,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomLeftRadius: 10,
  },
  cornerBR: {
    bottom: -6,
    right: -6,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderBottomRightRadius: 10,
  },
  scanText: {
    color: '#fff',
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  scannedMessage: {
    color: '#fff',
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  tabBar: {
    flexDirection: 'row',
    height: Platform.select({ ios: 100, android: 80 }),
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: Platform.select({ ios: 20, android: 0 }),
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activePill: {
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 12,
  },
});
