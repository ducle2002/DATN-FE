import {useToast} from 'react-native-toast-notifications';
import {useMutation, useQueryClient} from 'react-query';
import DigitalNotiApi from './digital-noti.service';
import language, {languageKeys} from '@/config/language/language';
import {useAppSelector} from '@/hooks/redux.hook';
import {StackNavigationProp} from '@react-navigation/stack';
import {NotificationStackParamsList} from '@/routes/notification.stack';
import {TDestination, TDigitalNoti} from './digital-noti.model';
import {createContext} from 'react';

export const DestinationNoticeContext = createContext<{
  destination?: TDestination;
  setDestination: (des: TDestination) => void;
}>({
  destination: undefined,
  setDestination: () => {},
});

export const useCreateOrUpdateNotification = ({
  navigation,
  noti,
}: {
  navigation: StackNavigationProp<NotificationStackParamsList, 'CREATE_SCREEN'>;
  noti?: TDigitalNoti;
}) => {
  const {tenantId} = useAppSelector(state => state.auth);
  const QueryClient = useQueryClient();

  const toast = useToast();
  const query = useMutation({
    mutationFn: (params: any) =>
      DigitalNotiApi.createOrUpdateRequest(params, {
        'Abp.Tenantid': tenantId,
      }),
    onSuccess: () => {
      QueryClient.refetchQueries(['list-noti']);
      toast.show(
        language.t(
          languageKeys.digitalNoti.toastNoti[
            noti ? 'updateSuccess' : 'createSuccess'
          ],
        ),
      );
      navigation.navigate('MAIN_SCREEN');
    },
    onError: () => {
      toast.show(
        language.t(
          languageKeys.digitalNoti.toastNoti[
            noti ? 'updateFail' : 'createFail'
          ],
        ),
      );
    },
  });
  return {...query, createOrUpdateNotification: query.mutate};
};
