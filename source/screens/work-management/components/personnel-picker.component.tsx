import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Dimensions,
  StyleProp,
  ViewStyle,
} from 'react-native';
import React, {createContext, useContext, useMemo, useState} from 'react';
import ReactNativeModal from 'react-native-modal';
import Button from '@/components/button.component';
import {useQuery} from 'react-query';
import {useAllDepartment} from '@/modules/department/department.hook';
import DropdownMenuComponent from '@/components/dropdown-menu.component';
import {useAllOrganizationUnit} from '@/modules/organization/organization.hook';
import Animated from 'react-native-reanimated';
import OrganizationUnit from '@/components/organization-unit.component';
import {TPersonnel} from '../services/work.model';
import {PersonnelPickerContext} from '../create-work.screen';
const {height} = Dimensions.get('screen');
type Props = {
  label: string;
  containerStyle?: StyleProp<ViewStyle>;
};
import globalStyles from '@/config/globalStyles';
import {Chip} from 'react-native-paper';
import language, {languageKeys} from '@/config/language/language';
const PersonnelPicker = ({label, containerStyle}: Props) => {
  const {selected} = useContext(PersonnelPickerContext);

  const [isVisible, setIsVisible] = useState(false);
  const options = useMemo(
    () => [
      {id: 1, label: 'Cơ cấu tổ chức'},
      {id: 2, label: 'Cơ cấu dự án'},
    ],
    [],
  );

  const [typeStructure, setTypeStructure] = useState(options[0].id);

  const departments = useAllDepartment();
  const organizationUnits = useAllOrganizationUnit();

  return (
    <>
      <View style={containerStyle}>
        <Text style={styles.textLabel}>{label}</Text>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {selected.map(p => (
            <Chip key={p.id} style={{marginTop: 5, marginRight: 10}}>
              {p.fullName}
            </Chip>
          ))}
          <Button onPress={() => setIsVisible(true)}>
            {language.t(languageKeys.shared.button.add)}
          </Button>
        </View>
      </View>
      <ReactNativeModal
        style={{margin: 0}}
        onBackdropPress={() => setIsVisible(false)}
        isVisible={isVisible}>
        <SafeAreaView style={styles.container}>
          <View style={{paddingLeft: 10, height: '30%'}}>
            <Text style={styles.textLabel}>Nhân sự được chọn</Text>
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              {selected.map(p => (
                <Chip key={p.id} style={{marginTop: 5, marginRight: 10}}>
                  {p.fullName}
                </Chip>
              ))}
            </View>
          </View>
          <View style={{marginBottom: 'auto'}}>
            <DropdownMenuComponent
              options={options}
              onSelected={(id: number) => setTypeStructure(id)}
              selectedLabel={options.find(t => t.id === typeStructure)?.label}
            />
            {typeStructure === 2 ? (
              <OrganizationUnit data={organizationUnits} />
            ) : (
              <></>
            )}
          </View>
          <Button mode="contained" onPress={() => setIsVisible(false)}>
            Lưu
          </Button>
        </SafeAreaView>
      </ReactNativeModal>
    </>
  );
};

export default PersonnelPicker;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  textLabel: {
    ...globalStyles.text16Bold,
  },
});
