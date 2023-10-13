import {
  Dimensions,
  NativeModules,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Searchbar} from 'react-native-paper';
import Icon from '@/components/icon.component';
import LinearGradient from 'react-native-linear-gradient';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {FeedbackStackParamsList} from '@/routes/feedback.stack';
import {useTranslation} from 'react-i18next';
import {languageKeys} from '@/config/language/language';
const {StatusBarManager} = NativeModules;
const {width, height} = Dimensions.get('screen');
type Props = {
  searchQuery: string;
  setSearchQuery: Function;
  openModalFilter: Function;
};
const HeaderFeedback = ({
  searchQuery = '',
  setSearchQuery,
  openModalFilter,
}: Props) => {
  const [value, setValue] = useState(searchQuery);
  const {t} = useTranslation();
  const navigation = useNavigation<NavigationProp<FeedbackStackParamsList>>();
  return (
    <LinearGradient
      style={{
        paddingTop: StatusBarManager.HEIGHT,
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 10,
        justifyContent: 'space-around',
      }}
      colors={['#6587FF', '#0E3394']}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}>
        <Icon
          type="Ionicons"
          name="chevron-back-outline"
          color={'white'}
          size={24}
        />
      </TouchableOpacity>

      <Searchbar
        placeholder={t(languageKeys.feedback.main.search) as string}
        onChangeText={text => {
          setValue(text);
        }}
        onEndEditing={e => {
          setSearchQuery(e.nativeEvent.text);
        }}
        onClearIconPress={() => {
          setSearchQuery('');
        }}
        value={value}
        style={{
          backgroundColor: '#F1F2F8',
          height: height * 0.042,
          width: width * 0.72,
          marginHorizontal: width * 0.02,
          paddingLeft: 0,
          borderRadius: width * 0.4,
        }}
        inputStyle={{
          paddingLeft: 0,
          fontSize: 15,
          fontWeight: '600',
          color: '#333',
          marginVertical: -10,
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('CreateFeedbackScreen', {});
          }}
          style={{
            paddingRight: 5,
          }}>
          <Icon
            type="MaterialIcons"
            name="my-library-add"
            color={'white'}
            size={24}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (openModalFilter) {
              openModalFilter();
            }
          }}
          style={{
            paddingLeft: 5,
          }}>
          <Icon type="Ionicons" name="options" color={'white'} size={24} />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default HeaderFeedback;

const styles = StyleSheet.create({});
