import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { MayoSettingsProvider } from 'mayo-settings';
import { SignInScreen, UserProvider } from 'mayo-firebase-auth';

import InitialScreen from '../components/InitialScreen';
import HomeScreen from '../components/HomeScreen';
import { RootStackParamList } from '../types/NavigationTypes';
import SolanaScreen from '../solana/Main';

const Stack = createStackNavigator<RootStackParamList>();

export const MainApp: React.FC = () => {
  return (
    <NavigationContainer>
      <UserProvider>
        <MayoSettingsProvider>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={InitialScreen}
              options={{ headerShown: false }} 
             />
            <Stack.Screen name="SignIn" component={SignInScreen}
            options={{ 
              headerLeft: () => null,
              headerShown: false,
            }}
            />
            <Stack.Screen name="Home" component={HomeScreen} 
                options={{ 
                  headerLeft: () => null,
                  headerShown: false,
                }}
            />
            <Stack.Screen name="Solana" component={SolanaScreen} 
                options={{ 
                  headerLeft: () => null,
                  headerShown: false,
                }}
            />
          </Stack.Navigator>
        </MayoSettingsProvider>
      </UserProvider>
    </NavigationContainer>
  );
};