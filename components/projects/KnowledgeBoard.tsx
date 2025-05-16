"use client"

import React from "react"
import { View, Text, TouchableOpacity, useWindowDimensions } from "react-native"
import { Plus, ZoomIn, ZoomOut, Move, FileText, Brain, BookOpen, Hash, ArrowRight } from "lucide-react-native"
import Animated, { useAnimatedStyle, useSharedValue } from "react-native-reanimated"

export function KnowledgeBoard() {
  const { width, height } = useWindowDimensions()
  const [zoomLevel, setZoomLevel] = React.useState(1)

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

  const boardPosition = {
    x: useSharedValue(0),
    y: useSharedValue(0),
  }

  const boardStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: boardPosition.x.value }, { translateY: boardPosition.y.value }, { scale: zoomLevel }],
    }
  })

  const zoomIn = () => {
    setZoomLevel(Math.min(1.5, zoomLevel + 0.1))
  }

  const zoomOut = () => {
    setZoomLevel(Math.max(0.5, zoomLevel - 0.1))
  }

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

  return (
    <View className="flex-1 bg-neutral-50 dark:bg-neutral-900">
      <View className="p-4 border-b border-neutral-200 dark:border-neutral-700 flex-row items-center justify-between">
        <Text className="text-xl font-semibold text-neutral-800 dark:text-white">Knowledge Map</Text>

        <View className="flex-row items-center">
          <TouchableOpacity className="p-2 rounded-md mr-2" onPress={zoomOut}>
            <ZoomOut size={20} color="#6B7280" />
          </TouchableOpacity>

          <Text className="text-sm text-neutral-600 dark:text-neutral-400 mx-2">{Math.round(zoomLevel * 100)}%</Text>

          <TouchableOpacity className="p-2 rounded-md mr-2" onPress={zoomIn}>
            <ZoomIn size={20} color="#6B7280" />
          </TouchableOpacity>

          <TouchableOpacity className="p-2 rounded-md bg-indigo-100 dark:bg-indigo-900/30">
            <Plus size={20} color="#6366F1" />
          </TouchableOpacity>
        </View>
      </View>

      <View className="flex-1 bg-neutral-100 dark:bg-neutral-800">
        <Animated.View style={[{ position: "absolute" }, boardStyle]}>
          <View className="min-h-[1000px] min-w-[1000px]">
            {/* Draw connections between nodes */}
            <View style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}>
              {initialItems.map((item) =>
                item.connections.map((connId) => {
                  const connectedItem = initialItems.find((i) => i.id === connId)
                  if (!connectedItem) return null

                  const startX = item.position.x + 100 // width of card / 2
                  const startY = item.position.y + 50 // height of card / 2
                  const endX = connectedItem.position.x + 100
                  const endY = connectedItem.position.y + 50

                  return (
                    <View
                      key={`${item.id}-${connId}`}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        overflow: "hidden",
                      }}
                    >
                      <View
                        style={{
                          position: "absolute",
                          top: startY,
                          left: startX,
                          width: Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2)),
                          height: 2,
                          backgroundColor: "#D1D5DB",
                          transform: [{ rotate: `${Math.atan2(endY - startY, endX - startX)}rad` }],
                          transformOrigin: "left",
                        }}
                      />
                    </View>
                  )
                }),
              )}
            </View>

            {/* Render nodes */}
            {initialItems.map((item) => {
              const Icon = getIconForType(item.type)

              return (
                <TouchableOpacity
                  key={item.id}
                  style={{
                    position: "absolute",
                    top: item.position.y,
                    left: item.position.x,
                  }}
                  className="bg-white dark:bg-neutral-800 rounded-lg shadow-md border border-neutral-200 dark:border-neutral-700 w-[200px]"
                >
                  <View className="p-3">
                    <View className="flex-row items-center justify-between mb-2">
                      <View className="flex-row items-center">
                        <View className="p-1.5 rounded-full bg-indigo-100 dark:bg-indigo-900/30">
                          <Icon size={14} color="#6366F1" />
                        </View>
                        <Text className="ml-2 text-xs font-medium text-neutral-500 dark:text-neutral-400">
                          {item.type}
                        </Text>
                      </View>

                      <TouchableOpacity className="p-1 rounded-full bg-neutral-100 dark:bg-neutral-700">
                        <Move size={12} color="#6B7280" />
                      </TouchableOpacity>
                    </View>

                    <Text className="font-medium text-neutral-800 dark:text-white mb-1">{item.title}</Text>

                    {item.content && (
                      <Text className="text-xs text-neutral-600 dark:text-neutral-300 mb-2" numberOfLines={2}>
                        {item.content}
                      </Text>
                    )}

                    {item.type !== "concept" && (
                      <TouchableOpacity className="flex-row items-center mt-1">
                        <Text className="text-xs text-indigo-600 dark:text-indigo-400 mr-1">Open {item.type}</Text>
                        <ArrowRight size={10} color="#6366F1" />
                      </TouchableOpacity>
                    )}
                  </View>
                </TouchableOpacity>
              )
            })}
          </View>
        </Animated.View>
      </View>
    </View>
  )
}
