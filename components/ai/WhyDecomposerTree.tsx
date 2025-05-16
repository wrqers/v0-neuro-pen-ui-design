"use client"

import React from "react"
import { View, Text, TouchableOpacity, ScrollView, useWindowDimensions } from "react-native"
import { ChevronDown, ChevronRight } from "lucide-react-native"

interface TreeNode {
  id: string
  title: string
  description?: string
  children?: TreeNode[]
}

interface WhyDecomposerTreeProps {
  rootConcept: string
  tree: TreeNode
}

export function WhyDecomposerTree({ rootConcept, tree }: WhyDecomposerTreeProps) {
  const { width } = useWindowDimensions()
  const isTablet = width >= 768

  return (
    <View className="flex-1 bg-white dark:bg-neutral-900 p-4">
      <View className="mb-6">
        <Text className="text-2xl font-bold text-neutral-800 dark:text-white mb-2">Understanding: {rootConcept}</Text>
        <Text className="text-neutral-600 dark:text-neutral-300">
          This decomposition helps break down the concept into manageable pieces.
        </Text>
      </View>

      <ScrollView>
        <TreeNodeComponent node={tree} level={0} isLast={true} />
      </ScrollView>
    </View>
  )
}

interface TreeNodeComponentProps {
  node: TreeNode
  level: number
  isLast: boolean
}

function TreeNodeComponent({ node, level, isLast }: TreeNodeComponentProps) {
  const [expanded, setExpanded] = React.useState(level < 1)
  const hasChildren = node.children && node.children.length > 0

  return (
    <View>
      <View className="flex-row items-start">
        <View className="mr-2">
          {hasChildren ? (
            <TouchableOpacity
              className="p-1 m-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30"
              onPress={() => setExpanded(!expanded)}
            >
              {expanded ? <ChevronDown size={16} color="#6366F1" /> : <ChevronRight size={16} color="#6366F1" />}
            </TouchableOpacity>
          ) : (
            <View className="w-8 h-8" /> // Placeholder for spacing
          )}
        </View>

        <View
          className={`flex-1 p-3 rounded-lg mb-2 border ${
            hasChildren
              ? "border-indigo-200 dark:border-indigo-800/30 bg-indigo-50/50 dark:bg-indigo-900/10"
              : "border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/50"
          }`}
        >
          <Text className="font-medium text-neutral-800 dark:text-white mb-1">{node.title}</Text>
          {node.description && (
            <Text className="text-sm text-neutral-600 dark:text-neutral-300">{node.description}</Text>
          )}
        </View>
      </View>

      {expanded && hasChildren && (
        <View className="ml-8">
          {node.children?.map((child, index) => (
            <TreeNodeComponent
              key={child.id}
              node={child}
              level={level + 1}
              isLast={index === (node.children?.length || 0) - 1}
            />
          ))}
        </View>
      )}
    </View>
  )
}
