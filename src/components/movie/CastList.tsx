import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CastMember } from '@/src/types'; // We'll create this types file next
import { getImageUrl } from '@/src/utils/tmdb';

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
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
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
});