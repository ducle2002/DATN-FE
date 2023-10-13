import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import LinearGradientHeader from '@/components/linear-gradient-header.component';
import {StackHeaderProps} from '@react-navigation/stack';
import {HeaderTitle} from '@react-navigation/elements';
import Icon from '@/components/icon.component';
import {EWorkStatus} from '../services/work.model';
import language, {languageKeys} from '@/config/language/language';
import globalStyles from '@/config/globalStyles';
import moment from 'moment';
import {Divider, Menu} from 'react-native-paper';
import SelectTimesComponent, {TOptionItem} from './select-times.component';
import {TTurnWork} from '../services/logtime.model';

type Props = StackHeaderProps & {
  status?: EWorkStatus;
  turnWork?: TTurnWork[];
  onChangeTurn: Function;
  selectedTurn?: TTurnWork;
};
const HeaderWorkDetail = ({
  status,
  turnWork,
  onChangeTurn,
  selectedTurn,
  ...props
}: Props) => {
  const [visibleMenu, setVisibleMenu] = useState(false);
  const closeMenu = () => {
    setVisibleMenu(false);
  };
  return (
    <LinearGradientHeader headerProps={props}>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{
            padding: 5,
          }}
          onPress={() => props.navigation.goBack()}>
          <Icon type="Ionicons" name="chevron-back" size={30} color={'white'} />
        </TouchableOpacity>
        <HeaderTitle
          style={{
            color: 'white',
            textAlign: 'center',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
          {props.options.title}
        </HeaderTitle>
        <View
          style={{
            padding: 5,
            width: 30,
            height: 30,
          }}
        />
      </View>
      {!!status && (
        <SelectTimesComponent
          style={{
            alignSelf: 'center',
            backgroundColor: '#F7F7F7',
            paddingHorizontal: 12,
            paddingVertical: 10,
            borderRadius: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
          valueStyle={styles.textLabel}
          options={
            turnWork?.map(el => ({
              id: el.id ?? el.turnNumber,
              label: String(el.turnNumber),
              hint: moment(el.creationTime).format('DD/MM/YYYY HH:mm'),
            })) ?? []
          }
          selectedLabel={
            selectedTurn ? String(selectedTurn.turnNumber) : 'đang cập nhật'
          }
          onSelected={(val: string) => {
            onChangeTurn(turnWork?.find(el => el.id === Number(val)));
          }}
          preLabel="Lượt thực hiện: "
        />
      )}
    </LinearGradientHeader>
  );
};

export default HeaderWorkDetail;

const styles = StyleSheet.create({
  textLabel: globalStyles.text16Bold,
});
