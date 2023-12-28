import React from 'react';
import { View, Text } from 'react-native';

const ErrorScreen = ({ route }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{route.params?.errorMessage || 'An unexpected error occurred!'}</Text>
    </View>
  );
};

export default ErrorScreen;
