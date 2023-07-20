import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import AuthenticationStack from './source/routes/auth.stack';
import {QueryClient, QueryClientProvider} from 'react-query';
import AppStack from '@/routes/app.stack';
import {useAppSelector} from '@/hooks/redux.hook';

const queryClient = new QueryClient();
function App(): JSX.Element {
  const {isLogin} = useAppSelector(state => state.auth);
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        {isLogin ? <AppStack /> : <AuthenticationStack />}
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export default App;
