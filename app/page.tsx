import { AppShell } from "../components/global/AppShell"
import { NotesListScreen } from "../screens/NotesListScreen"
import { ThemeProvider } from "../context/ThemeContext"

export default function Page() {
  return (
    <ThemeProvider>
      <AppShell>
        <NotesListScreen />
      </AppShell>
    </ThemeProvider>
  )
}
