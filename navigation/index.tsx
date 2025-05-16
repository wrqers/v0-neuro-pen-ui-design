"use client"
import { NavigationContainer } from "@react-navigation/native"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createStackNavigator } from "@react-navigation/stack"
import { useWindowDimensions } from "react-native"
import { FileText, Brain, BookOpen, Square3Stack3D, Settings } from "lucide-react-native"

import { useTheme } from "../context/ThemeContext"
import { CustomDrawerContent } from "./CustomDrawerContent"
import { TabBar } from "./TabBar"

// Screens
import { NotesScreen } from "../screens/notes/NotesScreen"
import { NoteDetailScreen } from "../screens/notes/NoteDetailScreen"
import { NoteEditorScreen } from "../screens/notes/NoteEditorScreen"
import { FlashcardsScreen } from "../screens/flashcards/FlashcardsScreen"
import { FlashcardReviewScreen } from "../screens/flashcards/FlashcardReviewScreen"
import { FlashcardEditorScreen } from "../screens/flashcards/FlashcardEditorScreen"
import { DocumentsScreen } from "../screens/documents/DocumentsScreen"
import { DocumentViewerScreen } from "../screens/documents/DocumentViewerScreen"
import { ProjectsScreen } from "../screens/projects/ProjectsScreen"
import { ProjectCanvasScreen } from "../screens/projects/ProjectCanvasScreen"
import { KnowledgeBoardScreen } from "../screens/projects/KnowledgeBoardScreen"
import { SettingsScreen } from "../screens/settings/SettingsScreen"

// Stack navigators
const NotesStack = createStackNavigator()
const FlashcardsStack = createStackNavigator()
const DocumentsStack = createStackNavigator()
const ProjectsStack = createStackNavigator()
const SettingsStack = createStackNavigator()

// Tab navigator
const Tab = createBottomTabNavigator()

// Drawer navigator
const Drawer = createDrawerNavigator()

// Stack navigators for each section
function NotesStackNavigator() {
  return (
    <NotesStack.Navigator screenOptions={{ headerShown: false }}>
      <NotesStack.Screen name="NotesList" component={NotesScreen} />
      <NotesStack.Screen name="NoteDetail" component={NoteDetailScreen} />
      <NotesStack.Screen name="NoteEditor" component={NoteEditorScreen} />
    </NotesStack.Navigator>
  )
}

function FlashcardsStackNavigator() {
  return (
    <FlashcardsStack.Navigator screenOptions={{ headerShown: false }}>
      <FlashcardsStack.Screen name="FlashcardsList" component={FlashcardsScreen} />
      <FlashcardsStack.Screen name="FlashcardReview" component={FlashcardReviewScreen} />
      <FlashcardsStack.Screen name="FlashcardEditor" component={FlashcardEditorScreen} />
    </FlashcardsStack.Navigator>
  )
}

function DocumentsStackNavigator() {
  return (
    <DocumentsStack.Navigator screenOptions={{ headerShown: false }}>
      <DocumentsStack.Screen name="DocumentsList" component={DocumentsScreen} />
      <DocumentsStack.Screen name="DocumentViewer" component={DocumentViewerScreen} />
    </DocumentsStack.Navigator>
  )
}

function ProjectsStackNavigator() {
  return (
    <ProjectsStack.Navigator screenOptions={{ headerShown: false }}>
      <ProjectsStack.Screen name="ProjectsList" component={ProjectsScreen} />
      <ProjectsStack.Screen name="ProjectCanvas" component={ProjectCanvasScreen} />
      <ProjectsStack.Screen name="KnowledgeBoard" component={KnowledgeBoardScreen} />
    </ProjectsStack.Navigator>
  )
}

function SettingsStackNavigator() {
  return (
    <SettingsStack.Navigator screenOptions={{ headerShown: false }}>
      <SettingsStack.Screen name="SettingsMain" component={SettingsScreen} />
    </SettingsStack.Navigator>
  )
}

// Tab navigator for mobile
function TabNavigator() {
  const { colors } = useTheme()

  return (
    <Tab.Navigator tabBar={(props) => <TabBar {...props} />} screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Notes"
        component={NotesStackNavigator}
        options={{
          tabBarIcon: ({ color }) => <FileText size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="Flashcards"
        component={FlashcardsStackNavigator}
        options={{
          tabBarIcon: ({ color }) => <Brain size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="Documents"
        component={DocumentsStackNavigator}
        options={{
          tabBarIcon: ({ color }) => <BookOpen size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="Projects"
        component={ProjectsStackNavigator}
        options={{
          tabBarIcon: ({ color }) => <Square3Stack3D size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsStackNavigator}
        options={{
          tabBarIcon: ({ color }) => <Settings size={24} color={color} />,
        }}
      />
    </Tab.Navigator>
  )
}

// Main navigation container
export function AppNavigation() {
  const { width } = useWindowDimensions()
  const { colors, isDark } = useTheme()
  const isTablet = width >= 768

  return (
    <NavigationContainer
      theme={{
        dark: isDark,
        colors: {
          primary: colors.primary,
          background: colors.background,
          card: colors.card,
          text: colors.foreground,
          border: colors.border,
          notification: colors.primary,
        },
      }}
    >
      {isTablet ? (
        <Drawer.Navigator
          drawerContent={(props) => <CustomDrawerContent {...props} />}
          screenOptions={{
            headerShown: false,
            drawerType: "permanent",
            drawerStyle: {
              width: 280,
              backgroundColor: colors.sidebar,
            },
          }}
        >
          <Drawer.Screen name="NotesTab" component={NotesStackNavigator} />
          <Drawer.Screen name="FlashcardsTab" component={FlashcardsStackNavigator} />
          <Drawer.Screen name="DocumentsTab" component={DocumentsStackNavigator} />
          <Drawer.Screen name="ProjectsTab" component={ProjectsStackNavigator} />
          <Drawer.Screen name="SettingsTab" component={SettingsStackNavigator} />
        </Drawer.Navigator>
      ) : (
        <TabNavigator />
      )}
    </NavigationContainer>
  )
}
