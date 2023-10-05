import {StyleSheet, TouchableOpacity} from 'react-native';
import React, {memo} from 'react';
import Icon from '@/components/icon.component';
import {useTheme} from 'react-native-paper';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {WorkStackParamsList} from '@/routes/work-management.stack';

const CreateWork = () => {
  const theme = useTheme();
  const navigation =
    useNavigation<NavigationProp<WorkStackParamsList, 'MAIN_DRAWER'>>();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('CREATE_WORK')}
      style={styles.iconContainer}>
      <Icon
        type="MaterialIcons"
        name="assignment-add"
        size={30}
        color={theme.colors.primary}
      />
    </TouchableOpacity>
  );
};

export default memo(CreateWork);

const styles = StyleSheet.create({
  iconContainer: {
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 50,
    right: 50,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 30,
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowRadius: 5,
    elevation: 2,
  },
  viewContainer: {
    backgroundColor: 'red',
    width: '100%',
    height: '100%',
  },
});
