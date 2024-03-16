import React from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';

export const Error: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>❌</Text>
      <Text style={styles.text}>Opps! An error occured</Text>
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
  icon: {
    fontSize: 40,
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
