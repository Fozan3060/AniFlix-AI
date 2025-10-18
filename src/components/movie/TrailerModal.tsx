import React from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import YoutubeIframe from 'react-native-youtube-iframe';

interface TrailerModalProps {
  isVisible: boolean;
  trailerKey: string | undefined;
  onClose: () => void;
  onStateChange: (state: string) => void;
}

export const TrailerModal = ({ isVisible, trailerKey, onClose, onStateChange }: TrailerModalProps) => {
  if (!trailerKey) {
    return null;
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <Pressable style={styles.modalBackdrop} onPress={onClose}>
        <View style={styles.videoContainer}>
          <YoutubeIframe
            height={300}
            play={true}
            videoId={trailerKey}
            onChangeState={onStateChange}
          />
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoContainer: { width: '100%', aspectRatio: 16 / 9 },
});