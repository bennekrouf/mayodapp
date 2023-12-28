/**
 * @format
 */
import {Buffer} from 'buffer';
import 'react-native-get-random-values';

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MainApp } from './src/navigation/AppNavigator';
import {ErrorBoundary} from 'mayo-logger';

// Mock event listener functions to prevent them from fataling.
window.addEventListener = () => {};
window.removeEventListener = () => {};
window.Buffer = Buffer;

const AppRoot: React.FC = () => {
    return (
      <SafeAreaProvider>
        <ErrorBoundary>
          <MainApp />
        </ErrorBoundary>
      </SafeAreaProvider>
    );
  };

AppRegistry.registerComponent(appName, () => AppRoot);
