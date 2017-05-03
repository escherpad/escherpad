import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Ra_ from "./src/client-common/Ra_"

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>hi you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
      </View>
    );
  }
}

const ra_ = new Ra_();
/* ra_.loadModule(require('./src/client-common/core/app').default);*/
/* ra_.loadModule(require('./src/client-common/core/context-view').default);*/
/* ra_.loadModule(require('./src/client-common/core/file-list-view').default);*/


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});




