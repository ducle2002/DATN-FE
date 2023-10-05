import {FlatList, View} from 'react-native';
import React, {useEffect} from 'react';
import BottomContainer from '@/components/bottom-container.component';
import Button from '@/components/button.component';
import {CompositeScreenProps, useIsFocused} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import {WaterStackParamsList} from '@/routes/operating/water.stack';
import {AppStackParamsList} from '@/routes/app.stack';
import RecorderItem from './components/recorder-item';
import language, {languageKeys} from '@/config/language/language';
import FilterWater from './components/filter';

type Props = CompositeScreenProps<
  StackScreenProps<WaterStackParamsList, 'MAIN_WATER'>,
  StackScreenProps<AppStackParamsList, 'OPERATING_STACK'>
>;

const WaterBill = ({navigation}: Props) => {
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      navigation.getParent()?.setOptions({
        headerShown: true,
        title: language.t(languageKeys.water.header.list),
        headerBackTitleVisible: false,
      });
    }
  }, [isFocused, navigation]);

  const renderItem = ({item}: {item: any}) => (
    <RecorderItem recorded={false} {...item} navigation={navigation} />
  );
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <FilterWater />
      <FlatList
        data={[{recorded: false}, {recorded: true}]}
        renderItem={renderItem}
        contentContainerStyle={{paddingTop: 10}}
      />
      <BottomContainer>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('ADD_WATER_BILL')}>
          {language.t(languageKeys.water.action.addNew)}
        </Button>
      </BottomContainer>
    </View>
  );
};

export default WaterBill;
