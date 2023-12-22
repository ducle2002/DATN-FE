import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  StyleProp,
  ViewStyle,
  ScrollView,
} from 'react-native';
import React, {useContext, useMemo, useState} from 'react';
import ReactNativeModal from 'react-native-modal';
import Button from '@/components/button.component';
import {useAllDepartment} from '@/modules/department/department.hook';
import DropdownMenuComponent from '@/components/dropdown-menu.component';
import {useOrganizationUnitTree} from '@/modules/organization/organization.hook';
import OrganizationUnit from '@/components/organization-unit.component';
type Props = {
  label: string;
  containerStyle?: StyleProp<ViewStyle>;
};
import globalStyles from '@/config/globalStyles';
import {Chip} from 'react-native-paper';
import language, {languageKeys} from '@/config/language/language';
import BottomContainer from '@/components/bottom-container.component';
import {PersonnelPickerContext} from '../services/hook';
import Departments from '@/components/departments.component';

const PersonnelPicker = ({label, containerStyle}: Props) => {
  const {selected, onSelect} = useContext(PersonnelPickerContext);
  const removePersonnel = (id: number) => {
    onSelect(selected.filter(a => a.id !== id));
  };

  const [isVisible, setIsVisible] = useState(false);
  const options = useMemo(
    () => [
      {id: 2, label: 'Cơ cấu dự án'},
      {id: 1, label: 'Cơ cấu tổ chức'},
    ],
    [],
  );

  const [typeStructure, setTypeStructure] = useState(options[0].id);

  const departments = useAllDepartment();
  const organizationUnits = useOrganizationUnitTree();

  return (
    <>
      <View style={containerStyle}>
        <Text style={styles.textLabel}>{label}</Text>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {selected.map(p => (
            <Chip
              closeIcon={'close-circle'}
              onClose={() => {
                removePersonnel(p.id);
              }}
              key={p.id}
              style={{marginTop: 10, marginRight: 10}}>
              {p.fullName}
            </Chip>
          ))}
          <Button style={{marginTop: 10}} onPress={() => setIsVisible(true)}>
            {language.t(languageKeys.shared.button.add)}
          </Button>
        </View>
      </View>
      <ReactNativeModal
        style={{margin: 0}}
        onBackdropPress={() => setIsVisible(false)}
        isVisible={isVisible}>
        <SafeAreaView style={styles.container}>
          <View style={{paddingLeft: 10, height: '25%'}}>
            <Text style={styles.textLabel}>Nhân sự được chọn</Text>
            <ScrollView
              contentContainerStyle={{flexDirection: 'row', flexWrap: 'wrap'}}>
              {selected.map(p => (
                <Chip
                  closeIcon={'close-circle'}
                  onClose={() => {
                    removePersonnel(p.id);
                  }}
                  key={p.id}
                  style={{marginTop: 10, marginRight: 10}}>
                  {p.fullName}
                </Chip>
              ))}
            </ScrollView>
          </View>
          <View style={{marginBottom: 'auto'}}>
            <DropdownMenuComponent
              label="Chọn cơ cấu"
              options={options}
              onSelected={(id: number) => setTypeStructure(id)}
              selectedLabel={options.find(t => t.id === typeStructure)?.label}
              inputContainer={{
                backgroundColor: '#f1f2f8',
                borderRadius: 10,
                marginLeft: 10,
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 10,
              }}
            />
            {typeStructure === 2 ? (
              <OrganizationUnit data={organizationUnits} />
            ) : (
              <Departments departments={departments ?? []} />
            )}
          </View>
          <BottomContainer>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-around'}}>
              <Button onPress={() => setIsVisible(false)}>Đóng</Button>
              <Button mode="contained" onPress={() => setIsVisible(false)}>
                Lưu
              </Button>
            </View>
          </BottomContainer>
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
