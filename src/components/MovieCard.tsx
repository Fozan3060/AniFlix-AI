import { IMAGE_BASE_URL } from '@/src/api/tmdb'
import { router } from 'expo-router'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

interface MovieCardProps {
  id: number
  title: string
  posterPath: string
}

const MovieCard = ({ id, title, posterPath }: MovieCardProps) => {
  return (
    <TouchableOpacity
      className="w-[48%] mb-4 bg-secondary rounded-2xl overflow-hidden"
      activeOpacity={0.8}
      onPress={() => router.push({ pathname: '/movie/[id]', params: { id: String(id) } })}
    >
      <Image
        source={{ uri: `${IMAGE_BASE_URL}${posterPath}` }}
        className="w-full h-64"
        resizeMode="cover"
      />
      <View className="px-2 py-2">
        <Text className="text-light-100 text-sm font-semibold" numberOfLines={2}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default MovieCard
