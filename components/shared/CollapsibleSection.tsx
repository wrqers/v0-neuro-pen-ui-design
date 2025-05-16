"use client"

import React from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { ChevronDown, ChevronRight } from "lucide-react-native"

interface CollapsibleSectionProps {
  title: string
  icon?: any
  defaultOpen?: boolean
  children: React.ReactNode
}

export function CollapsibleSection({ title, icon: Icon, defaultOpen = false, children }: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen)

  return (
    <View className="mb-4">
      <TouchableOpacity className="flex-row items-center py-2" onPress={() => setIsOpen(!isOpen)}>
        {isOpen ? <ChevronDown size={16} color="#6B7280" /> : <ChevronRight size={16} color="#6B7280" />}

        {Icon && (
          <View className="mx-1">
            <Icon size={16} color="#6B7280" />
          </View>
        )}

        <Text className="ml-2 font-medium text-neutral-700 dark:text-neutral-300">{title}</Text>
      </TouchableOpacity>

      {isOpen && <View className="mt-1 ml-6">{children}</View>}
    </View>
  )
}
