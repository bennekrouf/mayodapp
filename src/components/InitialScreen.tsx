import React, { useEffect, useContext } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import { UserContext, UserContextType } from 'mayo-firebase-auth';
import { signInFirebase } from 'mayo-firestore-write';
import { RootStackParamList } from '../types/NavigationTypes';
import firebaseConfig from '../../fireBaseConfig.json';

const InitialScreen = () => {
  const { user, setUser, authEvents } = useContext(UserContext) as UserContextType;
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    if (user) {
      navigation.navigate('Home');
    } else {
      navigation.navigate('SignIn', { config: firebaseConfig });
    }
  }, [user]);
  

  useEffect(() => {
    const onSignedIn = async (googleCredentials:any) => {
      console.log('IN SIGN IN !!!');
      if(!googleCredentials) throw Error('InitialScreen - Trying to firebase signIn without googleCredentials !');
      const newUser = await signInFirebase(googleCredentials, firebaseConfig);
      if(!newUser) throw Error('InitialScreen - Firebase sign do not return any user !');
      setUser(newUser);
    };
    authEvents.on('signedIn', onSignedIn);

    return () => {
      authEvents.off('signedIn', onSignedIn);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/mayologo.jpg')} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});

export default InitialScreen;
