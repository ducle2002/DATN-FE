import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {ListScreen} from './meter-index.screen';
import {StackScreenProps} from '@react-navigation/stack';
import {MeterStackParamsList} from '@/routes/operating/meter.stack';
import {useQuery} from 'react-query';
import MeterService from './services/meter.service';
import globalStyles from '@/config/globalStyles';
type Props = StackScreenProps<MeterStackParamsList, 'METER_DETAIL'>;

const Tab = createMaterialTopTabNavigator();

const MeterDetailScreen = ({route}: Props) => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          textTransform: 'none',
        },
      }}>
      <Tab.Screen
        name="LIST_INDEX"
        component={ListScreen}
        initialParams={{meterId: route.params.id}}
        options={{
          title: 'Chỉ số đã ghi',
        }}
      />
      <Tab.Screen
        name="DETAIL"
        component={DetailScreen}
        initialParams={{meterId: route.params.id}}
        options={{
          title: 'Thông tin đồng hồ',
        }}
      />
    </Tab.Navigator>
  );
};

const DetailScreen = ({route}: any) => {
  const {data} = useQuery({
    queryKey: ['meter', route.params.meterId],
    queryFn: () => MeterService.getById({id: route.params.meterId}),
  });
  return (
    <View style={{flex: 1}}>
      {data ? (
        <ScrollView
          style={styles.container}
          contentContainerStyle={{paddingHorizontal: 10, paddingVertical: 10}}>
          <View style={styles.row}>
            <View style={styles.labelContainer}>
              <Text style={styles.textLabel}>Tên</Text>
            </View>
            <View style={styles.valueContainer}>
              <Text style={styles.textValue}>{data.name}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.labelContainer}>
              <Text style={styles.textLabel}>Căn hộ</Text>
            </View>
            <View style={styles.valueContainer}>
              <Text style={styles.textValue}>{data.apartmentCode}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.labelContainer}>
              <Text style={styles.textLabel}>Khu đô thị</Text>
            </View>
            <View style={styles.valueContainer}>
              <Text style={styles.textValue}>{data.urbanName}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.labelContainer}>
              <Text style={styles.textLabel}>Tòa nhà</Text>
            </View>
            <View style={styles.valueContainer}>
              <Text style={styles.textValue}>{data.buildingName}</Text>
            </View>
          </View>
        </ScrollView>
      ) : undefined}
    </View>
  );
};

export default MeterDetailScreen;
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  labelContainer: {
    flex: 0.5,
    paddingVertical: 5,
  },
  valueContainer: {
    flex: 1,
    backgroundColor: '#f1f2f8',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  textValue: {
    ...globalStyles.text15Medium,
  },
  textLabel: {
    ...globalStyles.text15Medium,
  },
});
