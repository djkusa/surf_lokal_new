import React, {useState, useEffect} from 'react';
import StackNavigator from './src/navigation/StackNavigator';
import Splash from './src/components/Splash';
import {SafeAreaView} from 'react-native-safe-area-context';
import {store} from './src/redux/store';
import {Provider} from 'react-redux';
import Colors from './src/utils/Colors';
// Add Firebase
import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';

import dynamicLinks from '@react-native-firebase/dynamic-links';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
  // Register background handler
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });

  messaging().getInitialNotification().then(remoteMessage => {
    if (remoteMessage) {
        console.log('Notiction App Open on Quit State', remoteMessage.notification)
    }
})

const App = () => {
  const [splash, setSplash] = useState(true);

  const HandleDeepLinking =  () => {
  const navigation = useNavigation()
    const handleDynamicLinks = async (link) => {
      console.log('Foreground link handling:', link)
      let productId = link.url.split('=').pop()
      console.log('productId:', productId,)
      navigation.navigate('ViewPropertiy', { ID: productId });

        // navigate('ProductDetail', { productId: productId })
    }
    useEffect(() => {
      const unsubscribe = dynamicLinks().onLink(handleDynamicLinks)
      return () => unsubscribe()
    }, [])

    return null
  }

  useEffect(() => {
    const firebaseConfig = {
      apiKey: 'AIzaSyCDtrP8Z7W5KUIfIYCLyKSgu4mK11na41M',
      authDomain: 'surflokalcrm.firebaseapp.com',
      projectId: 'surflokalcrm',
      storageBucket: 'surflokalcrm.appspot.com',
      messagingSenderId: '763888395949',
      appId: '1:763888395949:web:df7c02aa8bdbfb4d4b8824',
      measurementId: 'G-0HG1JK5CE9',
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    setTimeout(() => {
      setSplash(false);
    }, 3000);
  });
  if (splash == true) {
    return <Splash />;
  } else {
    
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: Colors.primaryBlue,
        }}>
        <Provider store={store}>
          <NavigationContainer>
            <HandleDeepLinking/>
            <StackNavigator />
            
          </NavigationContainer>
        </Provider>
      </SafeAreaView>
    );
  }
};

export default App;
