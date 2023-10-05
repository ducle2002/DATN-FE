import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ItemCard from '@/components/item-card.component';
import {Checkbox, useTheme} from 'react-native-paper';
import globalStyles from '@/config/globalStyles';
import Icon from '@/components/icon.component';
import {NavigationProp} from '@react-navigation/native';
import {WaterStackParamsList} from '@/routes/operating/water.stack';
type Props = {
  recorded?: boolean;
  navigation?: NavigationProp<WaterStackParamsList, 'MAIN_WATER'>;
};

const RecorderItem = ({recorded = false, navigation}: Props) => {
  const theme = useTheme();
  return (
    <ItemCard style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.textLabel}>
          Căn <Text>A201</Text>
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.textValue}>Nước</Text>
          {recorded ? (
            <Checkbox.Android status="checked" />
          ) : (
            <Icon
              style={{width: 36, height: 36, padding: 6}}
              size={24}
              type="FontAwesome"
              name="edit"
              color={theme.colors.primary}
              onPress={() => {
                navigation?.navigate('ADD_WATER_BILL');
              }}
            />
          )}
        </View>
      </View>
    </ItemCard>
  );
};

export default RecorderItem;

const styles = StyleSheet.create({
  container: {
    borderColor: '#4E5B8A',
    borderWidth: 0,
    borderRadius: 8,
    shadowOpacity: 0.3,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    alignItems: 'center',
  },
  textLabel: {
    ...globalStyles.text16Bold,
  },
  textValue: {
    ...globalStyles.text16SemiBold,
  },
});
