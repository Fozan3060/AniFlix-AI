import React from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { getImageUrl } from '@/src/utils/tmdb';

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
        colors={['transparent', 'rgba(11, 11, 30, 0.8)', '#0B0B1E']}
        style={styles.gradient}
      />
    </ImageBackground>
  ) : (
    <View style={[styles.backdrop, { backgroundColor: '#0F0D23' }]} />
  );
};

const styles = StyleSheet.create({
  backdrop: { height: 250, justifyContent: 'flex-end', padding: 16 },
  gradient: { position: 'absolute', left: 0, right: 0, bottom: 0, top: 0 },
});