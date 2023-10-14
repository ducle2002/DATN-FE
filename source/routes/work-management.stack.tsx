import LogTimeWorkScreen from '@/screens/work-management/log-time-work.screen';
import ManagementScreen from '@/screens/work-management/management.screen';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import DetailWorkScreen from '@/screens/work-management/detail-work.screen';
import {useAppSelector} from '@/hooks/redux.hook';
import {checkPermission} from '@/utils/utils';
import CreateWorkScreen from '@/screens/work-management/create-work.screen';
import language, {languageKeys} from '@/config/language/language';
import {
  EWorkFormID,
  EWorkStatus,
  TWorkDetail,
} from '@/screens/work-management/services/work.model';
import CreateLogTimeScreen from '@/screens/work-management/create-log-time.screen';
import {StatusBar} from 'react-native';

export type WorkManagementDrawerParamsList = {
  MANAGEMENT: undefined;
  ASSIGNMENT: undefined;
};

export type WorkStackParamsList = {
  MAIN_DRAWER: undefined;
  DETAIL_WORK: {id?: number};
  CREATE_WORK:
    | {
        status?: EWorkStatus;
        formId?: EWorkFormID;
      }
    | undefined;
  // MY_WORK: undefined;
  LOGTIME: {
    detailWork: TWorkDetail;
    workId: number;
  };
  CREATE_LOG_TIME: {
    detailWork: TWorkDetail;
    workId: number;
  };
};
const Stack = createStackNavigator<WorkStackParamsList>();

const WorkStack = () => {
  const {grantedPermissions} = useAppSelector(state => state.config);

  return (
    <>
      <StatusBar barStyle={'dark-content'} />
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
        <Stack.Screen
          name="CREATE_LOG_TIME"
          component={CreateLogTimeScreen}
          options={{
            title: language.t(
              languageKeys.workManagement.header.create_log_time,
            ),
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
    </>
  );
};

export default WorkStack;
