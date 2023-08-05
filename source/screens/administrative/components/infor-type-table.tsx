import {
  Dimensions,
  LayoutChangeEvent,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
const {width} = Dimensions.get('screen');
type Props = {
  label: string;
  tableValue: any;
};
const InforTypeTable = ({label, tableValue}: Props) => {
  const numCol = tableValue ? Object.keys(tableValue[0]).length : 0;
  const [widthCells, setWidthCells] = useState(
    Array.from(Array(5), (x, index) => width / numCol),
  );
  return (
    <View>
      <Text>{label}</Text>
      {tableValue && numCol && (
        <ScrollView horizontal>
          <View>
            <View
              style={{
                flexDirection: 'row',
              }}>
              {Object.keys(tableValue[0]).map((item, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      borderWidth: 1,
                      alignItems: 'center',
                      minWidth: widthCells[index],
                      paddingHorizontal: 5,
                      paddingVertical: 5,
                    }}
                    onLayout={({nativeEvent}) => {
                      if (widthCells[index] < nativeEvent.layout.width) {
                        let newCells = widthCells;
                        newCells[index] = nativeEvent.layout.width;
                        setWidthCells(newCells);
                      }
                    }}>
                    <Text>{item}</Text>
                  </View>
                );
              })}
            </View>
            {tableValue.map((item, index) => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                  }}
                  key={index}>
                  {Object.keys(tableValue[0]).map((el, i) => {
                    return (
                      <View
                        key={i}
                        style={{
                          borderWidth: 1,
                          alignItems: 'center',
                          minWidth: widthCells[i],
                          paddingHorizontal: 5,
                          paddingVertical: 5,
                        }}
                        onLayout={({nativeEvent}) => {
                          if (widthCells[index] < nativeEvent.layout.width) {
                            let newCells = widthCells;
                            newCells[index] = nativeEvent.layout.width;
                            setWidthCells(newCells);
                          }
                        }}>
                        <Text>{item[el]}</Text>
                      </View>
                    );
                  })}
                </View>
              );
            })}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default InforTypeTable;

const styles = StyleSheet.create({});
