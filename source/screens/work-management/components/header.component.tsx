import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import LinearGradientHeader from '@/components/linear-gradient-header.component';
import {StackHeaderProps} from '@react-navigation/stack';
import {HeaderTitle} from '@react-navigation/elements';
import Icon from '@/components/icon.component';
import {EWorkStatus} from '../services/work.model';
import language, {languageKeys} from '@/config/language/language';
import globalStyles from '@/config/globalStyles';
import moment from 'moment';

type Props = StackHeaderProps & {status?: EWorkStatus};
const HeaderWorkDetail = ({status, ...props}: Props) => {
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
        <HeaderTitle
          style={{
            color: 'white',
            textAlign: 'center',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
          {props.options.title}
        </HeaderTitle>
        <View
          style={{
            padding: 5,
            width: 30,
            height: 30,
          }}
        />
      </View>
      {!!status && (
        <View
          style={{
            alignSelf: 'center',
            backgroundColor: '#F7F7F7',
            paddingHorizontal: 30,
            paddingVertical: 10,
            borderRadius: 10,
            alignItems: 'center',
          }}>
          {/* <Text style={styles.textLabel}>
            Trạng thái:{' '}
            <Text style={{color: '#2E9BFF'}}>
              {language.t(languageKeys.workManagement.status[status])}
            </Text>
          </Text> */}
          <Text style={styles.textLabel}>
            Lượt: số <Text style={{color: '#2E9BFF'}}>1</Text>
          </Text>
          <Text
            style={{
              fontSize: 12,
              paddingTop: 4,
              color: 'gray',
            }}>
            Ngày {moment().format('DD/MM/YYYY HH:mm')}
          </Text>
        </View>
      )}
    </LinearGradientHeader>
  );
};

export default HeaderWorkDetail;

const styles = StyleSheet.create({
  textLabel: globalStyles.text16Bold,
});
