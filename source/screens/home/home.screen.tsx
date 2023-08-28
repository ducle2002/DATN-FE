import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useMemo} from 'react';
import {useAppSelector} from '@/hooks/redux.hook';
import HomeFunction from './components/home-function.component';
import HomeHeader from './components/home-hearder.component';
import {StackScreenProps} from '@react-navigation/stack';
import {AppStackParamsList} from '@/routes/app.stack';
import {useAccount} from '@/modules/user/user.hook';
import {useOrganizationUnit} from '@/modules/organization/organization.hook';
import {useConfigPermissions} from '@/modules/config/config.hook';
import {homeIconBackgrounColor} from '@/config/globalStyles';
import {
  communicateFunction,
  residentManagementFunction,
  serviceFunction,
} from '@/modules/config/config.model';

export type HomeScreenProps = StackScreenProps<
  AppStackParamsList,
  'HOME_SCREEN'
>;

const HomeScreen = (props: HomeScreenProps) => {
  const {getOrganizationUnitByUser} = useOrganizationUnit();
  const {getConfigPermission} = useConfigPermissions();

  const {getUserInfor} = useAccount();

  const {isLogin} = useAppSelector(state => state.auth);
  const {grantedPermissions, isRefreshingPermisstions} = useAppSelector(
    state => state.config,
  );

  useEffect(() => {
    if (isLogin) {
      getConfigPermission();
      getOrganizationUnitByUser();
      getUserInfor();
    }
  }, [getConfigPermission, getOrganizationUnitByUser, getUserInfor, isLogin]);

  useEffect(() => {
    if (isRefreshingPermisstions) {
      getConfigPermission();
    }
  }, [getConfigPermission, isRefreshingPermisstions]);

  const {community, resident, service} = useMemo(() => {
    const c = grantedPermissions?.filter(g => communicateFunction.includes(g));
    const r = grantedPermissions?.filter(g =>
      residentManagementFunction.includes(g),
    );
    const s = grantedPermissions?.filter(g => serviceFunction.includes(g));
    return {community: c, resident: r, service: s};
  }, [grantedPermissions]);

  return (
    <View style={styles.container}>
      <ScrollView bounces={false}>
        <HomeHeader {...props} />
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {community.map((p, index) => (
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
          {resident.map((p, index) => (
            <HomeFunction
              key={p}
              type={p}
              style={{flexBasis: '33%', marginTop: 20}}
              iconContainerStyle={{
                backgroundColor:
                  homeIconBackgrounColor[
                    (index % homeIconBackgrounColor.length) + 1
                  ],
              }}
            />
          ))}
          {service.map((p, index) => (
            <HomeFunction
              key={p}
              type={p}
              style={{flexBasis: '33%', marginTop: 20}}
              iconContainerStyle={{
                backgroundColor:
                  homeIconBackgrounColor[
                    (index % homeIconBackgrounColor.length) + 1
                  ],
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
