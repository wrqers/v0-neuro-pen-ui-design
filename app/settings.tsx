import { AppShell } from "../components/global/AppShell"
import { SettingsScreen } from "../screens/SettingsScreen"
import { ThemeProvider } from "../context/ThemeContext"

export default function SettingsPage() {
  return (
    <ThemeProvider>
      <AppShell>
        <SettingsScreen />
      </AppShell>
    </ThemeProvider>
  )
}
