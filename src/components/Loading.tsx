import React from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';

export const Loading: React.FC = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginVertical: 16,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

