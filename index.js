/**
 * @format
 */
 import React from 'react';
 import {AppRegistry} from 'react-native';
 import Router from './src/router';
 import {name as appName} from './app.json';
 
 import {Provider} from 'react-redux';
 import ContactStore from './src/redux/store/contact.store';
 
 const App = () => {
     return (
         <Provider store={ContactStore}>
             <Router />
         </Provider>
     )
 }
 
 AppRegistry.registerComponent(appName, () => App);