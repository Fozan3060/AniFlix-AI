// src/components/MovieDetails.tsx
import { Ionicons } from '@expo/vector-icons';
import React, { useCallback, useMemo, useState } from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import YoutubeIframe from 'react-native-youtube-iframe';
import { LinearGradient } from 'expo-linear-gradient';

// --- Type Definitions ---
interface Genre {
  id: number;
  name: string;
}
interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}
interface Video {
  key: string;
  site: string;
  type: string;
  official: boolean;
}
interface Movie {
  id: number;
  title: string;
  overview: string | null;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  runtime: number;
  genres: Genre[];
  tagline: string | null;
  credits: {
    cast: CastMember[];
  };
  videos: {
    results: Video[];
  };
}

// --- Helper Functions ---
const getImageUrl = (path: string | null, size: 'w500' | 'original' = 'w500') => {
  return path ? `https://image.tmdb.org/t/p/${size}${path}` : undefined;
};
const formatRuntime = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};

// --- Main Component ---
const MovieDetails = ({ movie }: { movie: Movie }) => {
  const [showTrailer, setShowTrailer] = useState(false);

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
        {/* --- Conditional Backdrop Header --- */}
        {movie.backdrop_path ? (
          <ImageBackground
            source={{ uri: getImageUrl(movie.backdrop_path, 'original') }}
            style={styles.backdrop}
          >
            <LinearGradient
              colors={['transparent', 'rgba(11, 11, 30, 0.8)', '#0B0B1E']}
              style={styles.gradient}
            />
          </ImageBackground>
        ) : (
          <View style={[styles.backdrop, { backgroundColor: '#0F0D23' }]} />
        )}

        <View style={styles.contentContainer}>
          {/* Play Trailer Button */}
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
            {/* Title & Metadata */}
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

            {/* Actions */}
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

            {/* Tagline */}
            {movie.tagline && <Text style={styles.tagline}>"{movie.tagline}"</Text>}

            {/* Overview */}
            {movie.overview && (
              <View>
                <Text style={styles.overview}>{movie.overview}</Text>
              </View>
            )}

            {/* Genres */}
            {movie.genres?.length > 0 && (
              <View style={styles.genresContainer}>
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

            {/* Cast */}
            {movie.credits?.cast?.length > 0 && (
              <View>
                <Text style={styles.sectionTitle}>Cast</Text>
                <FlatList
                  data={movie.credits.cast.slice(0, 10)}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => (
                    <View style={styles.castItem}>
                      {item.profile_path ? (
                        <Image
                          source={{ uri: getImageUrl(item.profile_path) }}
                          style={styles.castImage}
                        />
                      ) : (
                        <View style={styles.castImagePlaceholder}>
                          <Ionicons name="person" size={48} color="#A8B5DB" />
                        </View>
                      )}
                      <Text style={styles.castName} numberOfLines={2}>
                        {item.name}
                      </Text>
                    </View>
                  )}
                />
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      {/* --- Trailer Modal --- */}
      {trailer && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={showTrailer}
          onRequestClose={() => setShowTrailer(false)}
        >
          <Pressable style={styles.modalBackdrop} onPress={() => setShowTrailer(false)}>
            <View style={styles.videoContainer}>
              <YoutubeIframe
                height={300}
                play={true}
                videoId={trailer.key}
                onChangeState={onStateChange}
              />
            </View>
          </Pressable>
        </Modal>
      )}
    </View>
  );
};

// --- StyleSheet ---
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0B1E' },
  backdrop: { height: 250, justifyContent: 'flex-end', padding: 16 },
  gradient: { position: 'absolute', left: 0, right: 0, bottom: 0, top: 0 },
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
  genresContainer: { flex: 1 },
  genresList: { flexDirection: 'row', flexWrap: 'wrap' },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    width: '100%',
  },
  genrePill: {
    backgroundColor: '#0F0D23',
    borderRadius: 9999,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 8,
  },
  genreText: { color: '#D6C7FF', fontSize: 14 },
  castItem: { alignItems: 'center', marginRight: 16, width: 96 },
  castImage: { width: 96, height: 96, borderRadius: 48 },
  castImagePlaceholder: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#06061a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  castName: {
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 8,
    fontSize: 12,
    fontWeight: '600',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoContainer: { width: '100%', aspectRatio: 16 / 9 },
});

export default MovieDetails;