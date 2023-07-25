import {StyleSheet} from 'react-native';
import React from 'react';
import {Button as PButton} from 'react-native-paper';
type Props = React.ComponentProps<typeof PButton>;

const Button = ({children, labelStyle, ...props}: Props) => {
  return (
    <PButton
      style={styles.container}
      labelStyle={[{fontSize: 15, fontWeight: '500'}, labelStyle]}
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
