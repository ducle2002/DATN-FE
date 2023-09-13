import React from 'react';
import {TPermission} from 'types/type';
import {createStackNavigator} from '@react-navigation/stack';
import MainScreen from '@/screens/material-asset/main.screen';
import ImportExportScreen from '@/screens/material-asset/import-export.screen';
import language, {languageKeys} from '@/config/language/language';
import CategoryManagementScreen from '@/screens/material-asset/category-management.screen';

export type MaterialAssetStackParamsList = {
  MAIN_SCREEN: {
    type: TPermission;
  };
  IMPORT_EXPORT: {
    type: 'IMPORT' | 'EXPORT';
  };
  CATEGORY_MANAGEMENT: undefined;
};

const Stack = createStackNavigator<MaterialAssetStackParamsList>();

const MaterialAssetStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name="MAIN_SCREEN"
        component={MainScreen}
        options={{
          title: language.t(
            languageKeys['Pages.SmartCommunity.OperationManagement.Material'],
          ),
        }}
      />
      <Stack.Screen
        name="IMPORT_EXPORT"
        component={ImportExportScreen}
        options={({route}) => ({
          title: language.t(
            languageKeys.materialAsset.docs[
              route.params.type === 'IMPORT'
                ? 'importInventory'
                : 'exportInventory'
            ],
          ),
        })}
      />
      <Stack.Screen
        name="CATEGORY_MANAGEMENT"
        component={CategoryManagementScreen}
        options={{
          title: language.t(
            languageKeys[
              'Pages.SmartCommunity.OperationManagement.MaterialCategory'
            ],
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default MaterialAssetStack;
