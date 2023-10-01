import AssignmentScreen from '@/screens/work-management/assignment.screen';
import ManagementScreen from '@/screens/work-management/management.screen';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {StackScreenProps} from '@react-navigation/stack';
import React, {useCallback, useLayoutEffect} from 'react';
import {AppStackParamsList} from './app.stack';
import Icon from '@/components/icon.component';
import {DrawerActions} from '@react-navigation/native';

export type WorkManagementDrawerParamsList = {
  MANAGEMENT: undefined;
  ASSIGNMENT: undefined;
};

const Drawer = createDrawerNavigator<WorkManagementDrawerParamsList>();

type Props = StackScreenProps<AppStackParamsList, 'WORK_MANAGEMENT'>;
const WorkManagementDrawer = ({navigation}: Props) => {
  const renderDrawerButton = useCallback(
    () => (
      <Icon
        type="Ionicons"
        name="menu"
        size={30}
        onPress={() => {
          navigation.dispatch(DrawerActions.openDrawer());
        }}
      />
    ),
    [navigation],
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: renderDrawerButton,
    });
  }, [navigation, renderDrawerButton]);
  return (
    <Drawer.Navigator
      initialRouteName="MANAGEMENT"
      screenOptions={{
        headerShown: false,
        drawerPosition: 'right',
      }}>
      <Drawer.Screen name="MANAGEMENT" component={ManagementScreen} />
      <Drawer.Screen name="ASSIGNMENT" component={AssignmentScreen} />
    </Drawer.Navigator>
  );
};

export default WorkManagementDrawer;
