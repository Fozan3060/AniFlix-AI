import React, { useState } from 'react'
import {
  View,
  TextInput,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'
import { useDebounce } from 'use-debounce'
import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { IMAGE_BASE_URL, tmdbApi } from '@/src/api/tmdb'
import { useSearchMovies } from '@/src/hooks/useMovies'

const PLACEHOLDER_IMAGE =
  'https://cdn4.iconfinder.com/data/icons/documents-36/25/picture-512.png' // fallback

const SearchScreen = () => {
  const [movieName, setMovieName] = useState('')
  const [debouncedMovieName] = useDebounce(movieName, 500)

  const {
    data: searchResults,
    isLoading,
    error
  } = useSearchMovies(debouncedMovieName)

  const handleMoviePress = (movieId: number) => {
    router.push(`/movie/${movieId}` as any)
  }

  return (
    <View className='flex-1 bg-dark-200 px-4 pt-6'>
      <Text className='text-light-100 text-2xl mt-6 font-bold mb-4'>Search Movie</Text>

      {/* Improved Input */}
      <View className='flex-row items-center bg-secondary/80 rounded-2xl px-4 py-1 mb-8 border border-dark-100 shadow-sm'>
        <Ionicons name='search' size={28} color='#AB8BFF' className='mr-2' />
        <TextInput
          value={movieName}
          onChangeText={setMovieName}
          placeholder='Search for a movie...'
          placeholderTextColor='#9CA4AB'
          style={{ outlineStyle: 'none' } as any}
          className='flex-1 text-light-100 text-xl'
        />
        {movieName.length > 0 && (
          <TouchableOpacity onPress={() => setMovieName('')}>
            <Ionicons name='close-circle' size={28} color='#9CA4AB' />
          </TouchableOpacity>
        )}
      </View>

      {/* Loading State */}
      {isLoading && (
        <View className='flex-1 justify-center items-center'>
          <ActivityIndicator size='large' color='#AB8BFF' />
        </View>
      )}

      {/* Error */}
      {error && (
        <Text className='text-red-500 text-center mt-4'>
          Failed to fetch movies. Please try again.
        </Text>
      )}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        {/* Empty Input State */}
        {movieName === '' && (
          <View className='mt-20 items-center'>
            <Ionicons name='film-outline' size={64} color='#9CA4AB' />
            <Text className='text-light-100 text-center mt-3 text-base'>
              Start typing to search for movies 🎬
            </Text>
          </View>
        )}

        {/* No Results */}
        {searchResults?.length === 0 && debouncedMovieName !== '' && (
          <View className='mt-20 items-center'>
            <Ionicons name='alert-circle-outline' size={48} color='#9CA4AB' />
            <Text className='text-light-100 text-center mt-3 text-base'>
              No movies found for "{debouncedMovieName}"
            </Text>
          </View>
        )}

        {/* Results */}
        <View className='flex-row flex-wrap justify-between'>
          {searchResults?.map((movie: any) => {
            const posterUri =
              movie.poster_path == null
                ? PLACEHOLDER_IMAGE
                : `${IMAGE_BASE_URL}${movie.poster_path}`
            return (
              <TouchableOpacity
                key={movie.id}
                className='w-[48%] mb-4 bg-secondary/70 rounded-2xl overflow-hidden shadow-md'
                activeOpacity={0.85}
                onPress={() => handleMoviePress(movie.id)}
              >
                <Image
                  source={{ uri: posterUri }}
                  className='w-full h-64'
                  resizeMode='cover'
                />
                <Text
                  className='text-light-100 text-sm font-semibold px-2 py-2'
                  numberOfLines={2}
                >
                  {movie.title}
                </Text>
              </TouchableOpacity>
            )
          })}
        </View>
      </ScrollView>
    </View>
  )
}

export default SearchScreen
