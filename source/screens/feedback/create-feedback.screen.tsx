import React, {useState, useEffect, createRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Pressable,
  Alert,
  Keyboard,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
  Modal,
  TouchableWithoutFeedback,
  TextInput,
} from 'react-native';
// import Textarea from 'react-native-textarea';
import {useTranslation} from 'react-i18next';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from '@/components/icon.component';
import {NavigationProp} from '@react-navigation/native';
import {FeedbackStackParamsList} from '@/routes/feedback.stack';
import {StackNavigationProp} from '@react-navigation/stack';
import ModalPickerImage, {TImage} from './components/choose-image';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import FeedbackApi from '@/modules/feedback/feedback.service';
import {TOrganizationUnitUser} from '@/modules/feedback/feedback.model';
import moment from 'moment';
import {useToast} from 'react-native-toast-notifications';
import LoadingComponent from '@/components/loading';
import UtilsApi from '@/services/utils.service';
import {Controller, useForm} from 'react-hook-form';
import SelectWithModal from './components/select-with-modal';

const {width, height} = Dimensions.get('screen');
type screenNavigationProp = StackNavigationProp<
  FeedbackStackParamsList,
  'CreateFeedbackScreen'
>;

type Props = {
  navigation: screenNavigationProp;
};
const CreateFeedBackScreen = (props: Props) => {
  const toast = useToast();
  const language = useTranslation();
  const queryClient = useQueryClient();
  const [visibleChooseImg, setVisibleChooseImg] = useState(false);

  const {control, handleSubmit, watch, setValue, getValues} = useForm({
    mode: 'onChange',
    resolver: undefined,
  });
  const [selectUrban, setSelectUrban] = useState();
  const {data: listUrban} = useQuery({
    queryKey: ['feedback/create/getUrban'],
    queryFn: () => UtilsApi.getAllUrban(),
  });
  const {data: listBuilding} = useQuery({
    queryKey: ['feedback/create/building', selectUrban],
    queryFn: () =>
      UtilsApi.getAllBuilding({
        urbanId: selectUrban,
      }),
  });

  const deleteImage = (image: TImage) => {
    const oldData = getValues('fileUrl');
    if (oldData.length) {
      setValue(
        'fileUrl',
        oldData.filter((i: any) => i.uri !== image.uri),
      );
    }
  };
  const cleanupSingleImage = (i: any) => {
    ImagePicker.cleanSingle(i ? i.uri : null)
      .then(() => {
        deleteImage(i);
      })
      .catch(e => {
        console.log(e);
      });
  };
  const createWithImg = (data: any) => {
    UtilsApi.uploadImagesRequest(data.fileUrl).then((res: any) => {
      createFeedback({
        fileUrl: JSON.stringify(res),
        data: data,
      });
    });
  };
  const {mutate: createFeedback, isLoading} = useMutation({
    mutationKey: ['createFeedback'],
    mutationFn: ({fileUrl, data}: {fileUrl?: string; data?: any}) =>
      FeedbackApi.createFeedback({
        data: data.data,
        fileUrl: fileUrl,
        urbanId: data.urbanId,
        buildingId: data.buildingId,
        addressFeeder: data.addressFeeder,
        fullName: data.data,
        // name: moment().toISOString(),
      }),
    onSuccess: res => {
      toast.show('Tạo phản ánh thành công', {
        duration: 1000,
        type: 'success',
      });
      queryClient.refetchQueries({queryKey: ['feedback', 10]});
      queryClient.refetchQueries({queryKey: ['feedback', 11]});
      props.navigation.goBack();
    },
    onError: err => {
      console.log(err);
      toast.show('Tạo phản ánh thất bại', {
        duration: 1000,
        type: 'danger',
      });
    },
  });
  const onSubmit = (data: any) => {
    if (data.fileUrl && data.fileUrl.length > 0) {
      createWithImg(data);
    } else {
      createFeedback({
        fileUrl: undefined,
        data: data,
      });
    }
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <Pressable onPress={Keyboard.dismiss} style={styles.modal}>
        <View style={styles.header}>
          <Pressable
            onPress={() => {
              props.navigation.goBack();
            }}
            style={{
              paddingVertical: '3%',
              paddingHorizontal: '4%',
            }}>
            <Icon
              color="#333333"
              type="Ionicons"
              size={24}
              name="chevron-back-outline"
            />
          </Pressable>

          <Text style={{fontSize: 16, fontWeight: '700', color: '#333333'}}>
            {'Tạo phản ánh'}
          </Text>
          <Icon
            color="transparent"
            type="Ionicons"
            size={24}
            name="chevron-back-outline"
          />
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: height * 0.2,
          }}>
          <Controller
            control={control}
            name="urbanId"
            render={({field: {value, onChange}}) => (
              <SelectWithModal
                disable={!listUrban?.data || listUrban?.data?.length <= 1}
                options={
                  listUrban?.data
                    ? listUrban?.data.map(el => ({
                        label: el.displayName,
                        value: el.id,
                      }))
                    : []
                }
                placeHolder="Chọn khu đô thị (*)"
                title="Khu đô thị (*)"
                value={value}
                onChange={(_v: any) => {
                  onChange(_v);
                  setSelectUrban(_v);
                }}
              />
            )}
          />
          <Controller
            control={control}
            name="buildingId"
            render={({field: {value, onChange}}) => (
              <SelectWithModal
                disable={
                  !listBuilding?.data ||
                  listBuilding?.data?.length <= 1 ||
                  !selectUrban
                }
                options={
                  listBuilding?.data
                    ? listBuilding?.data?.map(el => ({
                        label: el.displayName,
                        value: el.id,
                      }))
                    : []
                }
                placeHolder="Chọn tòa nhà"
                title="Tòa nhà"
                value={value}
                onChange={onChange}
              />
            )}
          />
          <View
            style={{
              width: '100%',
              alignItems: 'flex-start',
              marginTop: 4,
              paddingHorizontal: 16,
            }}>
            <Text
              style={{
                fontSize: 13,
                fontWeight: '400',
                color: '#BDBDBD',
              }}>
              {'Họ và tên'}
            </Text>
          </View>
          <Controller
            control={control}
            name="fullName"
            render={({field: {value, onChange}}) => (
              <View style={styles.textInputContainer}>
                <TextInput
                  style={styles.textInput}
                  onChangeText={(text: string) => {
                    onChange(text);
                  }}
                  value={value}
                  placeholder={'Nhập họ và tên'}
                  placeholderTextColor={'#c7c7c7'}
                  underlineColorAndroid={'transparent'}
                />
              </View>
            )}
          />
          <View
            style={{
              width: '100%',
              alignItems: 'flex-start',
              marginTop: 12,
              paddingHorizontal: 16,
            }}>
            <Text
              style={{
                fontSize: 13,
                fontWeight: '400',
                color: '#BDBDBD',
              }}>
              {'Địa chỉ'}
            </Text>
          </View>
          <Controller
            control={control}
            name="addressFeeder"
            render={({field: {value, onChange}}) => (
              <View style={styles.textInputContainer}>
                <TextInput
                  style={styles.textInput}
                  onChangeText={(text: string) => {
                    onChange(text);
                  }}
                  value={value}
                  placeholder={'Nhập địa chỉ'}
                  placeholderTextColor={'#c7c7c7'}
                  underlineColorAndroid={'transparent'}
                />
              </View>
            )}
          />
          <View style={styles.labelContentFeedback}>
            <Text style={styles.txtLabelModalSolid}>{'Nội dung'}</Text>
          </View>
          <Controller
            control={control}
            name="data"
            render={({field: {value, onChange}}) => (
              <View style={styles.textareaContainer}>
                <TextInput
                  style={styles.textarea}
                  onChangeText={(text: string) => {
                    onChange(text);
                  }}
                  value={value}
                  multiline={true}
                  maxLength={1000}
                  placeholder={'Nhập nội dung phản ánh'}
                  placeholderTextColor={'#c7c7c7'}
                  underlineColorAndroid={'transparent'}
                />
                <Text style={styles.txtArea}>
                  {watch('data')?.length ?? 0}/1000
                </Text>
              </View>
            )}
          />

          <View
            style={{
              alignItems: 'flex-start',
              width: '100%',
              paddingHorizontal: 16,
            }}>
            <Text style={[styles.txtLabelModalSolid, {paddingVertical: 20}]}>
              {'Đính kèm ảnh'}
            </Text>
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              {watch('fileUrl')?.length && watch('fileUrl')?.length > 0
                ? watch('fileUrl').map((img: any, index: number) => (
                    <TouchableOpacity
                      key={index}
                      style={{marginEnd: 16, marginBottom: 10}}>
                      <Pressable
                        onPress={() => {
                          cleanupSingleImage(img);
                        }}
                        style={styles.btnDelImg}>
                        <Icon
                          type="Ionicons"
                          name="remove-circle"
                          size={width * 0.06}
                          color="#c1121f"
                        />
                      </Pressable>

                      <Image
                        source={{uri: img?.uri}}
                        style={styles.imgPreview}
                      />
                    </TouchableOpacity>
                  ))
                : null}
              {/* {data.file?.length && data.file?.length >= 5 ? null : ( */}
              {watch('fileUrl')?.length &&
              watch('fileUrl')?.length >= 5 ? null : (
                <Pressable
                  onPress={() => {
                    setVisibleChooseImg(true);
                  }}
                  style={styles.uploadImgIcon}>
                  <Icon
                    type="Ionicons"
                    name="images"
                    size={width * 0.12}
                    color="#333"
                  />
                </Pressable>
              )}
            </View>
          </View>
        </ScrollView>
        <View style={[styles.iconAddContainer]}>
          <TouchableOpacity
            disabled={isLoading}
            onPress={handleSubmit(onSubmit)}
            style={styles.btnCreate}>
            <Text style={styles.txtBtnCreate}>{'Gửi'}</Text>
          </TouchableOpacity>
        </View>
        <ModalPickerImage
          visible={visibleChooseImg}
          onClose={() => {
            setVisibleChooseImg(false);
          }}
          setImg={(imgs: TImage[]) => {
            const oldData = getValues('fileUrl');
            setValue('fileUrl', oldData ? [...oldData, ...imgs] : [...imgs]);
          }}
          multipleImg={true}
          compressImageMaxHeight={height}
          compressImageMaxWidth={width}
          maxImage={5}
        />
      </Pressable>
      {isLoading && <LoadingComponent />}
    </SafeAreaView>
  );
};

export default CreateFeedBackScreen;
const styles = StyleSheet.create({
  txtBtnTitle: {
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 18,
    color: '#2B5783',
  },
  txtTitleASheet: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 18,
    color: '#333333',
  },
  containerActionSheet: {
    backgroundColor: 'white',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
  },
  btnCreate: {
    height: (height * 44) / 812,
    width: (width * 343) / 375,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#339FD9',
    marginBottom: 24,
    borderRadius: 8,
  },
  txtBtnCreate: {
    fontSize: 15,
    fontWeight: '500',
    color: 'white',
  },
  iconAddContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'white',
    width: '100%',
    alignItems: 'center',
    paddingVertical: 16,
    zIndex: 0,
  },
  uploadImgIcon: {
    padding: 20,
    borderColor: '#2B5783',
    borderWidth: 1,
    borderStyle: 'dashed',
    marginHorizontal: 1,
    alignItems: 'center',
    borderRadius: 16,
    aspectRatio: 1,
    width: width / 4,
    marginBottom: 10,
    justifyContent: 'center',
  },
  txtLabelModalSolid: {
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 18,
    color: '#4F4F4F',
  },
  textInput: {
    fontSize: 15,
    color: '#333',
  },
  textarea: {
    textAlignVertical: 'top', // hack android
    height: (height * 120) / 812,
    fontSize: 14,
    color: '#333',
    paddingVertical: 20,
  },
  textInputContainer: {
    width: (width * 343) / 375,
    paddingTop: 4,
    paddingBottom: 12,
    marginHorizontal: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 2,
    borderColor: 'rgba(224, 224, 224, 0.5)',
  },
  textareaContainer: {
    minHeight: (height * 120) / 812,
    width: (width * 343) / 375,
    padding: 12,
    marginHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(224, 224, 224, 0.5)',
  },
  txtLabelModal: {
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 18,
    color: '#4F4F4F',
  },
  modal: {
    // alignItems: 'center',
    backgroundColor: '#fff',
    // flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: (width * 10) / 375,
    borderBottomWidth: 4,
    borderBottomColor: '#F2F2F2',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  containerFeedbackGroup: {
    width: '100%',
    alignItems: 'flex-start',
    marginVertical: 12,
    paddingHorizontal: 16,
  },
  labelFeedbackGroup: {
    fontSize: 13,
    fontWeight: '400',
    color: '#BDBDBD',
    marginTop: 8,
  },
  comboBoxFeedbackGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingBottom: 7,
    paddingTop: 3,
    borderBottomColor: 'rgba(224, 224, 224, 0.5)',
    borderBottomWidth: 2,
  },
  txtDescriptFeedbackGroup: {
    color: '#007f5f',
    fontSize: 14,
    fontWeight: '400',
    paddingTop: height * 0.01,
  },
  labelContentFeedback: {
    width: '100%',
    alignItems: 'flex-start',
    marginVertical: 12,
    paddingHorizontal: 16,
  },
  btnDelImg: {
    position: 'absolute',
    right: -width * 0.02,
    zIndex: 10,
    top: -width * 0.03,
  },
  txtArea: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    padding: '2%',
    fontSize: 12,
    fontWeight: '500',
    color: 'rgba(0,0,0,0.5)',
  },
  imgPreview: {
    aspectRatio: 1,
    width: width / 4,
    borderRadius: 16,
    borderColor: '#2B5783',
    borderWidth: 1,
    marginHorizontal: 1,
  },
});
