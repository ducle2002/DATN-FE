import React from 'react';
import {TPermission} from 'types/type';
import {createStackNavigator} from '@react-navigation/stack';
import MainScreen from '@/screens/material-asset/main.screen';
import ImportExportScreen from '@/screens/material-asset/import-export.screen';

export type MaterialAssetStackParamsList = {
  MAIN_SCREEN: {
    type: TPermission;
  };
  IMPORT_EXPORT: {
    type: 'IMPORT' | 'EXPORT';
  };
};

const Stack = createStackNavigator<MaterialAssetStackParamsList>();

const MaterialAssetStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
      }}>
      <Stack.Screen name="MAIN_SCREEN" component={MainScreen} />
      <Stack.Screen name="IMPORT_EXPORT" component={ImportExportScreen} />
    </Stack.Navigator>
  );
};

export default MaterialAssetStack;
