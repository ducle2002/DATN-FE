import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
const {width} = Dimensions.get('screen');
type Props = {
  label: string;
  tableValue: any[];
};
const InforTypeTable = ({label, tableValue}: Props) => {
  const numCol = tableValue ? Object.keys(tableValue[0]).length : 0;
  const getDataTable = () => {
    const dataCols: string[][] = [];
    if (tableValue && numCol) {
      Object.keys(tableValue[0]).forEach(item => {
        let element = [item];
        tableValue.forEach(val => {
          element.push(val[item]);
        });
        dataCols.push(element);
      });
    }
    return dataCols;
  };
  return (
    <View
      style={{
        paddingHorizontal: '2%',
      }}>
      <Text
        style={{
          fontSize: 14,
          color: '#333',
          fontWeight: '700',
          paddingBottom: 4,
          paddingTop: '2%',
        }}>
        {label}
      </Text>
      {tableValue && numCol && (
        <ScrollView horizontal>
          <View>
            <View
              style={{
                flexDirection: 'row',
              }}>
              {getDataTable().map((item, index) => {
                return (
                  <View style={{}} key={index}>
                    {item.map((el, i) => {
                      return (
                        <View
                          key={i}
                          style={{
                            borderWidth: 1,
                            alignItems: 'center',
                            minWidth: width / numCol,
                            paddingHorizontal: 5,
                            paddingVertical: 5,
                          }}>
                          <Text>{el}</Text>
                        </View>
                      );
                    })}
                  </View>
                );
              })}
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default InforTypeTable;

const styles = StyleSheet.create({});
