import LogTimeWorkScreen from '@/screens/work-management/log-time-work.screen';
import AssignmentScreen from '@/screens/work-management/assignment.screen';
import ManagementScreen from '@/screens/work-management/management.screen';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {NavigatorScreenParams} from '@react-navigation/native';
import DetailWorkScreen from '@/screens/work-management/detail-work.screen';
import {useAppSelector} from '@/hooks/redux.hook';
import {checkPermission} from '@/utils/utils';
import CreateWorkScreen from '@/screens/work-management/create-work.screen';
import language, {languageKeys} from '@/config/language/language';
import {TWorkDetail} from '@/screens/work-management/services/work.model';

export type WorkManagementDrawerParamsList = {
  MANAGEMENT: undefined;
  ASSIGNMENT: undefined;
};

export type WorkStackParamsList = {
  MAIN_DRAWER: NavigatorScreenParams<WorkManagementDrawerParamsList>;
  DETAIL_WORK: {id?: number};
  CREATE_WORK: undefined;
  LOGTIME: {
    detailWork: TWorkDetail;
    workId: number;
  };
};
const Stack = createStackNavigator<WorkStackParamsList>();

const WorkStack = () => {
  const {grantedPermissions} = useAppSelector(state => state.config);
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
      }}>
      <Stack.Screen
        name="MAIN_DRAWER"
        component={ManagementScreen}
        options={{
          title: language.t(
            languageKeys['Pages.Operations.TaskManagement.GetAll'] ?? '',
          ),
        }}
      />
      <Stack.Screen
        name="LOGTIME"
        component={LogTimeWorkScreen}
        options={{
          title: language.t(languageKeys.workManagement.header.logtime),
        }}
      />
      <Stack.Screen name="DETAIL_WORK" component={DetailWorkScreen} />
      {checkPermission(grantedPermissions, [
        'Pages.Operations.TaskManagement.Create',
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
