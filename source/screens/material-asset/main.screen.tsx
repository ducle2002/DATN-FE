import React, {useMemo} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {MaterialAssetStackParamsList} from '@/routes/material-asset.stack';
import {useAppSelector} from '@/hooks/redux.hook';
import ListTab from './list-assets.tab';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import InventoryTab from './inventory.tab';

type Props = StackScreenProps<MaterialAssetStackParamsList, 'MAIN_SCREEN'>;

export type MaterialTabParamsList = {
  LIST: undefined;
  INVENTORY: undefined;
};

const MaterialTab = createMaterialTopTabNavigator<MaterialTabParamsList>();

const MainScreen = ({route}: Props) => {
  const {type} = route.params;

  const {grantedPermissions} = useAppSelector(state => state.config);

  const permissions = useMemo(
    () =>
      grantedPermissions.filter(
        p => p !== type && p.split('.').slice(0, 4).join('.') === type,
      ),
    [grantedPermissions, type],
  );

  return (
    <MaterialTab.Navigator
      screenOptions={{
        tabBarScrollEnabled: true,
        lazy: true,
      }}>
      {/* {permissions.map(p => (
        <MaterialTab.Screen
          name={p.split('.')[4] as any}
          component={
            p === 'Pages.SmartCommunity.OperationManagement.Material.List'
              ? ListTab
              : p ===
                'Pages.SmartCommunity.OperationManagement.Material.Delivery'
              ? DeliveryTab
              : p ===
                'Pages.SmartCommunity.OperationManagement.Material.Inventory'
              ? InventoryTab
              : ListTab
          }
          key={p}
        />
      ))} */}
      {permissions.includes(
        'Pages.SmartCommunity.OperationManagement.Material.List',
      ) && <MaterialTab.Screen component={ListTab} name="LIST" />}
      {permissions.includes(
        'Pages.SmartCommunity.OperationManagement.Material.Inventory',
      ) && <MaterialTab.Screen component={InventoryTab} name="INVENTORY" />}
    </MaterialTab.Navigator>
  );
};

export default MainScreen;
