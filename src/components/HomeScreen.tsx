import React, {useEffect, useContext} from 'react';
import { Text, StyleSheet, View } from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';

import { UserContext, UserContextType } from 'mayo-firebase-auth';
import { useMayoSettings, MayoSettingsModal } from 'mayo-settings';
import { RootStackParamList } from '../types/NavigationTypes';
import { Logger } from 'mayo-logger';
import { handleLogout } from '../storage/handleLogout';

const HomeScreen = () => {
  const { authEvents } = useContext(UserContext) as UserContextType;
  Logger.info('Auth Events Context:', authEvents, { tag: 'HomeScreen:Context' });
  const navigation = useNavigation<NavigationProp<RootStackParamList, 'SignIn'>>();

  useEffect(() => {
    const onSignedOut = async () => {
      Logger.info('User signed out. Navigating to SignIn.', null, { tag: 'HomeScreen:onSignedOut' });
      navigation.navigate('SignIn');
    };
    
    authEvents.on('signedOut', onSignedOut);
    
    return () => {
      Logger.info('Cleanup: Removing signedOut event listener.', null, { tag: 'HomeScreen:useEffectCleanup' });
      authEvents.off('signedOut', onSignedOut);
    };
  }, []);

  const { isMayoSettingsOpen, handleCloseMayoSettings } = useMayoSettings();
  Logger.info('User Preference Modal State:', { isOpen: isMayoSettingsOpen }, { tag: 'HomeScreen:ModalState' });

  return (
    <View style={styles.view}>
      <MayoSettingsModal
        visible={isMayoSettingsOpen}
        onClose={handleCloseMayoSettings}
        onLogout={handleLogout}
        config={{
          headerTitle: 'Custom Settings',
          logoutButtonText: 'Custom Logout',
        }}
      >
        <Text>Super content</Text>
      </MayoSettingsModal>
      
    </View>
   );
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: '#fff',
    elevation: 3,
    flex: 1,
    padding: 0,
  },
  headerContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
    paddingHorizontal: 5,
    elevation: 3, // This will add shadow in Android
    shadowColor: '#000', // iOS shadow
    shadowOffset: {
      // iOS shadow
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22, // iOS shadow
    shadowRadius: 2.22, // iOS shadow
    backgroundColor: '#fff', // You should set background color for the shadow to appear
  },
  optionsMenuText: {
    fontSize: 24,
    padding: 5,
  }
});

export default HomeScreen;
