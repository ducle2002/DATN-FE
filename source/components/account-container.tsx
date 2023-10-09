import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import React, {useContext} from 'react';
import {Chip} from 'react-native-paper';
import globalStyles from '@/config/globalStyles';
import {TPersonnel} from '@/screens/work-management/services/work.model';
import {PersonnelPickerContext} from '@/screens/work-management/create-work.screen';

type Props = {
  accounts?: TPersonnel[];
  label?: string;
  containerStyle?: StyleProp<ViewStyle>;
};

const AccountContainer = ({accounts, label, containerStyle}: Props) => {
  const {onSelect, selected} = useContext(PersonnelPickerContext);

  const selectHandle = (account: TPersonnel) => {
    if (selected.find(a => a.id === account.id)) {
      onSelect(selected.filter(a => a.id !== account.id));
    } else {
      onSelect([...selected, account]);
    }
  };

  if (accounts?.length && accounts.length > 0) {
    return (
      <View style={containerStyle}>
        <Text style={styles.textLabel}>{label}</Text>
        <View style={styles.accountContainer}>
          {accounts?.map(a => (
            <View key={a.id}>
              <Chip
                style={styles.chip}
                textStyle={styles.textChip}
                onPress={() => {
                  selectHandle(a);
                }}>
                {a.fullName}
              </Chip>
            </View>
          ))}
        </View>
      </View>
    );
  }
  return undefined;
};

export default AccountContainer;

const styles = StyleSheet.create({
  accountContainer: {
    flexDirection: 'row',
  },
  textLabel: {
    ...globalStyles.text15SemiBold,
    marginBottom: 5,
  },
  textChip: {
    ...globalStyles.text14Medium,
  },
  chip: {
    marginBottom: 5,
    marginRight: 10,
  },
});
