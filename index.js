/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import store from '@/store';
import {QueryClient, QueryClientProvider} from 'react-query';

const queryClient = new QueryClient();

const RenderApp = () => (
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <App />
    </Provider>
  </QueryClientProvider>
);

AppRegistry.registerComponent(appName, () => RenderApp);
