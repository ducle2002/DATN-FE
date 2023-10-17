import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useMemo} from 'react';
import {useAppSelector} from '@/hooks/redux.hook';
import HomeFunction from './components/home-function.component';
import HomeHeader from './components/home-header.component';
import {StackScreenProps} from '@react-navigation/stack';
import {AppStackParamsList} from '@/routes/app.stack';
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
  const language = useTranslation();

  const {grantedPermissions} = useAppSelector(state => state.config);

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
              {language.t(languageKeys.operator)}
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

        {/* <Text style={styles.sectionTitle}>Vận hành tòa nhà</Text>
        <View style={styles.section}>
          <View style={styles.section}>
            <HomeFunction
              type="Pages.Invoices.Monthly.GetAll"
              style={styles.iconContainer}
              iconContainerStyle={{
                backgroundColor: homeIconBackgroundColor[0],
              }}
              onPress={() => {
                props.navigation.navigate('OPERATING_STACK', {
                  screen: 'WATER_BILL',
                  params: {screen: 'MAIN_WATER'},
                });
              }}
            />
          </View>
          <View style={styles.section}>
            <HomeFunction
              type="Pages.Operations.TaskManagement.GetAll"
              style={styles.iconContainer}
              iconContainerStyle={{
                backgroundColor: homeIconBackgroundColor[4],
              }}
              onPress={() => {
                props.navigation.navigate('WORK_MANAGEMENT', {
                  screen: 'MAIN_DRAWER',
                  params: {screen: 'MANAGEMENT'},
                });
              }}
            />
          </View>
        </View> */}
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
