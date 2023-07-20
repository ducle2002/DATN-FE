import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import HomeIcon from './home-icon.components';
import {permissionsType} from 'types/declarations';

type Props = {
  type: string;
};

type ItemProps = {
  title: permissionsType;
};
const Item = ({title}: ItemProps) => {
  return (
    <View>
      <HomeIcon type={title} />
      <Text>{title}</Text>
    </View>
  );
};

const HomeFunction = ({type}: Props) => {
  switch (type) {
    case 'Pages.Management.ChatCitizen':
      return <Item title={type} />;
  }
};

export default HomeFunction;

const styles = StyleSheet.create({});
