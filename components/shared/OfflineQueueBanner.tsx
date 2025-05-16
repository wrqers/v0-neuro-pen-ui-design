import type React from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { WifiOff, Upload } from "lucide-react-native"

interface OfflineQueueBannerProps {
  queueCount: number
  onSync: () => void
}

const OfflineQueueBanner: React.FC<OfflineQueueBannerProps> = ({ queueCount, onSync }) => {
  if (queueCount === 0) {
    return null
  }

  return (
    <View
      style={{
        backgroundColor: "#f0ad4e",
        padding: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <WifiOff size={20} color="white" style={{ marginRight: 8 }} />
        <Text style={{ color: "white", fontWeight: "bold" }}>
          You are offline. {queueCount} item{queueCount !== 1 ? "s" : ""} in queue.
        </Text>
      </View>
      <TouchableOpacity onPress={onSync} style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ color: "white", fontWeight: "bold", marginRight: 4 }}>Sync Now</Text>
        <Upload size={20} color="white" />
      </TouchableOpacity>
    </View>
  )
}

export default OfflineQueueBanner
