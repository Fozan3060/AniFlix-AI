import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'

const featuredMovies = [
  {
    id: 1,
    title: 'Interstellar',
    poster: 'https://image.tmdb.org/t/p/w500/nBNZadXqJSdt05SHLqgT0HuC5Gm.jpg'
  },
  {
    id: 2,
    title: 'Inception',
    poster: 'https://image.tmdb.org/t/p/w500/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg'
  },
  {
    id: 3,
    title: 'Oppenheimer',
    poster: 'https://image.tmdb.org/t/p/w500/bAFmcrxsub0YVZk9oYlYfRkRzlZ.jpg'
  }
]

const Index = () => {
  return (
    <View className="flex-1 bg-dark-bg">
      {/* Header */}
      <View className="flex-row items-center justify-between px-5 pt-12">
        <Text className="text-text-primary text-2xl font-bold">🎬 AniFlix</Text>
        <Ionicons name="notifications-outline" size={24} color="#A8B5DB" />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View className="px-5 mt-6">
          <LinearGradient
            colors={['#5C27FE', '#E62E89']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ borderRadius: 20 }}
            className="p-[2px]"
          >
            <View className="p-5 bg-dark-card rounded-2xl">
              <Text className="text-text-primary text-xl font-semibold mb-2">
                Featured Movie
              </Text>
              <Text className="text-muted-text mb-4">
                Discover the most trending movie of the week
              </Text>
              <TouchableOpacity className="self-start">
                <Text className="text-dark-card font-medium">Explore Now</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>

        {/* Movie Carousel */}
        <View className="mt-8">
          <Text className="text-text-primary text-lg font-semibold px-5 mb-3">
            Trending Now
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20 }}
          >
            {featuredMovies.map(movie => (
              <TouchableOpacity
                key={movie.id}
                className="mr-5 rounded-2xl overflow-hidden"
              >
                <Image
                  source={{ uri: movie.poster }}
                  className="w-40 h-56 rounded-2xl"
                />
                <Text className="text-text-primary mt-2 font-medium text-center">
                  {movie.title}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

      
      </ScrollView>
    </View>
  )
}

export default Index
