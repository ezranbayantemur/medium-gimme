import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import FeedScreen from './pages/Feed';
import NewsDetailScreen from './pages/NewsDetail';
import CommentsScreen from './pages/Comments';

const Stack = createStackNavigator();

const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="FeedPage"
          component={FeedScreen}
          options={{
            title: '📰 Feed',
          }}
        />
        <Stack.Screen
          name="NewsDetailPage"
          component={NewsDetailScreen}
          options={{
            title: '🔍 News Detail',
          }}
        />
        <Stack.Screen
          name="CommentsPage"
          component={CommentsScreen}
          options={{
            title: '💬 Comments',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
