import language, {languageKeys} from '@/config/language/language';
import AddWaterBillScreen from '@/screens/operating/water-bill/add-water-bill.screen';
import WaterBill from '@/screens/operating/water-bill/water-bill.screen';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {PhotoFile} from 'react-native-vision-camera';
export type WaterStackParamsList = {
  ADD_WATER_BILL:
    | {
        id?: number;
        apartmentCode?: number;
        image?: PhotoFile;
      }
    | undefined;
  MAIN_WATER: undefined;
};
const Stack = createStackNavigator<WaterStackParamsList>();

const WaterStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        options={{headerShown: false}}
        name="MAIN_WATER"
        component={WaterBill}
      />
      <Stack.Screen
        name="ADD_WATER_BILL"
        component={AddWaterBillScreen}
        options={{
          title: language.t(languageKeys.water.header.readTheMeter),
        }}
      />
    </Stack.Navigator>
  );
};

export default WaterStack;
