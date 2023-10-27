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
import DropdownMenu from '@/components/dropdown-menu.component';
import {
  TOrganizationUnit,
  TOrganizationUnitType,
} from '@/modules/organization/organization.model';
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
import {useToast} from 'react-native-toast-notifications';
import BottomButton from '../../components/bottom-button.component';
import UtilsApi from '@/services/utils.service';
import {useAllOrganizationUnit} from '@/modules/organization/organization.hook';
import {
  DestinationNoticeContext,
  useCreateOrUpdateNotification,
} from './services/hook';
import SelectDestination from './components/select-notification-destination.component';
import {TDestination} from './services/digital-noti.model';

type Props = StackScreenProps<NotificationStackParamsList, 'CREATE_SCREEN'>;

const notificationSchema = yup.object({
  data: yup.string().required(languageKeys.shared.form.requiredMessage),
  name: yup.string().required(languageKeys.shared.form.requiredMessage),
});

const CreateNotificationScreen = ({navigation, route}: Props) => {
  const noti = route.params?.noti;

  const organizationUnits =
    useAllOrganizationUnit().data?.organizationUnits.filter(o =>
      o.types?.includes(TOrganizationUnitType.Notification),
    ) ?? [];

  const [destination, setDestination] = useState<TDestination>();

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

  const listOption: Array<TRadioItem> = [
    {value: true, label: language.t(languageKeys.digitalNoti.create.yes)},
    {value: false, label: language.t(languageKeys.digitalNoti.create.no)},
  ];

  const sendAllOptions = [
    {
      value: true,
      label: language.t(languageKeys.digitalNoti.create.sendAll),
    },
    {
      value: false,
      label: language.t(languageKeys.digitalNoti.create.other),
    },
  ];

  const [selectedOrganization, setSelectedOrganization] = useState<
    TOrganizationUnit | undefined
  >(
    !noti
      ? organizationUnits[0]
      : organizationUnits.find(o => o.id === noti.organizationUnitId),
  );

  const [isAllowComment, setAllowComment] = useState<boolean>(
    noti?.isAllowComment ?? false,
  );
  const [sendAll, setSendAll] = useState(true);

  const [file, setFile] = useState<TImagePicker | undefined | string>(
    noti?.fileUrl,
  );

  const onSelected = (id: number) => {
    setSelectedOrganization(
      organizationUnits[organizationUnits.findIndex(o => o.id === id)],
    );
  };

  const {mutate: createOrUpdateNotification, status} =
    useCreateOrUpdateNotification({
      navigation: navigation,
      noti: noti,
    });

  const {mutate: uploadImage, status: uploadStatus} = useMutation({
    mutationFn: (params: any) => UtilsApi.uploadImagesRequest(params.files),
    onSuccess: (result, params) => {
      let receiveAll = 0;
      if (destination) {
        if (destination.urbanId) {
          receiveAll = 1;
          if (destination.buildingId && destination.receiverGroupCode) {
            receiveAll = 3;
          } else if (!destination.receiverGroupCode) {
            receiveAll = 2;
          }
        }
      }

      createOrUpdateNotification({
        ...params.data,
        fileUrl: result[0],
        receiveAll: receiveAll,
        buildingId: destination?.buildingId,
        urbanId: destination?.urbanId,
        receiverGroupCode: destination?.receiverGroupCode?.toString(),
      });
    },
  });

  const onSubmit = (data: {data: string}) => {
    if (file) {
      if (typeof file !== 'string') {
        uploadImage({
          data: {
            ...noti,
            ...data,
            isAllowComment,
            type: 2,
            organizationUnitId: selectedOrganization?.id,
            state: 1,
          },
          files: [file],
        });
      } else {
        let receiveAll = 0;
        if (destination) {
          if (destination.urbanId) {
            receiveAll = 1;
            if (destination.buildingId && destination.receiverGroupCode) {
              receiveAll = 3;
            } else if (!destination.receiverGroupCode) {
              receiveAll = 2;
            }
          }
        }
        createOrUpdateNotification({
          ...noti,
          ...data,
          isAllowComment,
          type: 2,
          organizationUnitId: selectedOrganization?.id,
          state: 1,
          receiveAll: receiveAll,
          buildingId: destination?.buildingId,
          urbanId: destination?.urbanId,
          receiverGroupCode: destination?.receiverGroupCode?.toString(),
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
            ...organizationUnits.map(o => ({
              label: o.displayName,
              id: o.id,
            })),
          ]}
          label={language.t(languageKeys.digitalNoti.create.department)}
          selectedLabel={selectedOrganization?.displayName}
          placeholder={language.t(
            languageKeys.digitalNoti.create.selectDepartment,
          )}
          labelStyle={styles.textLabel}
          itemLabelStyle={styles.textValue}
          inputContainer={styles.dataInput}
        />

        <RadioButtonGroup
          onSelection={(value: boolean) => {
            setAllowComment(value);
          }}
          listOptions={listOption}
          selectedOption={listOption[isAllowComment ? 0 : 1]}
          label={language.t(languageKeys.digitalNoti.create.allComment)}
          labelStyle={styles.textLabel}
          style={[styles.sectionContainer]}
          contentContainer={{
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}
        />

        <RadioButtonGroup
          onSelection={(value: boolean) => {
            setSendAll(value);
          }}
          listOptions={sendAllOptions}
          selectedOption={sendAllOptions[sendAll ? 0 : 1]}
          label={language.t(languageKeys.digitalNoti.create.destination)}
          labelStyle={styles.textLabel}
          style={[styles.sectionContainer]}
          contentContainer={{
            justifyContent: 'space-around',
          }}
        />

        {!sendAll && (
          <View>
            <DestinationNoticeContext.Provider
              value={{
                destination: destination,
                setDestination: setDestination,
              }}>
              <SelectDestination
                labelStyle={styles.textLabel}
                itemLabelStyle={styles.textValue}
                inputContainer={styles.dataInput}
              />
            </DestinationNoticeContext.Provider>
          </View>
        )}
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
      <BottomButton
        disabled={status === 'loading' || uploadStatus === 'loading'}
        onPress={handleSubmit(onSubmit)}>
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
