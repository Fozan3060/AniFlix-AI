import { getImageUrl } from '@/src/utils/tmdb';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { colors } from '@/src/theme'; // Import colors

interface MovieHeaderProps {
  backdropPath: string | null;
}

export const MovieHeader = ({ backdropPath }: MovieHeaderProps) => {
  return backdropPath ? (
    <ImageBackground
      source={{ uri: getImageUrl(backdropPath, 'original') }}
      style={styles.backdrop}
    >
      <LinearGradient
        colors={['transparent', colors.backdropOverlay, colors.background]}
        style={styles.gradient}
      />
    </ImageBackground>
  ) : (
    <View style={[styles.backdrop, { backgroundColor: colors.secondary }]} />
  );
};

const styles = StyleSheet.create({
  backdrop: { height: 250, justifyContent: 'flex-end', padding: 16 },
  gradient: { position: 'absolute', left: 0, right: 0, bottom: 0, top: 0 },
});