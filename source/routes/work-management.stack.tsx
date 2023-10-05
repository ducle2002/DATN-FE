import AssignmentScreen from '@/screens/work-management/assignment.screen';
import ManagementScreen from '@/screens/work-management/management.screen';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {StackScreenProps, createStackNavigator} from '@react-navigation/stack';
import React, {useCallback, useLayoutEffect} from 'react';
import Icon from '@/components/icon.component';
import {DrawerActions, NavigatorScreenParams} from '@react-navigation/native';
import DetailWorkScreen from '@/screens/work-management/detail-work.screen';
import {useAppSelector} from '@/hooks/redux.hook';
import {checkPermission} from '@/utils/utils';
import CreateWorkScreen from '@/screens/work-management/create-work.screen';
import language, {languageKeys} from '@/config/language/language';

export type WorkManagementDrawerParamsList = {
  MANAGEMENT: undefined;
  ASSIGNMENT: undefined;
};
const Drawer = createDrawerNavigator<WorkManagementDrawerParamsList>();

type Props = StackScreenProps<WorkStackParamsList, 'MAIN_DRAWER'>;

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

export type WorkStackParamsList = {
  MAIN_DRAWER: NavigatorScreenParams<WorkManagementDrawerParamsList>;
  DETAIL_WORK: {id: number};
  CREATE_WORK: undefined;
};
const Stack = createStackNavigator<WorkStackParamsList>();

const WorkStack = () => {
  const {grantedPermissions} = useAppSelector(state => state.config);
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
      }}>
      <Stack.Screen name="MAIN_DRAWER" component={WorkManagementDrawer} />
      <Stack.Screen name="DETAIL_WORK" component={DetailWorkScreen} />
      {checkPermission(grantedPermissions, [
        'Pages.Management.TaskManagement.Create',
      ]) && (
        <Stack.Screen
          name="CREATE_WORK"
          component={CreateWorkScreen}
          options={{
            title: language.t(languageKeys.workManagement.header.create),
          }}
        />
      )}
    </Stack.Navigator>
  );
};

export default WorkStack;
