import {TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from '@/components/icon.component';
import CTextInput from '@/components/text-input.component';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import LinearGradientHeader from './linear-gradient-header.component';
import {StackHeaderProps} from '@react-navigation/stack';

type Props = StackHeaderProps & {
  onKeywordChange?: (kw: string) => void;
};
const MainHeader = ({onKeywordChange = () => {}, ...props}: Props) => {
  const {handleSubmit, control, reset} = useForm({
    defaultValues: {keyword: ''},
  });
  const onSubmit: SubmitHandler<{keyword: string}> = data => {
    onKeywordChange(data.keyword);
  };
  const onClear = () => {
    reset();
    onKeywordChange('');
  };

  return (
    <LinearGradientHeader headerProps={props}>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{
            padding: 5,
          }}
          onPress={() => props.navigation.goBack()}>
          <Icon type="Ionicons" name="chevron-back" size={30} color={'white'} />
        </TouchableOpacity>
        <Controller
          control={control}
          name="keyword"
          render={({field: {value, onChange}}) => (
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Icon
                name="search"
                type="Ionicons"
                style={{position: 'absolute', zIndex: 10, left: 5}}
                color="#235195"
              />
              <CTextInput
                value={value}
                onChangeText={onChange}
                withError={false}
                containerStyle={{flex: 1}}
                style={{paddingHorizontal: 30, borderRadius: 20}}
                onSubmitEditing={handleSubmit(onSubmit)}
              />
              {value && (
                <Icon
                  name="close"
                  type="Ionicons"
                  style={{position: 'absolute', zIndex: 10, right: 5}}
                  onPress={onClear}
                />
              )}
            </View>
          )}
        />
        <View
          style={{
            padding: 10,
            width: 35,
            height: 35,
          }}
        />
      </View>
    </LinearGradientHeader>
  );
};

export default MainHeader;
