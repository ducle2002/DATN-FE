import {TOrganizationUnit} from '@/modules/organization/organization.model';
import {useEffect, useState} from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import React from 'react';
import globalStyles from '@/config/globalStyles';
import Icon from './icon.component';
import {useAllOrganizationUsers} from '@/modules/organization/organization.hook';
import AccountContainer from './account-container';

type OrganizationsTreeProps = {
  data: TOrganizationUnit[];
};

const Organization = ({
  data,
  setState,
  state,
  history,
  setHistory,
}: {
  data: TOrganizationUnit;
  history: TOrganizationUnit[];
  setHistory: (history: TOrganizationUnit[]) => void;
  setState: (o: {
    data: TOrganizationUnit[];
    selectedData: TOrganizationUnit;
  }) => void;
  state: {data: TOrganizationUnit[]; selectedData?: TOrganizationUnit};
}) => {
  return (
    <Pressable
      onPress={() => {
        if (data.children.length > 0) {
          setState({
            ...state,
            data: data.children,
            selectedData: data,
          });
          setHistory([...history, data]);
        } else {
          setState({
            ...state,
            selectedData: data,
          });
        }
      }}
      style={styles.buttonContainer}>
      <Text>
        <Text style={styles.textLabel}>{data.displayName}</Text>
        <Text> ({data.children.length} đơn vị)</Text>
      </Text>
    </Pressable>
  );
};

const OrganizationsTree = ({data}: OrganizationsTreeProps) => {
  const [state, setState] = useState<{
    data: TOrganizationUnit[];
    selectedData?: TOrganizationUnit;
  }>({
    data: data,
    selectedData: undefined,
  });

  const [history, setHistory] = useState<TOrganizationUnit[]>([]);

  const onBackToRoot = () => {
    if (history.length > 0) {
      setState({
        selectedData: undefined,
        data: data,
      });
      setHistory([]);
    }
  };

  const onHistoryPress = (index: number) => {
    if (index !== history.length - 1) {
      let l = [...history];
      l.splice(index + 1);
      setState({
        data: history[index].children ?? data,
        selectedData: history[index],
      });
      setHistory(l);
    } else {
      setState({
        ...state,
        selectedData: history[index],
      });
    }
  };

  const animatedValue = useSharedValue(0);

  useEffect(() => {
    animatedValue.value = withSequence(
      withTiming(0, {duration: 0}),
      withTiming(1),
    );
  }, [animatedValue, state.data]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: interpolate(animatedValue.value, [0, 1], [-1000, 0])},
        {scale: interpolate(animatedValue.value, [0, 1], [0, 1])},
      ],
    };
  });

  const {accounts} = useAllOrganizationUsers({id: state.selectedData?.id});

  return (
    <Animated.View style={{}}>
      <Text style={{marginLeft: 5}}>
        <Pressable style={styles.breadcrumb} onPress={onBackToRoot}>
          <Text style={styles.breadcrumbText}>all</Text>
          {history.length > 0 ? (
            <Icon
              type="Ionicons"
              name="chevron-forward"
              color="#5BA9EF"
              style={{marginLeft: 10}}
            />
          ) : undefined}
        </Pressable>
        {history.map((o, index) => (
          <Pressable
            key={o.id}
            style={styles.breadcrumb}
            onPress={() => onHistoryPress(index)}>
            <Text style={styles.breadcrumbText}>{o.displayName}</Text>
            {index !== history.length - 1 ? (
              <Icon
                type="Ionicons"
                name="chevron-forward"
                color="#5BA9EF"
                style={{marginLeft: 10}}
              />
            ) : undefined}
          </Pressable>
        ))}
      </Text>
      <Animated.View style={animatedStyle}>
        {state.data.map(o => (
          <Organization
            key={o.id}
            data={o}
            setState={setState}
            state={state}
            setHistory={setHistory}
            history={history}
          />
        ))}
        <AccountContainer
          accounts={accounts?.map(a => ({id: a.id, fullName: a.fullName}))}
          label={'Thành viên ' + state.selectedData?.displayName}
          containerStyle={styles.accountContainer}
        />
      </Animated.View>
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  container: {},
  textLabel: {
    ...globalStyles.text16SemiBold,
  },
  buttonContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  breadcrumb: {
    paddingHorizontal: 5,
    paddingVertical: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  breadcrumbText: {
    ...globalStyles.text13Bold,
    color: '#5BA9EF',
  },
  accountContainer: {
    paddingHorizontal: 10,
    marginTop: 20,
  },
});
export default OrganizationsTree;
