"use client"

import React from "react"
import { View, TextInput, TouchableOpacity, Text } from "react-native"
import { Search, X } from "lucide-react-native"

interface GlobalSearchBarProps {
  onClose: () => void
}

export function GlobalSearchBar({ onClose }: GlobalSearchBarProps) {
  const [searchText, setSearchText] = React.useState("")
  const [searchMode, setSearchMode] = React.useState<"all" | "semantic" | "keyword">("all")

  return (
    <View className="flex-1 flex-row items-center">
      <View className="flex-1 bg-neutral-100 dark:bg-neutral-700 rounded-lg flex-row items-center px-3">
        <Search size={18} color="#9CA3AF" />

        <TextInput
          className="flex-1 py-2 px-2 text-neutral-800 dark:text-white"
          placeholder="Search across all content..."
          placeholderTextColor="#9CA3AF"
          value={searchText}
          onChangeText={setSearchText}
          autoFocus
        />

        {searchText ? (
          <TouchableOpacity onPress={() => setSearchText("")}>
            <X size={18} color="#9CA3AF" />
          </TouchableOpacity>
        ) : null}
      </View>

      <View className="flex-row ml-2">
        <TouchableOpacity
          className={`px-2 py-1 rounded-md mr-1 ${searchMode === "all" ? "bg-indigo-100 dark:bg-indigo-900/30" : ""}`}
          onPress={() => setSearchMode("all")}
        >
          <Text
            className={
              searchMode === "all" ? "text-indigo-600 dark:text-indigo-400" : "text-neutral-600 dark:text-neutral-400"
            }
          >
            All
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={`px-2 py-1 rounded-md mr-1 ${
            searchMode === "semantic" ? "bg-indigo-100 dark:bg-indigo-900/30" : ""
          }`}
          onPress={() => setSearchMode("semantic")}
        >
          <Text
            className={
              searchMode === "semantic"
                ? "text-indigo-600 dark:text-indigo-400"
                : "text-neutral-600 dark:text-neutral-400"
            }
          >
            Semantic
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={`px-2 py-1 rounded-md ${searchMode === "keyword" ? "bg-indigo-100 dark:bg-indigo-900/30" : ""}`}
          onPress={() => setSearchMode("keyword")}
        >
          <Text
            className={
              searchMode === "keyword"
                ? "text-indigo-600 dark:text-indigo-400"
                : "text-neutral-600 dark:text-neutral-400"
            }
          >
            Keyword
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity className="ml-2" onPress={onClose}>
        <X size={20} color="#6B7280" />
      </TouchableOpacity>
    </View>
  )
}
