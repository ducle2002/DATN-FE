import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StackScreenProps} from '@react-navigation/stack';
import {AdministrativeStackParamsList} from '@/routes/administrative.stack';
import Icon from '@/components/icon.component';
import moment from 'moment';
import InforTypeHtml from './components/infor-type-html';
import InforTypeOptions from './components/infor-type-options';
import InforTypeTable from './components/infor-type-table';
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
            switch (item.type) {
              case 13:
                return (
                  <InforTypeHtml
                    key={index}
                    label={item.displayName}
                    value={properties[item.key]}
                  />
                );
              case 11:
                return (
                  <InforTypeOptions
                    key={index}
                    label={item.displayName}
                    optionValue={properties[item.key]}
                  />
                );
              case 9:
                return (
                  <InforTypeTable
                    key={index}
                    label={item.displayName}
                    tableValue={properties[item.key]}
                  />
                );
              default:
                return (
                  <View key={index} style={{flexDirection: 'row'}}>
                    <Text>{item.displayName}: </Text>
                    {item.type !== 9 && item.type !== 11 && (
                      <Text>{properties[item.key]}</Text>
                    )}
                  </View>
                );
            }
          })}
        </View>
      )}
    </SafeAreaView>
  );
};

export default AdministrativeDetailScreen;

const styles = StyleSheet.create({});
