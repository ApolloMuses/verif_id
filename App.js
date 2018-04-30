import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react'
import configureStore from './src/store';

import Main from './src/components/main';
import InputView from './src/components/inputView';
import PairSelector from './src/components/schoolPicker';
import FormView from './src/components/FormView';



export default class App extends React.Component {
  render() {
    const { persistor, store } = configureStore();

    const MainNavigator = StackNavigator({
      main: { screen: Main },
      pairSelector: { screen: PairSelector },
      inputView: { screen: InputView },
      formView: { screen: FormView }
    },

  );

    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>

          <View style={styles.container}>
            <MainNavigator />
          </View>

        </PersistGate>
      </Provider>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
