import React, {useMemo} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {MaterialAssetStackParamsList} from '@/routes/material-asset.stack';
import {useAppSelector} from '@/hooks/redux.hook';
import ListTab from './list-assets.tab';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import InventoryTab from './inventory.tab';
import language, {languageKeys} from '@/config/language/language';

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
        lazy: true,
      }}>
      <MaterialTab.Screen
        component={ListTab}
        name="LIST"
        options={{
          title: language.t(
            languageKeys[
              'Pages.SmartCommunity.OperationManagement.Material.List'
            ],
          ),
        }}
      />

      <MaterialTab.Screen
        component={InventoryTab}
        name="INVENTORY"
        options={{
          title: language.t(
            languageKeys[
              'Pages.SmartCommunity.OperationManagement.Material.Inventory'
            ],
          ),
        }}
      />
    </MaterialTab.Navigator>
  );
};

export default MainScreen;
