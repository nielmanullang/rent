import {StyleProvider} from 'native-base';
import React from 'react';
import {AsyncStorage} from 'react-native';
import Storage from 'react-native-storage';
import {SafeAreaView} from 'react-navigation';
import {Provider} from 'react-redux';
import getTheme from './../native-base-theme/components';
import colors from './../native-base-theme/variables/commonColor';
import AppNavigator from './containers/AppNavigator';
import AuthService from './containers/AuthService';
import store from './redux/store';

var storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24 * 7,
  enableCache: true,
  sync: {},
});

global.storage = storage;

const App = () => (
  <StyleProvider style={getTheme(colors)}>
    <Provider store={store}>
      <AuthService>
        <SafeAreaView style={{flex: 1}}>
          <AppNavigator />
        </SafeAreaView>
      </AuthService>
    </Provider>
  </StyleProvider>
);

export default App;
