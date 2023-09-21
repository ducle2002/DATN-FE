import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useMemo} from 'react';
import {useAppSelector} from '@/hooks/redux.hook';
import HomeFunction from './components/home-function.component';
import HomeHeader from './components/home-header.component';
import {StackScreenProps} from '@react-navigation/stack';
import {AppStackParamsList} from '@/routes/app.stack';
import {useAccount} from '@/modules/user/user.hook';
import {useOrganizationUnit} from '@/modules/organization/organization.hook';
import {useConfigPermissions} from '@/modules/config/config.hook';
import globalStyles, {homeIconBackgroundColor} from '@/config/globalStyles';
import {
  administrativeFunction,
  managementFunction,
  operatorFunction,
  residentFunction,
  serviceFunction,
} from '@/modules/config/config.model';
import {languageKeys} from '@/config/language/language';
import {useTranslation} from 'react-i18next';

export type HomeScreenProps = StackScreenProps<
  AppStackParamsList,
  'HOME_SCREEN'
>;

const HomeScreen = (props: HomeScreenProps) => {
  const {getOrganizationUnitByUser} = useOrganizationUnit();
  const {getConfigPermission} = useConfigPermissions();

  const {getUserInfor} = useAccount();
  const language = useTranslation();

  const {isLogin} = useAppSelector(state => state.auth);
  const {grantedPermissions, isRefreshingPermissions} = useAppSelector(
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
    if (isRefreshingPermissions) {
      getConfigPermission();
    }
  }, [getConfigPermission, isRefreshingPermissions]);

  const {management, administrative, service, operator, resident} =
    useMemo(() => {
      const m = grantedPermissions?.filter(g => managementFunction.includes(g));
      const ad = grantedPermissions?.filter(g =>
        administrativeFunction.includes(g),
      );
      const s = grantedPermissions?.filter(g => serviceFunction.includes(g));

      const o = grantedPermissions?.filter(g => operatorFunction.includes(g));

      const r = grantedPermissions?.filter(g => residentFunction.includes(g));

      return {
        management: m,
        administrative: ad,
        service: s,
        operator: o,
        resident: r,
      };
    }, [grantedPermissions]);

  return (
    <View style={styles.container}>
      <ScrollView bounces={false}>
        <HomeHeader {...props} />
        {management.length > 0 && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>
              {language.t(languageKeys.management)}
            </Text>
            <View style={styles.section}>
              {management.map((p, index) => (
                <HomeFunction
                  key={p}
                  type={p}
                  style={styles.iconContainer}
                  iconContainerStyle={{
                    backgroundColor:
                      homeIconBackgroundColor[
                        index % homeIconBackgroundColor.length
                      ],
                  }}
                />
              ))}
            </View>
          </View>
        )}
        {administrative.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>
              {language.t(languageKeys.adminis)}
            </Text>
            <View style={styles.section}>
              {administrative.map((p, index) => (
                <HomeFunction
                  key={p}
                  type={p}
                  style={styles.iconContainer}
                  iconContainerStyle={{
                    backgroundColor:
                      homeIconBackgroundColor[
                        (index % homeIconBackgroundColor.length) + 1
                      ],
                  }}
                />
              ))}
            </View>
          </View>
        )}
        {resident.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>
              {language.t(languageKeys.adminis)}
            </Text>
            <View style={styles.section}>
              {resident.map((p, index) => (
                <HomeFunction
                  key={p}
                  type={p}
                  style={styles.iconContainer}
                  iconContainerStyle={{
                    backgroundColor:
                      homeIconBackgroundColor[
                        (index % homeIconBackgroundColor.length) + 1
                      ],
                  }}
                />
              ))}
            </View>
          </View>
        )}
        {service.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>
              {language.t(languageKeys.service)}
            </Text>
            <View style={styles.section}>
              {service.map((p, index) => (
                <HomeFunction
                  key={p}
                  type={p}
                  style={styles.iconContainer}
                  iconContainerStyle={{
                    backgroundColor:
                      homeIconBackgroundColor[
                        (index % homeIconBackgroundColor.length) + 2
                      ],
                  }}
                />
              ))}
            </View>
          </View>
        )}
        {operator.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>
              {language.t(languageKeys.inventory)}
            </Text>
            <View style={styles.section}>
              {operator.map((p, index) => (
                <HomeFunction
                  key={p}
                  type={p}
                  style={styles.iconContainer}
                  iconContainerStyle={{
                    backgroundColor:
                      homeIconBackgroundColor[
                        (index % homeIconBackgroundColor.length) + 3
                      ],
                  }}
                />
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  iconContainer: {
    flexBasis: '25%',
    marginBottom: 20,
  },
  sectionContainer: {
    marginTop: 15,
  },
  sectionTitle: {
    ...globalStyles.text15Bold,
    paddingLeft: 10,
    marginBottom: 10,
  },
});
