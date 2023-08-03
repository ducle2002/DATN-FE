import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {NotificationStackParamsList} from '@/routes/notification.stack';
import {Controller, useForm} from 'react-hook-form';
import {useAppSelector} from '@/hooks/redux.hook';
import DropdownMenu from '@/components/dropdown-menu.component';
import {TOrganizationUnit} from '@/modules/organization/organization.model';
import CTextInput from '@/components/text-input.component';
import RadioButtonGroup, {
  TRadioItem,
} from '@/components/radio-button-group.component';
import globalStyles from '@/config/globalStyles';
import TextEditor from '@/components/text-editor.component';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import language, {languageKeys} from '@/config/language/language';
import {TImagePicker} from '@/utils/image-picker-handle';
import AddImageButton from './components/add-image-button.component';
import {useMutation} from 'react-query';
import UtilsApi from '@/utils/utils.service';
import NotificationApi from '@/modules/digital-notification/digital-noti.service';
import {useToast} from 'react-native-toast-notifications';
import BottomButton from '../../components/bottom-button.component';

type Props = StackScreenProps<NotificationStackParamsList, 'CREATE_SCREEN'>;

const notificationSchema = yup.object({
  data: yup.string().required(languageKeys.shared.form.requiredMessage),
  name: yup.string().required(languageKeys.shared.form.requiredMessage),
});

const CreateNotificationScreen = ({navigation, route}: Props) => {
  const noti = route.params?.noti;

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      data: noti?.data ?? '',
      name: noti?.name ?? '',
    },
    resolver: yupResolver(notificationSchema),
  });

  const toast = useToast();

  const {listOrganizations} = useAppSelector(state => state.organizationUnit);
  const {tenantId} = useAppSelector(state => state.auth);

  const listOption: Array<TRadioItem> = [
    {value: true, label: language.t(languageKeys.digitalNoti.create.yes)},
    {value: false, label: language.t(languageKeys.digitalNoti.create.no)},
  ];

  const [seletedOrganization, setSeletedOrganization] = useState<
    TOrganizationUnit | undefined
  >(
    !noti
      ? listOrganizations[0]
      : listOrganizations.find(
          o => o.organizationUnitId === noti.organizationUnitId,
        ),
  );

  const [isAllowComment, setAllowComment] = useState<boolean>(
    noti?.isAllowComment ?? false,
  );
  const [file, setFile] = useState<TImagePicker | undefined | string>(
    noti?.fileUrl,
  );

  const onSelected = (id: number) => {
    setSeletedOrganization(
      listOrganizations[
        listOrganizations.findIndex(o => o.organizationUnitId === id)
      ],
    );
  };

  const {mutate: createOrUpdateNotification} = useMutation({
    mutationFn: (params: any) =>
      NotificationApi.createOrUpdateRequest(params, {
        'Abp.Tenantid': tenantId,
      }),
    onSuccess: () => {
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

  const onSubmit = (data: {data: string}) => {
    if (file) {
      if (typeof file !== 'string') {
        UtilsApi.uploadImagesRequest([file]).then(result => {
          createOrUpdateNotification({
            ...noti,
            ...data,
            fileUrl: result[0],
            isAllowComment,
            type: 2,
            organizationUnitId: seletedOrganization?.organizationUnitId,
            state: 1,
            receiveAll: 0,
            receiverGroupCode: null,
          });
        });
      } else {
        createOrUpdateNotification({
          ...noti,
          ...data,
          isAllowComment,
          type: 2,
          organizationUnitId: seletedOrganization?.organizationUnitId,
          state: 1,
          receiveAll: 0,
          receiverGroupCode: null,
        });
      }
    } else {
      toast.show(language.t(languageKeys.digitalNoti.toastNoti.imageRequire));
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{height: '100%'}}>
      <ScrollView
        removeClippedSubviews={false}
        contentContainerStyle={styles.container}>
        <DropdownMenu
          onSelected={onSelected}
          options={[
            ...listOrganizations.map(o => ({
              label: o.displayName,
              id: o.organizationUnitId,
            })),
          ]}
          label={language.t(languageKeys.digitalNoti.create.department)}
          placeholder={language.t(
            languageKeys.digitalNoti.create.selectDeparment,
          )}
          selectedLabel={seletedOrganization?.displayName}
          labelStyle={styles.textLabel}
          itemLabelStyle={styles.textValue}
          inputContainer={styles.dataInput}
        />

        <RadioButtonGroup
          onSelection={(value: boolean) => {
            setAllowComment(value);
          }}
          listOptions={listOption}
          seletedOption={listOption[isAllowComment ? 0 : 1]}
          label={language.t(languageKeys.digitalNoti.create.allComment)}
          labelStyle={styles.textLabel}
          style={[styles.sectionContainer]}
          contentContainer={{
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}
        />

        <View style={styles.sectionContainer}>
          <Controller
            control={control}
            name="name"
            render={({field: {value, onChange}}) => (
              <CTextInput
                label={language.t(languageKeys.digitalNoti.create.title)}
                value={value}
                onChangeText={onChange}
                containerStyle={styles.dataInput}
                errorMessage={
                  errors.name ? language.t(errors.name.message as string) : ''
                }
              />
            )}
          />
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.textLabel}>
            {language.t(languageKeys.digitalNoti.create.data)}
          </Text>
          <Controller
            control={control}
            name="data"
            render={({field: {value, onChange}}) => (
              <TextEditor
                initialContentHTML={value}
                containerStyle={styles.dataInput}
                onChange={onChange}
                errorMessage={
                  errors.data ? language.t(errors.data.message as string) : ''
                }
                hideKeyboardAccessoryView={false}
              />
            )}
          />
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.textLabel}>
            {language.t(languageKeys.digitalNoti.create.selectThumbnail)}
          </Text>
          <AddImageButton
            source={{uri: typeof file !== 'string' ? file?.uri : file}}
            pickerHandle={(image: TImagePicker) => {
              setFile(image);
            }}
          />
        </View>
      </ScrollView>
      <BottomButton onPress={handleSubmit(onSubmit)}>
        {language.t(
          noti
            ? languageKeys.shared.button.update
            : languageKeys.shared.button.save,
        )}
      </BottomButton>
    </KeyboardAvoidingView>
  );
};

export default CreateNotificationScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  sectionContainer: {
    marginTop: 20,
  },
  dataInput: {
    width: '100%',
    borderRadius: 10,
    backgroundColor: 'white',
  },
  textLabel: {
    ...globalStyles.text15Bold,
    marginBottom: 5,
  },
  textValue: {
    ...globalStyles.text15Medium,
  },
});
