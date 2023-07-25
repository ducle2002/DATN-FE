import {StyleSheet} from 'react-native';
import React from 'react';
import {Button as PButton} from 'react-native-paper';
import globalStyles from '@/config/globalStyles';
type Props = React.ComponentProps<typeof PButton>;

const Button = ({children, labelStyle, ...props}: Props) => {
  return (
    <PButton
      style={styles.container}
      labelStyle={[labelStyle, {...globalStyles.text15Medium}]}
      {...props}>
      {children}
    </PButton>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
  },
});
