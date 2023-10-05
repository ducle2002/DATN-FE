import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import AuthenticationStack from './source/routes/auth.stack';
import {QueryClient, QueryClientProvider} from 'react-query';
import AppStack from '@/routes/app.stack';
import {useAppSelector} from '@/hooks/redux.hook';
import {ToastProvider} from 'react-native-toast-notifications';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {PaperProvider} from 'react-native-paper';
import SplashScreen from 'react-native-splash-screen';
import {linking} from '@/config/linking';

const queryClient = new QueryClient();
function App(): JSX.Element {
  const {isLogin} = useAppSelector(state => state.auth);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <PaperProvider theme={{dark: false}}>
          <ToastProvider placement="center" duration={1500}>
            <NavigationContainer linking={linking}>
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
