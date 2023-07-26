import {StyleSheet, Text} from 'react-native';
import React, {useContext} from 'react';
import BottomContainer from '@/components/bottom-container.component';
import Button from '@/components/button.component';
import language, {languageKeys} from '@/config/language/language';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {NotificationStackParamsList} from '@/routes/notification.stack';
import {SelectNotiContext} from '../context/digital-noti.context';
import {useMutation, useQueryClient} from 'react-query';
import DigitalNotiApi from '@/modules/digital-notification/digital-noti.service';
import {useToast} from 'react-native-toast-notifications';
import globalStyles from '@/config/globalStyles';

const MainBottom = () => {
  const navigation =
    useNavigation<NavigationProp<NotificationStackParamsList>>();
  const {reset, selected} = useContext(SelectNotiContext);

  const toast = useToast();
  const queryClient = useQueryClient();

  const {mutate: deleteAll} = useMutation({
    mutationFn: () => DigitalNotiApi.deleteMultipleRequest(selected),
    onSuccess: () => {
      toast.show(language.t(languageKeys.digitalNoti.toastNoti.createSuccess));
      queryClient.refetchQueries(['list-noti']);
      reset();
    },
  });

  return (
    <BottomContainer style={styles.container}>
      {selected.length === 0 ? (
        <Button
          mode="contained"
          onPress={() => navigation.navigate('CREATE_SCREEN', {})}
          style={{flex: 1}}>
          {language.t(languageKeys.digitalNoti.create.create)}
        </Button>
      ) : (
        <>
          <Text style={styles.text}>
            {language.t(languageKeys.digitalNoti.main.selected)}:{' '}
            <Text style={{color: '#47A5FF'}}>{selected.length}</Text>
          </Text>
          <Button
            onPress={() => {
              reset();
            }}
            mode="contained-tonal">
            {language.t(languageKeys.digitalNoti.main.reset)}
          </Button>
          <Button
            onPress={() => {
              deleteAll();
            }}
            mode="contained">
            {language.t(languageKeys.digitalNoti.main.deleteAll)}
          </Button>
        </>
      )}
    </BottomContainer>
  );
};

export default MainBottom;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  text: {
    ...globalStyles.text15Bold,
  },
});
