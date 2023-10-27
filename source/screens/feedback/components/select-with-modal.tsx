import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Icon from '@/components/icon.component';
import Modal from 'react-native-modal';
import {useTranslation} from 'react-i18next';
const {height} = Dimensions.get('screen');
export interface ILVPair<T> {
  label: string;
  value: T;
}
type Props = {
  disable?: boolean;
  title?: string;
  placeHolder: string;
  options: ILVPair<any>[];
  value: any;
  hint?: string;
  onChange: Function;
};
const SelectWithModal = ({
  disable,
  title = '',
  placeHolder,
  hint,
  options,
  value,
  onChange,
}: Props) => {
  const language = useTranslation();
  const [visible, setVisible] = useState<boolean>(false);
  return (
    <View
      style={{
        width: '100%',
      }}>
      <View style={styles.containerSelect}>
        <Text style={styles.labelSelect}>{title}</Text>
        <TouchableOpacity
          disabled={disable}
          onPress={() => {
            setVisible(true);
          }}
          style={styles.comboBoxFeedbackGroup}>
          <Text style={styles.txtLabelModalSolid}>
            {options.find(el => el.value === value)?.label ?? placeHolder}
          </Text>
          <Icon
            type="Ionicons"
            name="chevron-down-outline"
            color="#333333"
            size={24}
          />
        </TouchableOpacity>
        {hint ? <Text style={styles.txtHint}>{`(*) ${hint}`}</Text> : null}
        <Modal
          style={{
            marginHorizontal: 0,
            justifyContent: 'flex-end',
          }}
          swipeDirection={['down']}
          animationIn={'slideInUp'}
          animationOut={'slideOutDown'}
          isVisible={visible}
          onBackdropPress={() => {
            setVisible(false);
          }}>
          <View
            style={{
              maxHeight: height * 0.5,
              backgroundColor: 'white',
              paddingHorizontal: '3%',
              paddingTop: '4%',
              borderTopRightRadius: 8,
              borderTopLeftRadius: 8,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: 16,
              }}>
              <Text style={styles.txtTitleASheet}>{title}</Text>
              <Pressable
                onPress={() => {
                  setVisible(false);
                }}>
                <Text style={styles.txtBtnTitle}>{language.t('close')}</Text>
              </Pressable>
            </View>
            <ScrollView>
              <View style={{paddingBottom: height * 0.1}}>
                {options?.map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        onChange(item.value);
                        setVisible(false);
                      }}
                      style={{
                        borderBottomWidth: 2,
                        borderColor: 'rgba(224, 224, 224, 0.5)',
                      }}>
                      <Text
                        style={{
                          paddingVertical: 16,
                          color: item.value === value ? '#339FD9' : '#333333',
                          fontSize: 15,
                          fontWeight: '500',
                          lineHeight: 18,
                        }}>
                        {item.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default SelectWithModal;

const styles = StyleSheet.create({
  containerSelect: {
    width: '100%',
    alignItems: 'flex-start',
    marginVertical: 12,
    paddingHorizontal: 16,
  },
  labelSelect: {
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
  txtHint: {
    color: '#007f5f',
    fontSize: 14,
    fontWeight: '400',
    paddingTop: height * 0.01,
  },
  txtLabelModalSolid: {
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 18,
    color: '#4F4F4F',
  },
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
});
