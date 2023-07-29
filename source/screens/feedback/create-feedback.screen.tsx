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
} from 'react-native';
// import Textarea from 'react-native-textarea';
import {useTranslation} from 'react-i18next';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from '@/components/icon.component';
import {NavigationProp} from '@react-navigation/native';
import {FeedbackStackParamsList} from '@/routes/feedback.stack';
import {StackNavigationProp} from '@react-navigation/stack';
import ModalPickerImage, {TImage} from './components/choose-image';

const {width, height} = Dimensions.get('screen');
type screenNavigationProp = StackNavigationProp<
  FeedbackStackParamsList,
  'CreateFeedbackScreen'
>;

type Props = {
  navigation: screenNavigationProp;
};
const CreateFeedBackScreen = (props: Props) => {
  //   const actionSheetRef = createRef();
  //   const dispatch = useDispatch();
  //   const {typeConfig} = useSelector(states => states.userToken);
  //   const listUnitOrg = useSelector(state => state.unitOrgFeedBack.listUnitOrg);
  const [visibleChooseImg, setVisibleChooseImg] = useState(false);
  const language = useTranslation();

  //   const [department, setDepartment] = useState(
  //     listUnitOrg?.length <= 1
  //       ? listUnitOrg[0]
  //       : {
  //           type: null,
  //           name: language.t('chooseDepartment'),
  //           description: '',
  //         },
  //   );
  //   const {createSuccess, isFetchingUnProcess} = useSelector(
  //     store => store.getAllFeedBack,
  //   );
  const [data, setData] = React.useState<{
    content: string;
    file: TImage[] | null;
  }>({
    content: '',
    file: null,
  });

  const deleteImage = (image: TImage) => {
    if (data.file?.length) {
      setData({
        ...data,
        file: data.file.filter(i => i.uri !== image.uri),
      });
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
  //   useEffect(() => {
  //     if (createSuccess) {
  //       props.navigation.navigate('FeedbScreen');
  //       if (typeConfig !== 1) {
  //         if (listUnitOrg?.length <= 1) {
  //           setDepartment(listUnitOrg[0]);
  //         } else {
  //           setDepartment({
  //             type: null,
  //             name: language.t('chooseDepartment'),
  //             detail: '',
  //           });
  //         }
  //       }
  //     //   dispatch(actions.createFeedBackFinish());
  //     }
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [createSuccess]);
  return (
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
      {/* {typeConfig !== 1 ? (
        <View style={styles.containerFeedbackGroup}>
          <Text style={styles.labelFeedbackGroup}>
            {language.t('feedBackGroup')}
          </Text>
          <TouchableOpacity
            disabled={listUnitOrg?.length <= 1}
            onPress={() => {
              //   actionSheetRef.current?.show();
            }}
            style={styles.comboBoxFeedbackGroup}>
            <Text style={styles.txtLabelModalSolid}>{department?.name}</Text>
            <Icon
              type="Ionicons"
              name="chevron-down-outline"
              color="#333333"
              size={24}
            />
          </TouchableOpacity>
          {department?.description ? (
            <Text style={styles.txtDescriptFeedbackGroup}>
              {`(*) ${department?.description}`}
            </Text>
          ) : null}
        </View>
      ) : null} */}
      <View style={styles.labelContentFeedback}>
        <Text style={styles.txtLabelModal}>{'Nội dung'}</Text>
      </View>
      {/* <Textarea
        containerStyle={styles.textareaContainer}
        style={styles.textarea}
        onChangeText={(text: string) => {
          setData({
            ...data,
            content: text,
          });
        }}
        defaultValue={data.content}
        maxLength={1000}
        placeholder={language.t('Please enter your feedback')}
        placeholderTextColor={'#c7c7c7'}
        underlineColorAndroid={'transparent'}
      /> */}

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
          {data.file?.length && data.file?.length > 0
            ? data.file.map((img, index) => (
                <TouchableOpacity
                  key={index}
                  style={{marginEnd: 16, marginBottom: 10}}>
                  <Pressable
                    onPress={() => {
                      cleanupSingleImage(img);
                    }}
                    style={{
                      position: 'absolute',
                      right: -width * 0.02,
                      zIndex: 10,
                      top: -width * 0.03,
                    }}>
                    <Icon
                      type="Ionicons"
                      name="remove-circle"
                      size={width * 0.06}
                      color="#c1121f"
                    />
                  </Pressable>

                  <Image
                    source={{uri: img?.uri}}
                    style={{
                      aspectRatio: 1,
                      width: width / 4,
                      borderRadius: 16,
                      borderColor: '#2B5783',
                      borderWidth: 1,
                      marginHorizontal: 1,
                    }}
                  />
                </TouchableOpacity>
              ))
            : null}
          {data.file?.length && data.file?.length >= 5 ? null : (
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
      <View style={[styles.iconAddContainer]}>
        <TouchableOpacity
          onPress={() => {
            // if (
            //   (!department.type && typeConfig !== 1) ||
            //   data.content.length === 0
            // ) {
            //   Alert.alert(
            //     'Cảnh báo',
            //     data.content.length === 0
            //       ? 'nội dung không được để trống'
            //       : 'Hãy chọn nhóm phản ánh',
            //     [{text: 'Okay'}],
            //   );
            //   return;
            // }
            // let submit = {
            //   data: data.content,
            //   file: data.file,
            //   isPublic: false,
            //   type: department.organizationUnitId,
            // };
            // dispatch(actions.createFeedBack(submit));
          }}
          style={styles.btnCreate}>
          {/* {isFetchingUnProcess ? (
            <ActivityIndicator color={'white'} size={'small'} />
          ) : ( */}
          <Text style={styles.txtBtnCreate}>{'Gửi'}</Text>
          {/* )} */}
        </TouchableOpacity>
      </View>
      {/* <ActionSheet
        ref={actionSheetRef}
        containerStyle={styles.containerActionSheet}>
        <SafeAreaView>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: 16,
            }}>
            <Text style={styles.txtTitleASheet}>
              {language.t('feedBackGroup')}
            </Text>
            <Pressable
              onPress={() => {
                actionSheetRef.current?.hide();
              }}>
              <Text style={styles.txtbtnTitle}>{language.t('close')}</Text>
            </Pressable>
          </View>
          <ScrollView>
            <View style={{paddingBottom: height * 0.1}}>
              {listUnitOrg?.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      setDepartment(item);
                      actionSheetRef.current?.hide();
                    }}
                    style={{
                      borderBottomWidth: 2,
                      borderColor: 'rgba(224, 224, 224, 0.5)',
                    }}>
                    <Text
                      style={{
                        paddingVertical: 16,
                        color:
                          item.organizationUnitId ===
                          department.organizationUnitId
                            ? '#339FD9'
                            : '#333333',
                        fontSize: 15,
                        fontWeight: '500',
                        lineHeight: 18,
                      }}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </SafeAreaView>
      </ActionSheet> */}
      <ModalPickerImage
        visible={visibleChooseImg}
        onClose={() => {
          setVisibleChooseImg(false);
        }}
        setImg={(imgs: TImage[]) => {
          setData({
            ...data,
            file: data.file ? [...data.file, ...imgs] : [...imgs],
          });
        }}
        multipleImg={true}
        compressImageMaxHeight={height}
        compressImageMaxWidth={width}
        maxImage={5}
      />
    </Pressable>
  );
};

export default CreateFeedBackScreen;
const styles = StyleSheet.create({
  txtbtnTitle: {
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
  textarea: {
    textAlignVertical: 'top', // hack android
    height: (height * 120) / 812,
    fontSize: 14,
    color: '#333',
    paddingVertical: 20,
  },
  textareaContainer: {
    height: (height * 120) / 812,
    width: (width * 343) / 375,
    padding: 12,
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
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
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
});
