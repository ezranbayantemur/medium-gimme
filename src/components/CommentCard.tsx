import React from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {Comment} from '../types';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface CommentCardProps {
  comment: Comment;
}

export const CommentCard: React.FC<CommentCardProps> = ({comment}) => {
  const [isLiked, setIsLiked] = React.useState(false);
  const [likeCount, setLikeCount] = React.useState(
    Math.floor(Math.random() * 100),
  );

  const handleOnLike = () => {
    if (isLiked) {
      setLikeCount(likeCount - 1);
      setIsLiked(false);
    } else {
      setIsLiked(true);
      setLikeCount(likeCount + 1);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{comment.email.split('@')[0]}</Text>
      <Text style={styles.body}>{comment.body}</Text>
      <TouchableOpacity style={styles.like_button} onPress={handleOnLike}>
        <Text>{likeCount} ♥️</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  body: {
    fontSize: 12,
    marginBottom: 8,
  },
  like_button: {
    alignSelf: 'flex-end',
  },
});
