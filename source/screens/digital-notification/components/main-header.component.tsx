import {StyleSheet, View} from 'react-native';
import React from 'react';
import BackgroundHeader from '@/components/background-header.component';
import Icon from '@/components/icon.component';
import {useNavigation} from '@react-navigation/native';
import CTextInput from '@/components/text-input.component';

const MainHeader = () => {
  const navigation = useNavigation();
  return (
    <BackgroundHeader>
      <View style={styles.searchContainer}>
        <Icon
          name="chevron-back"
          size={25}
          type="Ionicons"
          onPress={() => navigation.goBack()}
          color={'white'}
        />
        <CTextInput containerStyle={styles.textInput} />
        <Icon
          name="chevron-back"
          size={25}
          type="Ionicons"
          color={'transparent'}
        />
      </View>
    </BackgroundHeader>
  );
};

export default MainHeader;

const styles = StyleSheet.create({
  textInput: {
    width: '80%',
  },
  searchContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
