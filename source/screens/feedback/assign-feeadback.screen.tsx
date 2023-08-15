import {
  Dimensions,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from '@/components/icon.component';
import {StackScreenProps} from '@react-navigation/stack';
import {FeedbackStackParamsList} from '@/routes/feedback.stack';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import FeedbackApi from '@/modules/feedback/feedback.service';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {TOrganizationUnitUser} from '@/modules/feedback/feedback.model';
import LoadingComponent from '@/components/loading';
import {useToast} from 'react-native-toast-notifications';
const {width, height} = Dimensions.get('screen');
type Props = StackScreenProps<FeedbackStackParamsList, 'AssignFeedbackScreen'>;
const AssignFeeadbackScreen = (props: Props) => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const [selectedDepartment, setSelectedDepartment] = useState<number | null>(
    null,
  );
  const [selectedStaff, setSelectedStaff] = useState<number | null>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const {data: listDepartment, isLoading: isLoadingDepartment} = useQuery({
    queryKey: ['listDepartment'],
    queryFn: () => FeedbackApi.GetAllOrganizationUnitCitizenReflect({}),
  });
  const {
    data: ListOrganizationUnitUser,
    refetch,
    isLoading: isLoadingStaff,
  } = useQuery({
    queryKey: ['ListOrganizationUnitUser'],
    queryFn: () =>
      FeedbackApi.GetOrganizationUnitUsers({
        id: selectedDepartment,
      }),
  });
  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDepartment]);
  const onClose = () => {
    setVisible(false);
  };
  const {mutate: assignFeedback, isLoading} = useMutation({
    mutationKey: ['assignFeedback'],
    mutationFn: () =>
      FeedbackApi.assignFeedback({
        id: props.route.params.feedbackId,
        handleOrganizationUnitId: selectedDepartment ?? 0,
        handleUserId: selectedStaff ?? 0,
      }),
    onError: err => {
      console.log(err);
      toast.show('Phân công thất bại', {
        type: 'danger',
        duration: 1000,
      });
    },
    onSuccess: res => {
      toast.show('Phân công thành công', {
        type: 'success',
        duration: 1000,
      });
      queryClient.refetchQueries({queryKey: ['feedback', 2]});
      queryClient.refetchQueries({queryKey: ['feedback', 3]});
      props.navigation.goBack();
    },
  });
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <View style={styles.header}>
        <Pressable
          style={{
            paddingVertical: '3%',
          }}
          onPress={() => {
            props.navigation.goBack();
          }}>
          <Icon
            type="Ionicons"
            name="chevron-back-outline"
            size={24}
            color={'#333'}
          />
        </Pressable>

        <Text style={styles.txtHeader}>Chọn người phân công</Text>
        <View />
      </View>
      <Text style={styles.txtLabel}>1. Chọn phòng ban của nhân viên</Text>
      <TouchableOpacity
        onPress={() => {
          setVisible(true);
        }}
        style={[styles.btnDepartment, styles.dropdownDepartment]}>
        <Text style={styles.txtBtnDepartment}>
          {selectedDepartment && listDepartment
            ? listDepartment?.find(
                el => el.organizationUnitId === selectedDepartment,
              )?.name
            : 'Chọn phòng ban nhân viên'}
        </Text>
        <Icon type="Ionicons" name="chevron-down" size={18} color={'#333'} />
      </TouchableOpacity>
      <Text style={styles.txtLabel}>2. Chọn nhân viên phân công</Text>
      {ListOrganizationUnitUser &&
        ListOrganizationUnitUser?.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setSelectedStaff(item.id);
              }}
              style={[
                styles.btnDepartment,
                {
                  backgroundColor:
                    item.id === selectedStaff ? '#0077b6' : '#fff',
                },
              ]}>
              <Text
                style={[
                  styles.txtBtnDepartment,
                  {
                    color: item.id === selectedStaff ? 'white' : '#333',
                  },
                ]}>
                {item.fullName}
              </Text>
            </TouchableOpacity>
          );
        })}
      <View style={styles.btnContainerSubmit}>
        <TouchableOpacity
          disabled={
            !selectedDepartment ||
            !selectedStaff ||
            isLoading ||
            isLoadingDepartment ||
            isLoadingStaff
          }
          style={styles.btnSubmit}
          onPress={() => {
            assignFeedback();
          }}>
          <Text style={styles.txtBtnSubmit}>Phân công</Text>
        </TouchableOpacity>
      </View>
      <Modal visible={visible} transparent animationType="slide">
        <Pressable
          onPress={onClose}
          style={{
            justifyContent: 'flex-end',
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.4)',
          }}>
          <TouchableWithoutFeedback>
            <View
              style={{
                backgroundColor: 'white',
                paddingBottom: '10%',
                paddingTop: '3%',
                borderTopRightRadius: 8,
                borderTopLeftRadius: 8,
              }}>
              <View style={styles.header}>
                <Text style={styles.txtHeader}>Danh sách phòng ban</Text>
                <Pressable onPress={onClose}>
                  <Text style={[styles.txtHeader, {fontWeight: '400'}]}>
                    Đóng
                  </Text>
                </Pressable>
              </View>
              {listDepartment &&
                listDepartment?.map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        if (item.organizationUnitId !== selectedDepartment) {
                          setSelectedDepartment(item.organizationUnitId);
                        }
                        onClose();
                      }}
                      style={[
                        styles.btnDepartment,
                        {
                          backgroundColor:
                            item.organizationUnitId === selectedDepartment
                              ? '#0077b6'
                              : '#e9ecef',
                        },
                      ]}>
                      <Text
                        style={[
                          styles.txtBtnDepartment,
                          {
                            color:
                              item.organizationUnitId === selectedDepartment
                                ? 'white'
                                : '#333',
                          },
                        ]}>
                        {item.name}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
            </View>
          </TouchableWithoutFeedback>
        </Pressable>
      </Modal>
      {(isLoading || isLoadingDepartment || isLoadingStaff) && (
        <LoadingComponent />
      )}
    </SafeAreaView>
  );
};

export default AssignFeeadbackScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '4%',
  },
  btnDepartment: {
    paddingVertical: '3%',
    paddingHorizontal: '3%',
    marginTop: '3%',
    borderRadius: 8,
    marginHorizontal: '4%',
  },
  txtBtnDepartment: {
    fontSize: 15,
    fontWeight: '500',
  },
  btnContainerSubmit: {
    position: 'absolute',
    bottom: 0,

    backgroundColor: 'white',
    paddingBottom: '10%',
    paddingTop: '3%',
    width: '100%',
    alignItems: 'center',
  },
  btnSubmit: {
    paddingVertical: '3%',
    backgroundColor: '#0077b6',
    borderRadius: 8,
    width: width * 0.9,
    alignItems: 'center',
  },
  txtBtnSubmit: {
    fontSize: 15,
    fontWeight: '500',
    color: 'white',
  },
  dropdownDepartment: {
    backgroundColor: 'rgba(144,224,239,0.5)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  txtHeader: {
    fontSize: 15,
    fontWeight: '700',
    color: '#333',
  },
  txtLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0077b6',
    paddingHorizontal: '3%',
    paddingTop: '5%',
  },
});
