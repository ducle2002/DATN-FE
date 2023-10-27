import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {TDepartment} from '@/modules/department/department.model';
import {useAllAccountOnDepartment} from '@/modules/department/department.hook';
import AccountContainer from './account-container';
import globalStyles from '@/config/globalStyles';
type Props = {
  departments: TDepartment[];
};

const Departments = ({departments}: Props) => {
  const [selectedDepartment, setSelectedDepartment] = useState<TDepartment>();
  const {accounts} = useAllAccountOnDepartment({id: selectedDepartment?.id});

  return (
    <View style={styles.container}>
      <ScrollView style={{height: 200}}>
        {departments.map(d => (
          <Pressable
            style={[
              styles.itemContainer,
              {
                backgroundColor:
                  selectedDepartment?.id === d.id ? '#f1f2f8' : 'white',
              },
            ]}
            key={d.id}
            onPress={() => setSelectedDepartment(d)}>
            <Text style={styles.textLabel}>{d.displayName}</Text>
            <Text style={styles.textCount}>{d.userCount} thành viên</Text>
          </Pressable>
        ))}
      </ScrollView>

      <AccountContainer
        accounts={accounts?.map(a => ({id: a.id, fullName: a.displayName}))}
        label={'Thành viên ' + selectedDepartment?.displayName}
        containerStyle={styles.accountContainer}
      />
    </View>
  );
};

export default Departments;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  accountContainer: {
    marginTop: 20,
  },
  itemContainer: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderBottomWidth: 3,
    borderBottomColor: '#f1f2f8',
    flexDirection: 'row',
  },
  textLabel: {
    ...globalStyles.text15Bold,
  },
  textCount: {
    ...globalStyles.text15Medium,
    marginLeft: 'auto',
  },
});
