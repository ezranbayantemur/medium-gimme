import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
import useFetch from 'use-http';
import {User} from '../../types';
import {SERVER_URL} from '../../configs/config';
import {Loading, Error} from '../../components';
import {useRoute} from '@react-navigation/native';

const AuthorPage: React.FC = () => {
  const route = useRoute<any>();
  const {authorId} = route.params;
  const {data, loading, error} = useFetch<User>(
    `${SERVER_URL}/users/${authorId}`,
    {},
    [],
  );
  console.log(`${SERVER_URL}/users/${authorId}`);
  if (error) {
    return <Error />;
  }

  if (loading) {
    return <Loading />;
  }

  if (!data) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner_container}>
        <Text style={styles.name}>{data.name}</Text>
        <Text style={styles.username}>{data.username}</Text>
        <Text style={styles.info_field}>📞 {data.phone}</Text>
        <Text style={styles.info_field}>💻 {data.website}</Text>
        <Text style={styles.info_field}>✉️ {data.email}</Text>

        <Text style={styles.workname}>Working at {data.company.name}</Text>
        <Text style={styles.work_catch}>{data.company.catchPhrase}</Text>
        <Text style={styles.workbs}>({data.company.bs})</Text>
      </View>
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
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  username: {
    textAlign: 'right',
    color: 'gray',
  },
  info_field: {
    marginBottom: 8,
  },
  workname: {
    fontSize: 16,
    marginTop: 10,
    fontWeight: 'bold',
  },
  work_catch: {
    fontStyle: 'italic',
  },
  workbs: {
    marginTop: 5,
    fontSize: 12,
  },
});

export default AuthorPage;
