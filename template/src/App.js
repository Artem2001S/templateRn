import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import useOneSignal from './hooks/useOneSignal';
import RNBootSplash from 'react-native-bootsplash';

import RootStackNavigator from '@/navigation/RootStackNavigator';

const App = () => {
  useOneSignal({notificationOpenAppHandler: () => {}});

  useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks
    };

    init().finally(async () => {
      await RNBootSplash.hide({fade: true});
      console.log('Bootsplash has been hidden successfully');
    });
  }, []);

  return (
    <NavigationContainer>
      <RootStackNavigator />
    </NavigationContainer>
  );
};

export default App;
