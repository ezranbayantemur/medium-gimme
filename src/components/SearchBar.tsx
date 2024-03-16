import React, {useState} from 'react';
import {TextInput, Button, View, StyleSheet} from 'react-native';

interface SearchBarProps {
  onSearch: (text: string) => void;
}

export const SearchBar = ({onSearch}: SearchBarProps) => {
  const handleInputChange = (text: string) => {
    onSearch(text);
  };

  return (
    <TextInput
      placeholder="Search news..."
      style={styles.input}
      onChangeText={handleInputChange}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: '#bdbdbd',
    borderWidth: 1,
  },
});
