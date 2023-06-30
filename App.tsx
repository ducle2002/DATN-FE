import {NavigationContainer} from '@react-navigation/native';
import React from 'react';

import {Provider} from 'react-redux';
import AuthenticationStack from './source/routes/authentication.stack';
import store from '@/store';
import {QueryClient, QueryClientProvider} from 'react-query';

const queryClient = new QueryClient();
function App(): JSX.Element {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <AuthenticationStack />
        </NavigationContainer>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
