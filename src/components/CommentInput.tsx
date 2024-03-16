import {View, StyleSheet, TextInput} from 'react-native';
import React from 'react';
import {Button} from '../components';

type Props = {
  onComment: (comment: string) => void;
};

const CommentInput = ({onComment}: Props) => {
  const [commentContent, setCommentContent] = React.useState<string | null>(
    null,
  );

  const handleOnComment = () => {
    if (!commentContent) {
      return;
    }

    onComment(commentContent);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        multiline
        placeholder="Leave a comment..."
        onChangeText={setCommentContent}
      />
      {commentContent && commentContent.trim() && (
        <Button title="Send Comment" onPress={handleOnComment} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#bdbdbd',
  },
  input: {
    marginBottom: 8,
  },
});

export default CommentInput;
