import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {useMutation} from 'react-query';
import ConfigApi from '@/modules/config/config.service';
import {useAppDispatch, useAppSelector} from '@/hooks/redux.hook';
import {setConfig} from '@/modules/config/config.slice';
import HomeFunction from './components/home-function.component';
import HomeHeader from './components/home-hearder.component';
const {height} = Dimensions.get('screen');

const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const {mutate: getConfig} = useMutation({
    mutationFn: () => ConfigApi.getConfigRequest(),
    onSuccess: ({data: {result}}) => {
      dispatch(
        setConfig({
          grantedPermissions: Object.keys(result.auth.grantedPermissions),
        }),
      );
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
        <HomeHeader />
        {grantedPermissions?.map(p => (
          <HomeFunction key={p} type={p} />
        ))}
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
