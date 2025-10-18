import { Movie } from '@/src/types';
import { formatRuntime } from '@/src/utils/formatters';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router'; // 1. Import useRouter
import React, { useCallback, useMemo, useState } from 'react';
import {
  SafeAreaView, // 1. Import SafeAreaView
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { CastList } from './CastList';
import { MovieHeader } from './MovieHeader';
import { TrailerModal } from './TrailerModal';

const MovieDetails = ({ movie }: { movie: Movie }) => {
  const [showTrailer, setShowTrailer] = useState(false);
  const router = useRouter(); // 2. Initialize the router

  const trailer = useMemo(
    () => movie.videos?.results.find((v) => v.official && v.type === 'Trailer'),
    [movie.videos]
  );

  const onStateChange = useCallback((state: string) => {
    if (state === 'ended' || state === 'paused') {
      setShowTrailer(false);
    }
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <MovieHeader backdropPath={movie.backdrop_path} />

        <View style={styles.contentContainer}>
          {/* ... The rest of your component's JSX remains the same ... */}
          {trailer && (
            <TouchableOpacity
              onPress={() => setShowTrailer(true)}
              style={styles.playButton}
            >
              <Ionicons name="play" size={20} color="#FFFFFF" />
              <Text style={styles.playButtonText}>Play Trailer</Text>
            </TouchableOpacity>
          )}

          <View style={styles.infoContainer}>
            <View>
              <Text style={styles.title}>{movie.title}</Text>
              <View style={styles.metadataContainer}>
                {movie.release_date && (
                  <Text style={styles.mutedText}>
                    {new Date(movie.release_date).getFullYear()}
                  </Text>
                )}
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={16} color="#AB8BFF" />
                  <Text style={styles.accentText}>{movie.vote_average.toFixed(1)}</Text>
                </View>
                <Text style={styles.mutedText}>{formatRuntime(movie.runtime)}</Text>
              </View>
            </View>
            <View style={styles.actionsContainer}>
              <TouchableOpacity style={styles.actionItem}>
                <Ionicons name="add" size={32} color="#A8B5DB" />
                <Text style={styles.actionText}>My List</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionItem}>
                <Ionicons name="share-social" size={32} color="#A8B5DB" />
                <Text style={styles.actionText}>Share</Text>
              </TouchableOpacity>
            </View>
            {movie.tagline && <Text style={styles.tagline}>"{movie.tagline}"</Text>}
            {movie.overview && <Text style={styles.overview}>{movie.overview}</Text>}
            {movie.genres?.length > 0 && (
              <View>
                <Text style={styles.sectionTitle}>Genres</Text>
                <View style={styles.genresList}>
                  {movie.genres.map((genre) => (
                    <View key={genre.id} style={styles.genrePill}>
                      <Text style={styles.genreText}>{genre.name}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
            <CastList cast={movie.credits?.cast} />
          </View>
        </View>
      </ScrollView>

      {/* 3. Add the Close Button JSX */}
      <SafeAreaView style={styles.closeButtonContainer}>
        <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}>
          <Ionicons name="close" size={28} color="white" />
        </TouchableOpacity>
      </SafeAreaView>

      <TrailerModal
        isVisible={showTrailer}
        trailerKey={trailer?.key}
        onClose={() => setShowTrailer(false)}
        onStateChange={onStateChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  // ... (previous styles)
  container: { flex: 1, backgroundColor: '#0B0B1E' },
  contentContainer: { padding: 16, gap: 24, marginTop: -50 },
  playButton: {
    backgroundColor: '#AB8BFF',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 8,
  },
  playButtonText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 18 },
  infoContainer: { marginLeft: 10, gap: 20 },
  title: { color: '#FFFFFF', fontSize: 30, fontWeight: 'bold', marginBottom: 8 },
  metadataContainer: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  mutedText: { color: '#A8B5DB' },
  ratingContainer: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  accentText: { color: '#AB8BFF', fontWeight: 'bold' },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 40,
    marginTop: 10,
  },
  actionItem: { alignItems: 'center', gap: 4 },
  actionText: { color: '#A8B5DB', fontSize: 12 },
  tagline: { color: '#A8B5DB', fontStyle: 'italic', textAlign: 'center' },
  overview: { color: '#A8B5DB', lineHeight: 24, fontSize: 16 },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  genresList: { flexDirection: 'row', flexWrap: 'wrap' },
  genrePill: {
    backgroundColor: '#0F0D23',
    borderRadius: 9999,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 8,
  },
  genreText: { color: '#D6C7FF', fontSize: 14 },

  // 4. Add the styles for the close button
  closeButtonContainer: {
    position: 'absolute',
    top: 10, // Adjust this value to account for the status bar
    right: 10,
    zIndex: 10,
  },
  closeButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MovieDetails;