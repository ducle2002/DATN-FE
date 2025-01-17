import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {memo, useEffect} from 'react';
import ItemCard from '@/components/item-card.component';
import globalStyles from '@/config/globalStyles';
import Icon from '@/components/icon.component';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useTheme} from 'react-native-paper';
import {TWork} from '../services/work.model';
import {useTextContentOfHTML} from '@/hooks/utils.hook';
import {NavigationProp} from '@react-navigation/native';
import {WorkStackParamsList} from '@/routes/work-management.stack';
import language, {languageKeys} from '@/config/language/language';
type Props = {
  item: TWork;
  onPress: () => void;
  onMorePress?: () => void;
  isActive?: boolean;
  navigation: NavigationProp<WorkStackParamsList, 'MAIN_DRAWER'>;
};

const WorkItem = ({item, onPress, isActive, navigation}: Props) => {
  const pressValue = useSharedValue(0);
  useEffect(() => {
    if (isActive) {
      pressValue.value = withTiming(1, {duration: 200});
    } else {
      pressValue.value = withTiming(0);
    }
  }, [isActive, item.id, pressValue]);

  const contentAnimatedStyle = useAnimatedStyle(() => {
    return {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      flex: interpolate(pressValue.value, [0, 1], [1, 0.5]),
    };
  });

  const actionContainerAnimatedStyle = useAnimatedStyle(() => {
    return {
      flex: interpolate(pressValue.value, [0, 1], [0.1, 0.5]),
      alignItems: 'center',
      flexDirection: 'row',
    };
  });

  const textContent = useTextContentOfHTML(item.content);

  const actionAnimatedStyle = useAnimatedStyle(() => {
    return {
      width: interpolate(pressValue.value, [0, 1], [0, 80]) + '%',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    };
  });

  const theme = useTheme();

  return (
    <ItemCard
      onPress={onPress}
      style={{paddingVertical: 15, alignItems: 'center'}}>
      <Animated.View style={contentAnimatedStyle}>
        <View style={{flex: 1}}>
          <Text style={styles.textLabel}>{item.title}</Text>
          <Text style={styles.textValue} numberOfLines={1}>
            {textContent}
          </Text>
          <View
            style={{
              alignSelf: 'flex-start',
              paddingHorizontal: 5,
              paddingVertical: 2,
              backgroundColor: '#284DCE',
              borderRadius: 10,
              marginTop: 5,
            }}>
            <Text style={styles.textStatus}>
              {language.t(languageKeys.workManagement.status[item.status])}
            </Text>
          </View>
        </View>
      </Animated.View>
      <Animated.View style={actionContainerAnimatedStyle}>
        <Animated.View style={actionAnimatedStyle}>
          <Icon
            type="Ionicons"
            name="notifications"
            size={28}
            color={theme.colors.primary}
            onPress={() => {}}
          />
          <Icon
            type="Ionicons"
            name="eye"
            size={28}
            color={theme.colors.primary}
            onPress={onPress}
          />
        </Animated.View>
      </Animated.View>
      <Pressable
        style={{alignSelf: 'center', padding: 5}}
        onPress={() => {
          if (item.id) {
            navigation.navigate('COMMENT', {id: item.id});
          }
        }}>
        <Icon type="Entypo" name="chat" color="#2B5783" size={30} />
      </Pressable>
    </ItemCard>
  );
};

export default memo(
  WorkItem,
  (prev, next) => prev.item === next.item && prev.isActive === next.isActive,
);

const styles = StyleSheet.create({
  textLabel: {
    ...globalStyles.text16Bold,
  },
  textValue: {
    ...globalStyles.text16Medium,
  },
  textStatus: {
    ...globalStyles.text15Medium,
    color: 'white',
  },
});
