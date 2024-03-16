import React, {useEffect} from 'react';
import {
  FlatList,
  SafeAreaView,
  type ListRenderItem,
  StyleSheet,
  View,
} from 'react-native';
import useFetch from 'use-http';
import {Comment} from '../../types';
import {SERVER_URL} from '../../configs/config';
import {CommentCard, Loading, Error} from '../../components';
import {useRoute} from '@react-navigation/native';
import CommentInput from '../../components/CommentInput';

const CommentsPage: React.FC = () => {
  const route = useRoute<any>();
  const {newsId} = route.params;
  const {get, loading, error} = useFetch<Comment[]>(
    `${SERVER_URL}/posts/${newsId}/comments`,
    {},
    [],
  );
  const [data, setData] = React.useState<Comment[] | null>(null);

  useEffect(() => {
    get().then(setData);
  }, []);

  const renderComment: ListRenderItem<Comment> = ({item}) => (
    <CommentCard comment={item} />
  );

  const handleOnComment = (comment: string) => {
    if (!data) {
      return;
    }

    setData([
      ...data,
      {
        postId: Math.random(),
        id: Math.random(),
        name: 'Foo Doe',
        email: 'Foo_Doe@mail.com',
        body: comment,
      },
    ]);
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

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        keyExtractor={item => item.id.toString()}
        data={data}
        renderItem={renderComment}
        ListHeaderComponent={() => <CommentInput onComment={handleOnComment} />}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  separator: {
    borderWidth: 0.5,
    borderColor: '#bdbdbd',
  },
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

export default CommentsPage;
