import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {ECategoryType} from '@/screens/material-asset/services/material-asset.model';
import ListCategory from './components/list-category';
import language, {languageKeys} from '@/config/language/language';
import {Text} from 'react-native';

export type CategoryTabParamsList = {
  GROUP: {type: ECategoryType};
  PRODUCER: {type: ECategoryType};
  TYPE: {type: ECategoryType};
  UNIT: {type: ECategoryType};
  INVENTORY: {type: ECategoryType};
};
const CategoryTab = createMaterialTopTabNavigator<CategoryTabParamsList>();

const CategoryManagementScreen = () => {
  const renderTitle = (
    props: {
      focused: boolean;
      color: string;
      children: string;
    },
    name: string,
  ) => <Text style={{color: props.color}}>{name}</Text>;
  return (
    <CategoryTab.Navigator
      screenOptions={{
        lazy: true,
        tabBarScrollEnabled: true,
      }}>
      <CategoryTab.Screen
        initialParams={{type: ECategoryType.GROUP}}
        name="GROUP"
        component={ListCategory}
        options={{
          tabBarLabel: props =>
            renderTitle(
              props,
              language.t(languageKeys.materialAsset.materialDetail.assetGroup),
            ),
        }}
      />
      <CategoryTab.Screen
        initialParams={{type: ECategoryType.PRODUCER}}
        name="PRODUCER"
        component={ListCategory}
        options={{
          tabBarLabel: props =>
            renderTitle(
              props,
              language.t(languageKeys.materialAsset.materialDetail.producer),
            ),
        }}
      />
      <CategoryTab.Screen
        initialParams={{type: ECategoryType.TYPE}}
        name="TYPE"
        component={ListCategory}
        options={{
          tabBarLabel: props =>
            renderTitle(
              props,
              language.t(languageKeys.materialAsset.materialDetail.assetType),
            ),
        }}
      />
      <CategoryTab.Screen
        initialParams={{type: ECategoryType.UNIT}}
        name="UNIT"
        component={ListCategory}
        options={{
          tabBarLabel: props =>
            renderTitle(
              props,
              language.t(languageKeys.materialAsset.materialDetail.unit),
            ),
        }}
      />
    </CategoryTab.Navigator>
  );
};

export default CategoryManagementScreen;
