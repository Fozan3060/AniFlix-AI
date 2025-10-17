import React from "react"
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { Ionicons } from "@expo/vector-icons"
import { useMovies } from "@/src/hooks/useMovies"
import { IMAGE_BASE_URL } from "@/src/api/tmdb"


const HomeContent = () => {
  const { trending, topRated ,nowPlaying,upcomming,popularTv} = useMovies()

  if (trending.isLoading || topRated.isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-dark-bg">
        <ActivityIndicator size="large" color="#5C27FE" />
      </View>
    )
  }

  return (
    <ScrollView className="bg-dark-bg" showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-5 pt-12">
        <Text className="text-text-primary text-2xl font-bold">🎬 AniFlix</Text>
        <Ionicons name="notifications-outline" size={24} color="#A8B5DB" />
      </View>

      {/* Hero Section */}
      <View className="px-5 mt-6">
        <LinearGradient
          colors={["#5C27FE", "#E62E89"]}
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
              Discover what's trending this week
            </Text>
            <TouchableOpacity className="self-start bg-gradient-to-r from-[#5C27FE] to-[#E62E89] px-4 py-2 rounded-xl">
              <Text className="text-white font-medium">Explore Now</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>

      {/* Trending Movies */}
      <View className="mt-8">
        <Text className="text-text-primary text-lg font-semibold px-5 mb-3">
          Trending Now
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        >
          {trending.data?.slice(0, 10).map((movie: any) => (
            <TouchableOpacity
              key={movie.id}
              className="mr-5 rounded-2xl overflow-hidden"
            >
              <Image
                source={{ uri: `${IMAGE_BASE_URL}${movie.poster_path}` }}
                className="w-40 h-56 rounded-2xl"
              />
              <Text
                className="text-text-primary mt-2 font-medium text-center w-40"
                numberOfLines={1}
              >
                {movie.title}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Top Rated */}
      <View className="mt-8 ">
        <Text className="text-text-primary text-lg font-semibold px-5 mb-3">
          Top Rated
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        >
          {topRated.data?.slice(0, 10).map((movie: any) => (
            <TouchableOpacity
              key={movie.id}
              className="mr-5 rounded-2xl overflow-hidden"
            >
              <Image
                source={{ uri: `${IMAGE_BASE_URL}${movie.poster_path}` }}
                className="w-40 h-56 rounded-2xl"
              />
              <Text
                className="text-text-primary mt-2 font-medium text-center w-40"
                numberOfLines={1}
              >
                {movie.title}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
            <View className="mt-8 ">
        <Text className="text-text-primary text-lg font-semibold px-5 mb-3">
          Upcomming Movies
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        >
          {upcomming.data?.slice(0, 10).map((movie: any) => (
            <TouchableOpacity
              key={movie.id}
              className="mr-5 rounded-2xl overflow-hidden"
            >
              <Image
                source={{ uri: `${IMAGE_BASE_URL}${movie.poster_path}` }}
                className="w-40 h-56 rounded-2xl"
              />
              <Text
                className="text-text-primary mt-2 font-medium text-center w-40"
                numberOfLines={1}
              >
                {movie.title}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
            <View className="mt-8 ">
        <Text className="text-text-primary text-lg font-semibold px-5 mb-3">
          Popular Tv Shows
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        >
          {popularTv.data?.slice(0, 10).map((movie: any) => (
            <TouchableOpacity
              key={movie.id}
              className="mr-5 rounded-2xl overflow-hidden"
            >
              <Image
                source={{ uri: `${IMAGE_BASE_URL}${movie.poster_path}` }}
                className="w-40 h-56 rounded-2xl"
              />
              <Text
                className="text-text-primary mt-2 font-medium text-center w-40"
                numberOfLines={1}
              >
                {movie.title}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
         <View className="mt-8 mb-20">
        <Text className="text-text-primary text-lg font-semibold px-5 mb-3">
          Now Playing
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        >
          {nowPlaying.data?.slice(0, 10).map((movie: any) => (
            <TouchableOpacity
              key={movie.id}
              className="mr-5 rounded-2xl overflow-hidden"
            >
              <Image
                source={{ uri: `${IMAGE_BASE_URL}${movie.poster_path}` }}
                className="w-40 h-56 rounded-2xl"
              />
              <Text
                className="text-text-primary mt-2 font-medium text-center w-40"
                numberOfLines={1}
              >
                {movie.title}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  )
}

const Index = () => (
    <HomeContent />
)

export default Index
