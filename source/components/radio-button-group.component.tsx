import {
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {RadioButton} from 'react-native-paper';
import globalStyles from '@/config/globalStyles';

export type TRadioItem = {
  label: string;
  value: any;
};
type Props = React.ComponentProps<typeof View> & {
  listOptions: Array<TRadioItem>;
  selectedOption: TRadioItem;
  onSelection: Function;
  label?: string;
  labelStyle?: TextStyle;
  itemLabelStyle?: TextStyle;
  contentContainer?: ViewStyle;
};

const RadioButtonGroup = ({
  listOptions,
  selectedOption,
  onSelection,
  label,
  labelStyle,
  itemLabelStyle,
  contentContainer,
  ...props
}: Props) => {
  return (
    <RadioButton.Group
      value={selectedOption.value}
      onValueChange={value => {
        onSelection(value);
      }}>
      <View {...props}>
        <Text style={[styles.textLabel, labelStyle]}>{label}</Text>
        <View style={contentContainer}>
          {listOptions.map(option => (
            <Pressable
              onPress={() => onSelection(option.value)}
              key={option.value}
              style={styles.optionContainer}>
              <RadioButton.Android value={option.value} />
              <Text style={[styles.textOption, itemLabelStyle]}>
                {option.label}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
    </RadioButton.Group>
  );
};

export default RadioButtonGroup;

const styles = StyleSheet.create({
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textLabel: {
    ...globalStyles.text15Bold,
  },
  textOption: {
    ...globalStyles.text15Medium,
  },
});
