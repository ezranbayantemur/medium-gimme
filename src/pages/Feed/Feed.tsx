import React from 'react';
import {FlatList, SafeAreaView, type ListRenderItem} from 'react-native';
import useFetch from 'use-http';
import {useNavigation} from '@react-navigation/native';

import {Post} from '../../types';
import {SERVER_URL} from '../../configs/config';
import {PostCard, Loading, Error} from '../../components';

const FeedPage: React.FC = () => {
  const navigation = useNavigation<any>();
  const {data, loading, error} = useFetch<Post[]>(
    `${SERVER_URL}/posts`,
    {},
    [],
  );

  const renderPost: ListRenderItem<Post> = ({item}) => (
    <PostCard post={item} onSelected={() => handlePostSelected(item.id)} />
  );

  const handlePostSelected = (id: number) => {
    navigation.navigate('NewsDetailPage', {id});
  };

  if (error) {
    return <Error />;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <SafeAreaView>
      <FlatList
        keyExtractor={item => item.id.toString()}
        data={data}
        renderItem={renderPost}
      />
    </SafeAreaView>
  );
};

export default FeedPage;
