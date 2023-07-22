import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import BackgroundHeader from '@/components/background-header.component';
import Icon from '@/components/icon.component';
import {useNavigation} from '@react-navigation/native';
import {NotificationStackParamsList} from '@/routes/notification.stack';

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
        <TextInput style={styles.textInput} />
      </View>
    </BackgroundHeader>
  );
};

export default MainHeader;

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    width: '100%',
  },
});
