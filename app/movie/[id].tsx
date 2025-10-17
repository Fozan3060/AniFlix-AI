import { tmdbApi } from '@/src/api/tmdb'
import MovieDetails from '@/src/components/MovieDetails'
import { useQuery } from '@tanstack/react-query'
import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import { ActivityIndicator, Text, View } from 'react-native'

const MovieDetailsPage = () => {
  const { id } = useLocalSearchParams<{ id: string }>()
  const movieId = Number(id)

  const { data, isLoading, error } = useQuery({
    queryKey: ['movieDetails', movieId],
    queryFn: () => tmdbApi.getMovieDetails(movieId),
    enabled: !!movieId,
  })

  if (isLoading)
    return (
      <View className="flex-1 justify-center items-center bg-dark-bg">
        <ActivityIndicator size="large" color="#AB8BFF" />
      </View>
    )

  if (error)
    return (
      <View className="flex-1 justify-center items-center bg-dark-bg">
        <Text className="text-white">Failed to load movie details.</Text>
      </View>
    )

  if (!data) return null

  return <MovieDetails movie={data} />
}

export default MovieDetailsPage
