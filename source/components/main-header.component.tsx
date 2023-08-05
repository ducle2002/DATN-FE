import {StyleSheet, View} from 'react-native';
import React from 'react';
import BackgroundHeader from '@/components/background-header.component';
import Icon from '@/components/icon.component';
import {useNavigation} from '@react-navigation/native';
import CTextInput from '@/components/text-input.component';
import {Controller, useForm} from 'react-hook-form';

type Props = {
  keywordChange?: Function;
};
const MainHeader = ({keywordChange = () => {}}: Props) => {
  const navigation = useNavigation();
  const {control, handleSubmit} = useForm({
    defaultValues: {keyword: ''},
  });

  const onSubmit = (data: any) => {
    keywordChange(data.keyword);
  };

  return (
    <BackgroundHeader
      contentContainer={{height: 100, justifyContent: 'center'}}>
      <View style={styles.searchContainer}>
        <Icon
          name="chevron-back"
          size={25}
          type="Ionicons"
          onPress={() => navigation.goBack()}
          color={'white'}
        />
        <Controller
          control={control}
          name="keyword"
          render={({field: {value, onChange}}) => (
            <CTextInput
              style={{borderRadius: 20}}
              containerStyle={styles.textInput}
              value={value}
              onChangeText={onChange}
              onSubmitEditing={handleSubmit(onSubmit)}
              placeholder="Tìm kiếm"
            />
          )}
        />
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
    overflow: 'hidden',
  },
});
