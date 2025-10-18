import { getImageUrl } from '@/src/utils/tmdb';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { CastMember } from '@/src/types';
import { colors } from '@/src/theme';

interface CastListProps {
  cast: CastMember[];
}

export const CastList = ({ cast }: CastListProps) => {
  if (!cast || cast.length === 0) {
    return null;
  }

  return (
    <View>
      <Text style={styles.sectionTitle}>Cast</Text>
      <FlatList
        data={cast.slice(0, 10)}
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
                <Ionicons name="person" size={48} color={colors.muted} />
              </View>
            )}
            <Text style={styles.castName} numberOfLines={2}>
              {item.name}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  castItem: { alignItems: 'center', marginRight: 16, width: 96 },
  castImage: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.cardMuted,
  },
  castImagePlaceholder: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.cardMuted,
    justifyContent: 'center',
    alignItems: 'center',
  },
  castName: {
    color: colors.text,
    textAlign: 'center',
    marginTop: 8,
    fontSize: 12,
    fontWeight: '600',
  },
});