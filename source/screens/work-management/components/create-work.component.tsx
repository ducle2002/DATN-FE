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
    flex: 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 20,
  },
  viewContainer: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
  },
});
