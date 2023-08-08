import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {List} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import {useAppDispatch} from '@/hooks/redux.hook';
import {SettingStackParamsList} from '@/routes/settings.stack';
import Icon from '@/components/icon.component';
import {setLanguage} from '@/modules/config/config.slice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import language, {languageKeys} from '@/config/language/language';

const LanguageScreen = () => {
  const navigation = useNavigation<NavigationProp<SettingStackParamsList>>();
  const {t} = useTranslation();
  const dispatch = useAppDispatch();

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon
            type="Ionicons"
            name="chevron-back"
            size={24}
            color={'#2B5783'}
          />
        </Pressable>
        <Text style={styles.txtHeader}>
          {t(languageKeys.setting.language.title)}
        </Text>
        <View />
      </View>
      <View style={{marginTop: 20, borderRadius: 10}}>
        <List.Accordion
          theme={{colors: {primary: '#339FD9'}}}
          title={'Ngôn ngữ'}
          // titleStyle={{color: coblacklor.}}
          description={language.language === 'vi' ? 'Tiếng Việt' : 'Tiếng Anh'}
          style={{backgroundColor: 'white'}}
          left={props => <List.Icon {...props} icon="bookshelf" />}>
          <List.Item
            title={'Tiếng Việt'}
            titleStyle={{
              fontWeight: language.language === 'vi' ? 'bold' : 'normal',
            }}
            style={{paddingLeft: 25}}
            onPress={() => {
              language.changeLanguage('vi');
              AsyncStorage.setItem('Language', 'vi');
              dispatch(setLanguage('vi'));
            }}
            right={() =>
              language.language === 'vi' ? <List.Icon icon={'check'} /> : null
            }
          />
          <List.Item
            title={'Tiếng Anh'}
            onPress={async () => {
              language.changeLanguage('en');
              AsyncStorage.setItem('Language', 'en');
              dispatch(setLanguage('en'));
            }}
            titleStyle={{
              fontWeight: language.language === 'en' ? 'bold' : 'normal',
            }}
            style={{paddingLeft: 25}}
            right={() =>
              language.language === 'en' ? <List.Icon icon={'check'} /> : null
            }
          />
        </List.Accordion>
      </View>
    </SafeAreaView>
  );
};

export default LanguageScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '2%',
    justifyContent: 'space-between',
  },
  txtHeader: {
    fontSize: 15,
    fontWeight: '700',
    color: '#333',
  },
});
