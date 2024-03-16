import React from 'react';
import {SafeAreaView, Text, StyleSheet, View} from 'react-native';
import useFetch from 'use-http';
import {Post, User} from '../../types';
import {SERVER_URL} from '../../configs/config';
import {Button, Loading, Error} from '../../components';
import {useNavigation, useRoute} from '@react-navigation/native';

const NewsDetailPage: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const {id} = route.params;
  const {
    data: newsData,
    loading: newsLoading,
    error: newsError,
  } = useFetch<Post>(`${SERVER_URL}/posts/${id}`, {}, []);
  const {
    data: authorData,
    loading: authorLoading,
    error: authorError,
  } = useFetch<User>(`${SERVER_URL}/users/${id}`, {}, []);

  const handleSeeComments = () => {
    navigation.navigate('CommentsPage', {id});
  };

  if (newsError || authorError) {
    return <Error />;
  }

  if (newsLoading || authorLoading) {
    return <Loading />;
  }

  if (!newsData || !authorData) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner_container}>
        <Text style={styles.title}>{newsData.title}</Text>
        <Text style={styles.author_name}>
          {authorData.name} at {authorData.company.name}
        </Text>
        <Text style={styles.body}>{newsData.body}</Text>
      </View>
      <Button title="See Comments" onPress={handleSeeComments} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inner_container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  body: {
    fontSize: 12,
    marginBottom: 8,
  },
  author_name: {
    fontSize: 12,
    marginBottom: 8,
    color: 'gray',
    textAlign: 'right',
  },
});

export default NewsDetailPage;
