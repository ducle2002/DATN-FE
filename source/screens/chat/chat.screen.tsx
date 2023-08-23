import {
  Dimensions,
  FlatList,
  Modal,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useQuery} from 'react-query';
import ChatApi from '@/modules/chat/chat.service';
import {useAppSelector} from '@/hooks/redux.hook';
import {selectorOrganizationUnit} from '@/modules/organization/organization.slice';
import Icon from '@/components/icon.component';
import UserChatItem from './components/user-chat-item';
import HeaderChatScreen from './components/header-chat-screen';
import {useTranslation} from 'react-i18next';
import {languageKeys} from '@/config/language/language';
const {height} = Dimensions.get('screen');
const ChatScreen = () => {
  const {t} = useTranslation();
  const organizationUnit = useAppSelector(selectorOrganizationUnit);
  const [selectOrganization, setSelectOrganization] = useState(0);
  const [keywordSearch, setKeywordSearch] = useState('');
  const [visible, setVisible] = useState(false);
  const onClose = () => {
    setVisible(false);
  };
  const {data, refetch, isLoading} = useQuery({
    queryKey: ['userChat'],
    queryFn: () =>
      ChatApi.getUserChat({
        organizationUnitId:
          organizationUnit[selectOrganization].organizationUnitId,
      }),
  });
  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectOrganization]);
  return (
    <View style={{flex: 1}}>
      <HeaderChatScreen
        searchQuery={keywordSearch}
        setSearchQuery={setKeywordSearch}
      />
      <TouchableOpacity
        style={styles.btnDepartment}
        onPress={() => {
          setVisible(true);
        }}>
        <Text>{organizationUnit[0]?.displayName}</Text>
        <Icon
          type="Ionicons"
          name="chevron-down-sharp"
          color={'#333'}
          size={18}
        />
      </TouchableOpacity>
      <FlatList
        data={data}
        style={{
          borderTopWidth: 1,
          borderColor: '#DADADA',
        }}
        contentContainerStyle={{
          paddingBottom: height * 0.15,
        }}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => {
          return (
            <UserChatItem
              data={item}
              organizationUnitId={
                organizationUnit[selectOrganization].organizationUnitId
              }
            />
          );
        }}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
      />
      <Modal visible={visible} transparent>
        <Pressable
          onPress={onClose}
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <TouchableWithoutFeedback>
            <View
              style={{
                backgroundColor: 'white',
                paddingTop: '4%',
                paddingBottom: '8%',
                paddingHorizontal: '4%',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={{color: '#333', fontWeight: '700', fontSize: 14}}>
                  {t(languageKeys.chat.main.department.title)}
                </Text>
                <TouchableOpacity onPress={onClose}>
                  <Text
                    style={{color: '#333', fontWeight: '400', fontSize: 14}}>
                    {t(languageKeys.chat.main.department.close)}
                  </Text>
                </TouchableOpacity>
              </View>
              {organizationUnit.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={{
                      paddingVertical: '4%',
                      paddingHorizontal: '5%',
                      marginTop: '4%',
                      backgroundColor:
                        index === selectOrganization
                          ? 'rgba(173,232,244, 0.5)'
                          : 'white',
                      borderRadius: 8,
                      borderWidth: 1,
                      borderColor:
                        index === selectOrganization
                          ? 'rgba(173,232,244, 0.5)'
                          : '#333',
                    }}
                    onPress={() => {
                      if (index !== selectOrganization) {
                        setSelectOrganization(index);
                      }
                      onClose();
                    }}>
                    <Text>{item.displayName}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </TouchableWithoutFeedback>
        </Pressable>
      </Modal>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  btnDepartment: {
    backgroundColor: 'rgba(173,232,244, 0.5)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '5%',
    marginVertical: '5%',
    paddingHorizontal: '4%',
    paddingVertical: '3%',
    borderRadius: 8,
  },
});
