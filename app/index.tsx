import { GestureHandlerRootView } from "react-native-gesture-handler"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { ThemeProvider } from "../context/ThemeContext"
import { AppNavigation } from "../navigation"

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider>
          <AppNavigation />
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}
