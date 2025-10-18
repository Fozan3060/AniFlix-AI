import { getImageUrl } from '@/src/utils/tmdb';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { ImageBackground, StyleSheet, View, ActivityIndicator } from 'react-native';
import { colors } from '@/src/theme';

// 1. Define the placeholder URL as a constant
const PLACEHOLDER_IMAGE = 'https://cdn4.iconfinder.com/data/icons/documents-36/25/picture-512.png';

interface MovieHeaderProps {
  backdropPath: string | null;
}

export const MovieHeader = ({ backdropPath }: MovieHeaderProps) => {
  const [isLoading, setIsLoading] = useState(true);

  // Use the actual backdrop URI or the placeholder
  const imageUri = backdropPath ? getImageUrl(backdropPath, 'original') : PLACEHOLDER_IMAGE;

  return (
    <ImageBackground
      source={{ uri: imageUri }}
      // Use 'contain' for the placeholder, 'cover' for the real image
      resizeMode={backdropPath ? 'cover' : 'contain'}
      style={styles.backdrop}
      onLoadEnd={() => setIsLoading(false)}
    >
      {/* Show loader only when a real image is loading */}
      {isLoading && backdropPath && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      )}

      {/* Only show the gradient overlay on a real backdrop image */}
      {backdropPath && (
        <LinearGradient
          colors={['transparent', colors.backdropOverlay, colors.background]}
          style={styles.gradient}
        />
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.secondary,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
});