import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {NotificationStackParamsList} from '@/routes/notification.stack';
import RenderHTML from 'react-native-render-html';
import globalStyles from '@/config/globalStyles';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import {useAppSelector} from '@/hooks/redux.hook';
import BottomContainer from '@/components/bottom-container.component';
import Button from '@/components/button.component';
import language, {languageKeys} from '@/config/language/language';
import {useMutation, useQueryClient} from 'react-query';
import DigitalNotiApi from '@/modules/digital-notification/digital-noti.service';
import {useToast} from 'react-native-toast-notifications';

const {width} = Dimensions.get('screen');

type Props = StackScreenProps<NotificationStackParamsList, 'DETAIL_SCREEN'>;

const DetailScreen = ({route, navigation}: Props) => {
  const noti = route.params.noti;
  const {listOrganizations} = useAppSelector(state => state.organizationUnit);

  const queryClient = useQueryClient();
  const toast = useToast();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: noti.name,
      headerTitleContainerStyle: {maxWidth: '80%'},
    });
  }, [navigation, noti.name]);

  const {mutate: deleteRequest} = useMutation({
    mutationFn: () => DigitalNotiApi.deleteRequest({id: noti.id}),
    onSuccess: () => {
      toast.show(language.t(languageKeys.digitalNoti.toastNoti.deleteSuccess));
      queryClient.refetchQueries(['list-noti']);
      navigation.goBack();
    },
  });

  return (
    <View style={{flex: 1, backgroundColor: 'white', paddingHorizontal: 10}}>
      <ScrollView contentContainerStyle={{minHeight: '100%'}}>
        <View>
          <Text style={styles.textTime}>
            {moment(noti.creationTime).format('HH:mm DD/MM/YYYY')}
          </Text>
          <FastImage
            source={{uri: noti.fileUrl}}
            style={{width: '100%', aspectRatio: 1}}
          />
          <Text style={styles.textDepartment}>
            {
              listOrganizations.find(
                o => o.organizationUnitId === noti.organizationUnitId,
              )?.displayName
            }
          </Text>
          <Text style={styles.textName}>{noti.name}</Text>
        </View>
        <View style={styles.dataContainer}>
          <RenderHTML
            source={{html: noti.data}}
            contentWidth={width}
            defaultTextProps={{
              style: {
                color: 'black',
              },
            }}
          />
        </View>
      </ScrollView>
      <BottomContainer
        style={{
          flexDirection: 'row',
          marginHorizontal: -10,
          justifyContent: 'space-between',
        }}>
        <Button
          mode="outlined"
          style={{width: '45%'}}
          onPress={() => deleteRequest()}>
          {language.t(languageKeys.digitalNoti.detail.delete)}
        </Button>
        <Button
          mode="contained"
          style={{width: '45%'}}
          onPress={() => {
            navigation.navigate('CREATE_SCREEN', {noti: noti});
          }}>
          {language.t(languageKeys.digitalNoti.detail.edit)}
        </Button>
      </BottomContainer>
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  textName: {
    ...globalStyles.text16Medium,
    marginTop: 10,
  },
  textTime: {
    ...globalStyles.text12Regular,
    color: '#4f4f4f',
    textAlign: 'right',
    marginBottom: 10,
  },
  textDepartment: {
    ...globalStyles.text16Medium,
    color: '#47a5ff',
  },
  dataContainer: {
    marginTop: 10,
  },
});
