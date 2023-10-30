import {
  FlatList,
  ListRenderItem,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StackHeaderProps, StackScreenProps} from '@react-navigation/stack';
import {HotlineStackParamsList} from '@/routes/hotline.stack';
import MainHeader from '@/components/main-header.component';
import {useQuery} from 'react-query';
import HotlineService from './services/hotline.service';
import {THotline, THotlineProperty} from './services/hotline.model';
import globalStyles from '@/config/globalStyles';
import {useAppSelector} from '@/hooks/redux.hook';
import {checkPermission} from '@/utils/utils';
import {useTheme} from 'react-native-paper';
import Icon from '@/components/icon.component';
import BottomContainer from '@/components/bottom-container.component';
import Button from '@/components/button.component';
import language, {languageKeys} from '@/config/language/language';

type Props = StackScreenProps<HotlineStackParamsList, 'LIST_HOTLINE'>;

const HotlineScreen = ({navigation}: Props) => {
  const {grantedPermissions} = useAppSelector(state => state.config);

  const hasCreatePermission = useMemo(
    () =>
      checkPermission(grantedPermissions, ['Pages.Digitals.Hotline.Create']),
    [grantedPermissions],
  );

  const hasUpdatePermission = useMemo(
    () => checkPermission(grantedPermissions, ['Pages.Digitals.Hotline.Edit']),
    [grantedPermissions],
  );

  const [keyword, setKeyword] = useState<string>();

  const {data, status, remove, refetch} = useQuery({
    queryKey: ['hotline', keyword],
    queryFn: () =>
      HotlineService.getAll({maxResultCount: 1000, keyword: keyword}),
  });

  const renderHeader = useCallback((props: StackHeaderProps) => {
    return <MainHeader {...props} onKeywordChange={setKeyword} />;
  }, []);

  useEffect(() => {
    navigation.setOptions({
      header: renderHeader,
      headerShown: true,
    });
  }, [navigation, renderHeader]);

  const {colors} = useTheme();

  const renderHotline: ListRenderItem<THotline> = ({item: hotline}) => {
    const properties: THotlineProperty[] = JSON.parse(hotline.properties);

    return (
      <View key={hotline.id} style={styles.hotlineContainer}>
        <View style={styles.hotlineTitleContainer}>
          <Text style={styles.textTitle}>{hotline.name}</Text>
          {hasUpdatePermission && (
            <Icon
              type="FontAwesome"
              name="edit"
              color={colors.primary}
              onPress={() => {
                navigation.navigate('UPDATE', {hotline: hotline});
              }}
            />
          )}
        </View>
        <View style={styles.propertyContainer}>
          {properties.map(p => (
            <View key={p.name} style={styles.itemContainer}>
              <View style={styles.item}>
                <Text style={styles.textPhone}>{p.phone}</Text>
                <Text style={styles.textName}>{p.name}</Text>
                {p.note && <Text style={styles.textNote}>{p.note}</Text>}
              </View>
            </View>
          ))}
        </View>
      </View>
    );
  };

  const onRefresh = () => {
    remove();
    refetch();
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data?.hotlines}
        renderItem={renderHotline}
        refreshControl={
          <RefreshControl
            refreshing={status === 'loading'}
            onRefresh={onRefresh}
          />
        }
      />
      {hasCreatePermission && (
        <BottomContainer>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('UPDATE')}>
            {language.t(languageKeys.shared.button.add)}
          </Button>
        </BottomContainer>
      )}
    </View>
  );
};

export default HotlineScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  hotlineContainer: {
    backgroundColor: '#64C6DD',
    marginVertical: 8,
  },
  propertyContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  textTitle: {
    ...globalStyles.text16Bold,
  },
  itemContainer: {
    flexBasis: '50%',
    padding: 10,
  },
  item: {
    borderWidth: 2,
    padding: 5,
    borderRadius: 10,
    borderColor: '#f1f2f8',
  },
  hotlineTitleContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textName: {
    ...globalStyles.text15Medium,
  },
  textPhone: {
    ...globalStyles.text15Bold,
  },
  textNote: {
    ...globalStyles.text15Medium,
    color: '#a1a1a1',
  },
});
