import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StackScreenProps} from '@react-navigation/stack';
import {AdministrativeStackParamsList} from '@/routes/administrative.stack';
import Icon from '@/components/icon.component';
import moment from 'moment';
import InforTypeHtml from './components/infor-type-html';
type Props = StackScreenProps<
  AdministrativeStackParamsList,
  'AdministrativeDetailScreen'
>;
const AdministrativeDetailScreen = ({route}: Props) => {
  const data = route.params.data;
  const config = route.params.config;
  const properties = JSON.parse(data.properties);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          alignItems: 'center',
        }}>
        <Icon
          type="Ionicons"
          name="information-circle"
          color={'#fca311'}
          size={60}
        />
        <Text
          style={{
            fontSize: 16,
            fontWeight: '600',
            color: '#333',
          }}>
          {data.name}
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontWeight: '400',
            color: '#333',
          }}>
          Thời gian tạo: {moment(data.creationTime).format('HH:mm DD/MM/YYYY')}
        </Text>
      </View>
      {properties && config && (
        <View>
          {config.properties?.map((item, index) => {
            return item.type === 13 ? (
              <InforTypeHtml
                label={item.displayName}
                value={properties[item.key]}
              />
            ) : (
              <View key={index} style={{flexDirection: 'row'}}>
                <Text>{item.displayName}: </Text>
                {item.type !== 9 && item.type !== 11 && (
                  <Text>{properties[item.key]}</Text>
                )}
              </View>
            );
          })}
        </View>
      )}
    </SafeAreaView>
  );
};

export default AdministrativeDetailScreen;

const styles = StyleSheet.create({});
