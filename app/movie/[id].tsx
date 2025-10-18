import { tmdbApi } from '@/src/api/tmdb'
import MovieDetails from '@/src/components/movie/MovieDetails'
import { colors } from '@/src/theme'
import { useQuery } from '@tanstack/react-query'
import { Stack, useLocalSearchParams } from 'expo-router'
import React from 'react'
import { ActivityIndicator, Text, View } from 'react-native'

const MovieDetailsScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>()
  const movieId = Number(id)

  const { data, isLoading, error } = useQuery({
    queryKey: ['movieDetails', movieId],
    queryFn: () => tmdbApi.getMovieDetails(movieId),
    enabled: !!movieId
  })

  if (isLoading) {
    return (
      <>
        {/* FIX: Keep the header hidden during the loading state as well */}
        <Stack.Screen options={{ headerShown: false }} />
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.background
          }}
        >
          <ActivityIndicator size='large' color={colors.primary} />
        </View>
      </>
    )
  }

  if (error) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.background
        }}
      >
        <Text style={{ color: colors.text }}>
          Failed to load movie details.
        </Text>
      </View>
    )
  }

  return (
    // This View wrapper is good practice to ensure a consistent background
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Stack.Screen options={{ headerShown: false, title: data.title }} />
      <MovieDetails movie={data} />
    </View>
  )
}

export default MovieDetailsScreen