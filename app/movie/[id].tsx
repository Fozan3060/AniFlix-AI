import { tmdbApi } from '@/src/api/tmdb';
import MovieDetails from '@/src/components/movie/MovieDetails';
import { useQuery } from '@tanstack/react-query';
import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

const MovieDetailsScreen = () => {
  // 1. Get the 'id' from the URL, e.g., /movie/157336
  const { id } = useLocalSearchParams<{ id: string }>();
  const movieId = Number(id);

  // 2. Fetch the movie data using React Query
  const { data, isLoading, error } = useQuery({
    queryKey: ['movieDetails', movieId],
    queryFn: () => tmdbApi.getMovieDetails(movieId),
    enabled: !!movieId, // Only run the query if movieId is valid
  });

  // 3. Show a loading indicator while fetching
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0B0B1E' }}>
        <ActivityIndicator size="large" color="#AB8BFF" />
      </View>
    );
  }

  // 4. Show an error message if fetching fails
  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0B0B1E' }}>
        <Text style={{ color: 'white' }}>Failed to load movie details.</Text>
      </View>
    );
  }

  // 5. If data is ready, render the MovieDetails component
  return (
    <>
      <Stack.Screen options={{ headerShown:false}} />
      {data && <MovieDetails movie={data} />}
    </>
  );
};

export default MovieDetailsScreen;