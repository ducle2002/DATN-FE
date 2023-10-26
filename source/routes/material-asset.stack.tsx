import React from 'react';
import {TPermission} from 'types/type';
import {StackScreenProps, createStackNavigator} from '@react-navigation/stack';
import ImportExportScreen from '@/screens/material-asset/import-export.screen';
import language, {languageKeys} from '@/config/language/language';
import CategoryManagementScreen from '@/screens/material-asset/category-management.screen';
import ListTab from '@/screens/material-asset/list-assets.tab';
import DetailAssetScreen from '@/screens/material-asset/detail-asset.screen';
import {NavigatorScreenParams} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import MaintenanceHistoryScreen from '@/screens/material-asset/maintenance-history.screen';
import AssetQRScreen from '@/screens/material-asset/asset-qr-sceen';

export type AssetDetailTabParamsList = {
  DETAIL_SCREEN: {id: number};
  MAINTENANCE_HISTORY: {id: number};
};

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
  DETAIL_TAB: {id: number} & NavigatorScreenParams<AssetDetailTabParamsList>;
  ENTITY_DETAIL: {id: number};
  QR_SCANNER: undefined;
};

const Tab = createMaterialTopTabNavigator<AssetDetailTabParamsList>();
export const AssetDetailTab = ({
  route,
}: StackScreenProps<MaterialAssetStackParamsList, 'DETAIL_TAB'>) => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          textTransform: 'none',
        },
      }}>
      <Tab.Screen
        name="DETAIL_SCREEN"
        component={DetailAssetScreen}
        options={{
          tabBarLabel: language.t(languageKeys.materialAsset.header.detail),
        }}
        initialParams={{id: route.params.id}}
      />
      <Tab.Screen
        name="MAINTENANCE_HISTORY"
        component={MaintenanceHistoryScreen}
        options={{
          tabBarLabel: language.t(
            languageKeys.materialAsset.header.maintenanceHistory,
          ),
        }}
        initialParams={{id: route.params.id}}
      />
    </Tab.Navigator>
  );
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
      <Stack.Screen name="DETAIL_TAB" component={AssetDetailTab} />
      <Stack.Screen name="QR_SCANNER" component={AssetQRScreen} />
    </Stack.Navigator>
  );
};

export default MaterialAssetStack;
