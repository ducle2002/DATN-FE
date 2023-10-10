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
import SelectTimesComponent from './select-times.component';

type Props = StackHeaderProps & {status?: EWorkStatus};
const HeaderWorkDetail = ({status, ...props}: Props) => {
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
          options={[
            {
              id: 1,
              label: '1',
              hint: moment().format('DD/MM/YYYY HH:mm'),
            },
            {
              id: 2,
              label: '2',
              hint: moment().format('DD/MM/YYYY HH:mm'),
            },
            {
              id: 3,
              label: '3',
              hint: moment().format('DD/MM/YYYY HH:mm'),
            },
            {
              id: 4,
              label: '4',
              hint: moment().format('DD/MM/YYYY HH:mm'),
            },
            {
              id: 5,
              label: '5',
              hint: moment().format('DD/MM/YYYY HH:mm'),
            },
            {
              id: 6,
              label: '6',
              hint: moment().format('DD/MM/YYYY HH:mm'),
            },
            {
              id: 7,
              label: '7',
              hint: moment().format('DD/MM/YYYY HH:mm'),
            },
            {
              id: 8,
              label: '8',
              hint: moment().format('DD/MM/YYYY HH:mm'),
            },
            {
              id: 9,
              label: '9',
              hint: moment().format('DD/MM/YYYY HH:mm'),
            },
            {
              id: 10,
              label: '10',
              hint: moment().format('DD/MM/YYYY HH:mm'),
            },
            {
              id: 11,
              label: '11',
              hint: moment().format('DD/MM/YYYY HH:mm'),
            },
            {
              id: 12,
              label: '12',
              hint: moment().format('DD/MM/YYYY HH:mm'),
            },
            {
              id: 13,
              label: '13',
              hint: moment().format('DD/MM/YYYY HH:mm'),
            },
            {
              id: 14,
              label: '14',
              hint: moment().format('DD/MM/YYYY HH:mm'),
            },
            {
              id: 15,
              label: '15',
              hint: moment().format('DD/MM/YYYY HH:mm'),
            },
            {
              id: 16,
              label: '16',
              hint: moment().format('DD/MM/YYYY HH:mm'),
            },
            {
              id: 17,
              label: '17',
              hint: moment().format('DD/MM/YYYY HH:mm'),
            },
            {
              id: 18,
              label: '18',
              hint: moment().format('DD/MM/YYYY HH:mm'),
            },
            {
              id: 19,
              label: '19',
              hint: moment().format('DD/MM/YYYY HH:mm'),
            },
            {
              id: 20,
              label: '20',
              hint: moment().format('DD/MM/YYYY HH:mm'),
            },
            {
              id: 21,
              label: '21',
              hint: moment().format('DD/MM/YYYY HH:mm'),
            },
          ]}
          selectedLabel={'10'}
          onSelected={() => {}}
          preLabel="Lượt số: "
        />
        //     <TouchableOpacity
        //       onPress={() => {
        //         setVisibleMenu(true);
        //       }}
        //       style={{
        //         alignSelf: 'center',
        //         backgroundColor: '#F7F7F7',
        //         paddingHorizontal: 12,
        //         paddingVertical: 10,
        //         borderRadius: 10,
        //         flexDirection: 'row',
        //         alignItems: 'center',
        //         justifyContent: 'space-between',
        //       }}>
        //       {/* <Text style={styles.textLabel}>
        //     Trạng thái:{' '}
        //     <Text style={{color: '#2E9BFF'}}>
        //       {language.t(languageKeys.workManagement.status[status])}
        //     </Text>
        //   </Text> */}
        //       <View
        //         style={{
        //           alignItems: 'center',
        //           paddingRight: 12,
        //         }}>
        //         <Text style={styles.textLabel}>
        //           Lượt: số <Text style={{color: '#2E9BFF'}}>1</Text>
        //         </Text>
        //         <Text
        //           style={{
        //             fontSize: 12,
        //             paddingTop: 4,
        //             color: 'gray',
        //           }}>
        //           Ngày {moment().format('DD/MM/YYYY HH:mm')}
        //         </Text>
        //       </View>

        //       <Icon
        //         type="Ionicons"
        //         name="chevron-down-outline"
        //         size={24}
        //         color={'#333'}
        //       />
        //     </TouchableOpacity>
      )}
    </LinearGradientHeader>
  );
};

export default HeaderWorkDetail;

const styles = StyleSheet.create({
  textLabel: globalStyles.text16Bold,
});
