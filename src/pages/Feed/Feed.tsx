import React, {useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  type ListRenderItem,
  Text,
  StyleSheet,
} from 'react-native';
import useFetch from 'use-http';
import {useNavigation} from '@react-navigation/native';

import {Post} from '../../types';
import {SERVER_URL} from '../../configs/config';
import {PostCard, Loading, Error, SearchBar} from '../../components';

const FeedPage: React.FC = () => {
  const navigation = useNavigation<any>();
  const [searchText, setSearchText] = useState('');
  const {data, loading, error} = useFetch<Post[]>(
    `${SERVER_URL}/posts`,
    {},
    [],
  );

  const renderPost: ListRenderItem<Post> = ({item}) => (
    <PostCard
      post={item}
      onSelected={() => handlePostSelected(item.id, item.userId)}
    />
  );

  const handlePostSelected = (newsId: number, authorId: number) => {
    navigation.navigate('NewsDetailPage', {newsId, authorId});
  };

  const handleSearch = (text: string) => {
    setSearchText(text);
  };

  if (error) {
    return <Error />;
  }

  if (loading) {
    return <Loading />;
  }

  if (!data) {
    return null;
  }

  const filteredData = data.filter(item =>
    item.title.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <SafeAreaView>
      <FlatList
        keyExtractor={item => item.id.toString()}
        data={filteredData.slice(0, 20) || []}
        renderItem={renderPost}
        ListHeaderComponent={<SearchBar onSearch={handleSearch} />}
        ListEmptyComponent={
          <Text style={styles.empty_list_title}>
            Can't find new about "{searchText}"
          </Text>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  empty_list_title: {
    textAlign: 'center',
    padding: 20,
    color: 'gray',
  },
});

export default FeedPage;
