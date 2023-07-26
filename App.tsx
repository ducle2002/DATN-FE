import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import AuthenticationStack from './source/routes/auth.stack';
import {QueryClient, QueryClientProvider} from 'react-query';
import AppStack from '@/routes/app.stack';
import {useAppSelector} from '@/hooks/redux.hook';
import {ToastProvider} from 'react-native-toast-notifications';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const queryClient = new QueryClient();
function App(): JSX.Element {
  const {isLogin} = useAppSelector(state => state.auth);
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <ToastProvider placement="center" duration={1500}>
          <NavigationContainer>
            {isLogin ? <AppStack /> : <AuthenticationStack />}
          </NavigationContainer>
        </ToastProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}

export default App;
