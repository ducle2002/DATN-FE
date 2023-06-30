import {NavigationContainer} from '@react-navigation/native';
import React from 'react';

import {Provider, useSelector} from 'react-redux';
import AuthenticationStack from './source/routes/authentication.stack';
import {QueryClient, QueryClientProvider} from 'react-query';
import AppStack from '@/routes/app.stack';

const queryClient = new QueryClient();
function App(): JSX.Element {
  const {isLogin} = useSelector(state => state.auth);
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        {isLogin ? <AppStack /> : <AuthenticationStack />}
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export default App;
