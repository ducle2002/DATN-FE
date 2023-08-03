import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import AuthenticationStack from './source/routes/auth.stack';
import {QueryClient, QueryClientProvider} from 'react-query';
import AppStack from '@/routes/app.stack';
import {useAppSelector} from '@/hooks/redux.hook';
import {ToastProvider} from 'react-native-toast-notifications';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {PaperProvider} from 'react-native-paper';

const queryClient = new QueryClient();
function App(): JSX.Element {
  const {isLogin} = useAppSelector(state => state.auth);
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <PaperProvider theme={{dark: false}}>
          <ToastProvider placement="center" duration={1500}>
            <NavigationContainer>
              <StatusBar translucent={true} backgroundColor={'transparent'} />
              {isLogin ? <AppStack /> : <AuthenticationStack />}
            </NavigationContainer>
          </ToastProvider>
        </PaperProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}

export default App;
