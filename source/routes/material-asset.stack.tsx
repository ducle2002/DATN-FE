import React from 'react';
import {TPermission} from 'types/type';
import {createStackNavigator} from '@react-navigation/stack';
import ImportExportScreen from '@/screens/material-asset/import-export.screen';
import language, {languageKeys} from '@/config/language/language';
import CategoryManagementScreen from '@/screens/material-asset/category-management.screen';
import ListTab from '@/screens/material-asset/list-assets.tab';

export type MaterialAssetStackParamsList = {
  MAIN_SCREEN:
    | {
        type: TPermission;
      }
    | undefined;
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
        component={ListTab}
        options={{
          title: language.t(
            languageKeys['Pages.Assets.AssetCatalog.GetAll'] ?? '',
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
            languageKeys['Pages.Assets.AssetParameters.GetAll'] ?? '',
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default MaterialAssetStack;
