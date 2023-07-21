import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import HomeIcon from './home-icon.components';
import {permissionsType} from 'types/permissions';
import language, {languageKeys} from '@/config/language/language';
import globalStyles from '@/config/globalStyles';

type Props = React.ComponentProps<typeof View> & {
  type: permissionsType;
};

const HomeFunction = ({type, style, ...props}: Props) => {
  if (language.t(languageKeys[type])) {
    return (
      <View style={[styles.container, style]} {...props}>
        <View style={styles.iconContainer}>
          <HomeIcon type={type} />
        </View>
        <Text style={styles.text}>{language.t(languageKeys[type])}</Text>
      </View>
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
