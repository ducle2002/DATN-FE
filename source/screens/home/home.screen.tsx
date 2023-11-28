import {ScrollView, StyleSheet, View, useWindowDimensions} from 'react-native';
import React, {useMemo} from 'react';
import {useAppSelector} from '@/hooks/redux.hook';
import HomeFunction from './components/home-function.component';
import HomeHeader from './components/home-header.component';
import {StackScreenProps} from '@react-navigation/stack';
import {AppStackParamsList} from '@/routes/app.stack';
import globalStyles, {homeIconBackgroundColor} from '@/config/globalStyles';
import {appFeatures} from '@/modules/config/config.model';
import HomeStatistics from './components/home-statistic/home-statistics.component';

export type HomeScreenProps = StackScreenProps<
  AppStackParamsList,
  'HOME_SCREEN'
>;

const HomeScreen = (props: HomeScreenProps) => {
  const {grantedPermissions} = useAppSelector(state => state.config);

  const features = useMemo(() => {
    return appFeatures.filter(f => grantedPermissions.includes(f));
  }, [grantedPermissions]);

  const {height} = useWindowDimensions();
  return (
    <View style={styles.container}>
      <ScrollView bounces={false}>
        <HomeHeader {...props} />
        <View style={{top: -height * 0.05}}>
          <HomeStatistics />
          <View style={styles.section}>
            {features.map((p, index) => (
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
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  section: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
    paddingHorizontal: 10,
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
