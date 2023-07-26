import {SafeAreaView, StyleSheet, View} from 'react-native';
import React from 'react';
import Button from '@/components/button.component';

type Props = React.ComponentProps<typeof Button>;

const BottomButton = ({children, ...props}: Props) => {
  return (
    <SafeAreaView
      style={{backgroundColor: 'white', shadowOpacity: 0.1, elevation: 10}}>
      <View style={styles.container}>
        <Button mode="contained" {...props}>
          {children}
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default BottomButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
});
