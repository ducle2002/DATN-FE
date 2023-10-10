import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import AuthenticationStack from './source/routes/auth.stack';
import AppStack from '@/routes/app.stack';
import {useAppSelector} from '@/hooks/redux.hook';
import {ToastProvider} from 'react-native-toast-notifications';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {PaperProvider} from 'react-native-paper';
import SplashScreen from 'react-native-splash-screen';
import {linking} from '@/config/linking';
import RoleScreen from '@/screens/role/role.screen';
import {useOrganizationUnit} from '@/modules/organization/organization.hook';
import {useConfigPermissions} from '@/modules/config/config.hook';
import {useAccount} from '@/modules/user/user.hook';

function App(): JSX.Element {
  const {role} = useAppSelector(state => state.role);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const {getOrganizationUnitByUser} = useOrganizationUnit();
  const {getConfigPermission} = useConfigPermissions();
  const {getUserInfor} = useAccount();
  const {isLogin} = useAppSelector(state => state.auth);
  const {isRefreshingPermissions} = useAppSelector(state => state.config);
  useEffect(() => {
    if (isLogin) {
      getConfigPermission();
      getOrganizationUnitByUser();
      getUserInfor();
    }
  }, [getConfigPermission, getOrganizationUnitByUser, getUserInfor, isLogin]);

  useEffect(() => {
    if (isRefreshingPermissions) {
      getConfigPermission();
    }
  }, [getConfigPermission, isRefreshingPermissions]);

  return (
    <SafeAreaProvider>
      <PaperProvider theme={{dark: false}}>
        <ToastProvider placement="center" duration={1500}>
          <NavigationContainer linking={linking}>
            <StatusBar translucent={true} backgroundColor={'transparent'} />
            {!isLogin ? (
              <AuthenticationStack />
            ) : role ? (
              <AppStack />
            ) : (
              <RoleScreen />
            )}
          </NavigationContainer>
        </ToastProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

export default App;
