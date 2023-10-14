import {ImageBackground, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TRole, role} from './service/role.model';
import language, {languageKeys} from '@/config/language/language';
import globalStyles from '@/config/globalStyles';
import {setRoleAction} from './service/role.slice';
import {useAppDispatch} from '@/hooks/redux.hook';

const RoleScreen = () => {
  const dispatch = useAppDispatch();
  const onSelectRole = (r: TRole) => {
    dispatch(setRoleAction(r));
  };
  return (
    <ImageBackground
      source={require('assets/images/login.background.png')}
      style={styles.imageBackgroundContainer}
      blurRadius={10}>
      <View style={styles.container}>
        {role.map(r => (
          <Pressable
            key={r.id}
            style={styles.itemContainer}
            onPress={() => {
              onSelectRole(r);
            }}>
            {r.Icon && <r.Icon />}
            <Text style={styles.text}>
              {language.t(languageKeys.role[r.label])}
            </Text>
          </Pressable>
        ))}
      </View>
    </ImageBackground>
  );
};

export default RoleScreen;

const styles = StyleSheet.create({
  imageBackgroundContainer: {
    flex: 1,
  },
  container: {
    backgroundColor: '#091D66B2',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: '15%',
  },
  itemContainer: {
    backgroundColor: 'white',
    marginVertical: 10,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    ...globalStyles.text16Bold,
    marginLeft: 20,
  },
});
