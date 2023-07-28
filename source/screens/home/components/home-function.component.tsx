import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import HomeIcon from './home-icon.components';
import {TPermission} from 'types/permissions';
import language, {languageKeys} from '@/config/language/language';
import globalStyles from '@/config/globalStyles';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AppStackParamsList} from '@/routes/app.stack';

type Props = React.ComponentProps<typeof TouchableOpacity> & {
  type: TPermission;
};

const HomeFunction = ({type, style, ...props}: Props) => {
  const navigation = useNavigation<NavigationProp<AppStackParamsList>>();

  const onPress = () => {
    switch (type) {
      case 'Pages.Management.Digital.Notices':
        return navigation.navigate('NOTIFICATION_STACK', {
          screen: 'MAIN_SCREEN',
        });
      case 'Pages.Management.Citizens.Reflects':
        return navigation.navigate('FEEDBACK_STACK', {screen: 'MAIN_SCREEN'});
      case 'Pages.Management.Citizens.Vote':
        return navigation.navigate('VOTE_STACK', {screen: 'MAIN_PAGE'});
    }
  };

  if (language.t(languageKeys[type])) {
    return (
      <TouchableOpacity
        style={[styles.container, style]}
        onPress={onPress}
        {...props}>
        <View style={styles.iconContainer}>
          <HomeIcon type={type} />
        </View>
        <Text style={styles.text}>{language.t(languageKeys[type])}</Text>
      </TouchableOpacity>
    );
  }
};

export default HomeFunction;

const styles = StyleSheet.create({
  iconContainer: {
    backgroundColor: '#2874CE',
    borderRadius: 20,
    width: 60,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    alignItems: 'center',
  },
  text: {
    ...globalStyles.text13SemiBold,
    marginTop: 5,
  },
});
