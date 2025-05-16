"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"
import {
  ArrowLeft,
  Plus,
  ZoomIn,
  ZoomOut,
  Move,
  FileText,
  Brain,
  BookOpen,
  Hash,
  ArrowRight,
} from "lucide-react-native"
import { GestureDetector } from "react-native-gesture-handler"
import Animated, { useAnimatedStyle, useSharedValue } from "react-native-reanimated"
import { Gesture } from "react-native-gesture-handler"
import { useTheme } from "../../context/ThemeContext"
import { DraggableItem } from "../../components/shared/DraggableItem"
import { AnimatedButton } from "../../components/shared/AnimatedButton"
import { AnimatedModal } from "../../components/shared/AnimatedModal"
import { animations } from "../../utils/animations"

// Mock data for knowledge board items
const initialItems = [
  {
    id: "1",
    type: "concept",
    title: "Neuroplasticity",
    position: { x: 100, y: 150 },
    connections: ["2", "4"],
  },
  {
    id: "2",
    type: "note",
    title: "Learning Mechanisms",
    content: "Notes on different learning mechanisms...",
    position: { x: 300, y: 120 },
    connections: ["1", "3"],
  },
  {
    id: "3",
    type: "document",
    title: "Research Paper",
    content: "Academic paper on cognitive development...",
    position: { x: 450, y: 250 },
    connections: ["2"],
  },
  {
    id: "4",
    type: "flashcard",
    title: "Memory Models Deck",
    content: "24 cards on memory models",
    position: { x: 200, y: 350 },
    connections: ["1"],
  },
]

export function KnowledgeBoardScreen() {
  const { colors } = useTheme()
  const navigation = useNavigation()
  const [items, setItems] = useState(initialItems)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [showAddModal, setShowAddModal] = useState(false)
  const [selectedItemType, setSelectedItemType] = useState<string | null>(null)

  // Pan and zoom gesture state
  const translateX = useSharedValue(0)
  const translateY = useSharedValue(0)
  const lastTranslateX = useSharedValue(0)
  const lastTranslateY = useSharedValue(0)

  // Function to get icon based on item type
  const getIconForType = (type: string) => {
    switch (type) {
      case "note":
        return FileText
      case "flashcard":
        return Brain
      case "document":
        return BookOpen
      case "concept":
        return Hash
      default:
        return FileText
    }
  }

  // Handle zoom in/out
  const handleZoomIn = () => {
    if (zoomLevel < 2) {
      animations.haptics.light()
      setZoomLevel((prev) => Math.min(prev + 0.1, 2))
    }
  }

  const handleZoomOut = () => {
    if (zoomLevel > 0.5) {
      animations.haptics.light()
      setZoomLevel((prev) => Math.max(prev - 0.1, 0.5))
    }
  }

  // Handle item position change
  const handlePositionChange = (id: string, x: number, y: number) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, position: { x, y } } : item)))
  }

  // Handle adding new item
  const handleAddItem = (type: string) => {
    const newId = `${items.length + 1}`
    const newItem = {
      id: newId,
      type,
      title: `New ${type}`,
      content: type !== "concept" ? `Content for new ${type}...` : undefined,
      position: { x: 250, y: 250 },
      connections: [],
    }

    setItems((prev) => [...prev, newItem])
    setShowAddModal(false)
    animations.haptics.medium()
  }

  // Pan gesture for moving the canvas
  const panGesture = Gesture.Pan()
    .onStart(() => {
      lastTranslateX.value = translateX.value
      lastTranslateY.value = translateY.value
    })
    .onUpdate((event) => {
      translateX.value = lastTranslateX.value + event.translationX
      translateY.value = lastTranslateY.value + event.translationY
    })

  // Animated styles for the canvas
  const canvasStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }, { translateY: translateY.value }, { scale: zoomLevel }],
    }
  })

  return (
    <View style={[styles.container, { backgroundColor: colors.backgroundSecondary }]}>
      <View style={[styles.header, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <ArrowLeft size={24} color={colors.foregroundSecondary} />
          </TouchableOpacity>
          <Text style={[styles.title, { color: colors.foreground }]}>Knowledge Map</Text>
        </View>

        <View style={styles.headerRight}>
          <TouchableOpacity
            style={[styles.iconButton, { backgroundColor: colors.backgroundTertiary }]}
            onPress={handleZoomOut}
          >
            <ZoomOut size={20} color={colors.foregroundSecondary} />
          </TouchableOpacity>

          <Text style={[styles.zoomText, { color: colors.foregroundSecondary }]}>{Math.round(zoomLevel * 100)}%</Text>

          <TouchableOpacity
            style={[styles.iconButton, { backgroundColor: colors.backgroundTertiary }]}
            onPress={handleZoomIn}
          >
            <ZoomIn size={20} color={colors.foregroundSecondary} />
          </TouchableOpacity>

          <AnimatedButton
            title="Add Item"
            variant="primary"
            size="sm"
            leftIcon={<Plus size={16} color="white" />}
            style={styles.addButton}
            onPress={() => setShowAddModal(true)}
          />
        </View>
      </View>

      <GestureDetector gesture={panGesture}>
        <View style={styles.canvasContainer}>
          <Animated.View style={[styles.canvas, canvasStyle]}>
            {/* Draw connections between nodes */}
            <View style={styles.connectionsLayer}>
              {items.map((item) =>
                item.connections.map((connId) => {
                  const connectedItem = items.find((i) => i.id === connId)
                  if (!connectedItem) return null

                  const startX = item.position.x + 100 // width of card / 2
                  const startY = item.position.y + 50 // height of card / 2
                  const endX = connectedItem.position.x + 100
                  const endY = connectedItem.position.y + 50

                  // Calculate angle and distance
                  const angle = Math.atan2(endY - startY, endX - startX)
                  const distance = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2))

                  return (
                    <View
                      key={`${item.id}-${connId}`}
                      style={{
                        position: "absolute",
                        top: startY,
                        left: startX,
                        width: distance,
                        height: 2,
                        backgroundColor: colors.border,
                        transform: [{ rotate: `${angle}rad` }],
                        transformOrigin: "left",
                      }}
                    />
                  )
                }),
              )}
            </View>

            {/* Render nodes */}
            {items.map((item) => {
              const Icon = getIconForType(item.type)

              return (
                <DraggableItem
                  key={item.id}
                  initialPosition={item.position}
                  onPositionChange={(x, y) => handlePositionChange(item.id, x, y)}
                  style={styles.nodeCard}
                >
                  <View style={styles.nodeContent}>
                    <View style={styles.nodeHeader}>
                      <View style={styles.nodeTypeContainer}>
                        <View style={[styles.nodeTypeIcon, { backgroundColor: colors.primaryLight }]}>
                          <Icon size={14} color={colors.primary} />
                        </View>
                        <Text style={[styles.nodeType, { color: colors.foregroundSecondary }]}>{item.type}</Text>
                      </View>

                      <View style={[styles.dragHandle, { backgroundColor: colors.backgroundTertiary }]}>
                        <Move size={12} color={colors.foregroundSecondary} />
                      </View>
                    </View>

                    <Text style={[styles.nodeTitle, { color: colors.foreground }]}>{item.title}</Text>

                    {item.content && (
                      <Text style={[styles.nodeContent, { color: colors.foregroundSecondary }]} numberOfLines={2}>
                        {item.content}
                      </Text>
                    )}

                    {item.type !== "concept" && (
                      <TouchableOpacity style={styles.nodeAction}>
                        <Text style={[styles.nodeActionText, { color: colors.primary }]}>Open {item.type}</Text>
                        <ArrowRight size={10} color={colors.primary} />
                      </TouchableOpacity>
                    )}
                  </View>
                </DraggableItem>
              )
            })}
          </Animated.View>
        </View>
      </GestureDetector>

      {/* Add Item Modal */}
      <AnimatedModal
        visible={showAddModal}
        onClose={() => setShowAddModal(false)}
        animationType="scale"
        position="center"
      >
        <View style={styles.modalContent}>
          <Text style={[styles.modalTitle, { color: colors.foreground }]}>Add New Item</Text>

          <View style={styles.itemTypeGrid}>
            {["concept", "note", "flashcard", "document"].map((type) => {
              const Icon = getIconForType(type)
              const isSelected = selectedItemType === type

              return (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.itemTypeButton,
                    {
                      backgroundColor: isSelected ? colors.primaryLight : colors.backgroundTertiary,
                      borderColor: isSelected ? colors.primary : colors.border,
                    },
                  ]}
                  onPress={() => {
                    animations.haptics.light()
                    setSelectedItemType(type)
                  }}
                >
                  <Icon size={24} color={isSelected ? colors.primary : colors.foregroundSecondary} />
                  <Text
                    style={[
                      styles.itemTypeText,
                      {
                        color: isSelected ? colors.primary : colors.foreground,
                        fontWeight: isSelected ? "600" : "normal",
                      },
                    ]}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Text>
                </TouchableOpacity>
              )
            })}
          </View>

          <View style={styles.modalActions}>
            <AnimatedButton
              title="Cancel"
              variant="outline"
              onPress={() => setShowAddModal(false)}
              style={styles.modalButton}
            />

            <AnimatedButton
              title="Add Item"
              variant="primary"
              disabled={!selectedItemType}
              onPress={() => selectedItemType && handleAddItem(selectedItemType)}
              style={styles.modalButton}
            />
          </View>
        </View>
      </AnimatedModal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    padding: 8,
    borderRadius: 8,
    marginRight: 8,
  },
  zoomText: {
    fontSize: 14,
    marginHorizontal: 8,
  },
  addButton: {
    marginLeft: 8,
  },
  canvasContainer: {
    flex: 1,
    overflow: "hidden",
  },
  canvas: {
    width: 2000,
    height: 2000,
    position: "relative",
  },
  connectionsLayer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  nodeCard: {
    width: 200,
    minHeight: 100,
  },
  nodeContent: {
    padding: 12,
  },
  nodeHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  nodeTypeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  nodeTypeIcon: {
    padding: 4,
    borderRadius: 4,
  },
  nodeType: {
    fontSize: 12,
    marginLeft: 4,
  },
  dragHandle: {
    padding: 4,
    borderRadius: 4,
  },
  nodeTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  nodeContent: {
    fontSize: 12,
    marginBottom: 8,
  },
  nodeAction: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  nodeActionText: {
    fontSize: 12,
    marginRight: 4,
  },
  modalContent: {
    padding: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
    textAlign: "center",
  },
  itemTypeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 24,
  },
  itemTypeButton: {
    width: "48%",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
    marginHorizontal: "1%",
    borderWidth: 1,
  },
  itemTypeText: {
    marginTop: 8,
    fontSize: 14,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  modalButton: {
    minWidth: 100,
    marginLeft: 8,
  },
})
