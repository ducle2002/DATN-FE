import {TouchableOpacity, View} from 'react-native';
import React from 'react';
import LinearGradientHeader from '@/components/linear-gradient-header.component';
import {StackHeaderProps} from '@react-navigation/stack';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import Icon from '@/components/icon.component';
import CTextInput from '@/components/text-input.component';
import language, {languageKeys} from '@/config/language/language';
import {useAppSelector} from '@/hooks/redux.hook';
import {ERole} from '@/screens/role/service/role.model';

type Props = StackHeaderProps & {
  onKeywordChange: (kw: string) => void;
  placeholder?: string;
};

const WorkHeader = ({onKeywordChange, placeholder, ...props}: Props) => {
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
  const {role} = useAppSelector(state => state.role);
  return (
    <LinearGradientHeader headerProps={props}>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        {props.navigation.canGoBack() ? (
          <TouchableOpacity
            style={{
              padding: 5,
            }}
            onPress={() => props.navigation.goBack()}>
            <Icon
              type="Ionicons"
              name="chevron-back"
              size={30}
              color={'white'}
            />
          </TouchableOpacity>
        ) : (
          <View
            style={{
              padding: 10,
              width: 35,
              height: 35,
            }}
          />
        )}
        <Controller
          control={control}
          name="keyword"
          render={({field: {value, onChange}}) => (
            <View
              style={{
                width: '70%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
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
                placeholder={placeholder ?? language.t(languageKeys.search)}
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
        {role?.type !== ERole.ADMINISTRATOR ? (
          <TouchableOpacity
            style={{
              padding: 5,
            }}>
            <Icon
              type="Ionicons"
              name="settings"
              size={30}
              color={'white'}
              onPress={() => {
                props.navigation.navigate('SETTING_SCREEN');
              }}
            />
          </TouchableOpacity>
        ) : (
          <View
            style={{
              padding: 10,
              width: 35,
              height: 35,
            }}
          />
        )}
      </View>
    </LinearGradientHeader>
  );
};

export default WorkHeader;
