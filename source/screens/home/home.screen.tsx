import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import {useAppSelector} from '@/hooks/redux.hook';
import HomeFunction from './components/home-function.component';
import HomeHeader from './components/home-hearder.component';
import {StackScreenProps} from '@react-navigation/stack';
import {AppStackParamsList} from '@/routes/app.stack';
import {useAccount} from '@/modules/user/user.hook';
import {useOrganizationUnit} from '@/modules/organization/organization.hook';
import {useConfigPermissions} from '@/modules/config/config.hook';
import {homeIconBackgrounColor} from '@/config/globalStyles';

export type HomeScreenProps = StackScreenProps<
  AppStackParamsList,
  'HOME_SCREEN'
>;

const HomeScreen = (props: HomeScreenProps) => {
  const {getOrganizationUnitByUser} = useOrganizationUnit();
  const {getConfigPermission} = useConfigPermissions();

  const {getUserInfor} = useAccount();

  const {isLogin} = useAppSelector(state => state.auth);
  const {grantedPermissions} = useAppSelector(state => state.config);

  useEffect(() => {
    if (isLogin) {
      getConfigPermission();
      getOrganizationUnitByUser();
      getUserInfor();
    }
  }, [getConfigPermission, getOrganizationUnitByUser, getUserInfor, isLogin]);

  return (
    <View style={styles.container}>
      <ScrollView bounces={false}>
        <HomeHeader {...props} />
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {grantedPermissions?.map((p, index) => (
            <HomeFunction
              key={p}
              type={p}
              style={{flexBasis: '33%', marginTop: 20}}
              iconContainerStyle={{
                backgroundColor:
                  homeIconBackgrounColor[index % homeIconBackgrounColor.length],
              }}
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
