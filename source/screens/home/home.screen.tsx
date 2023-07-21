import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import {useMutation} from 'react-query';
import ConfigApi from '@/modules/config/config.service';
import {useAppDispatch, useAppSelector} from '@/hooks/redux.hook';
import {setConfig} from '@/modules/config/config.slice';
import HomeFunction from './components/home-function.component';
import HomeHeader from './components/home-hearder.component';
import {useLogout} from '@/modules/auth/auth.hook';
import {StackScreenProps} from '@react-navigation/stack';
import {AppStackParamsList} from '@/routes/app.stack';
import {useAccount} from '@/modules/user/user.hook';

export type HomeScreenProps = StackScreenProps<
  AppStackParamsList,
  'HOME_SCREEN'
>;

const HomeScreen = (props: HomeScreenProps) => {
  const dispatch = useAppDispatch();
  const {logout} = useLogout();
  useAccount();
  const {mutate: getConfig} = useMutation({
    mutationFn: () => ConfigApi.getConfigRequest(),
    onSuccess: ({data: {result}}) => {
      dispatch(
        setConfig({
          grantedPermissions: Object.keys(result.auth.grantedPermissions),
        }),
      );
    },
    onError: () => {
      logout();
    },
  });

  const {isLogin} = useAppSelector(state => state.auth);
  const {grantedPermissions} = useAppSelector(state => state.config);

  useEffect(() => {
    if (isLogin) {
      getConfig();
    }
  }, [getConfig, isLogin]);

  return (
    <View style={styles.container}>
      <ScrollView bounces={false}>
        <HomeHeader {...props} />
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {grantedPermissions?.map(p => (
            <HomeFunction
              key={p}
              type={p}
              style={{flexBasis: '33%', marginTop: 20}}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
