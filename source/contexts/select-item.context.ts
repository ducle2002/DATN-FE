import {createContext} from 'react';

type ValueContext = {
  selected: Array<number>;
  select: Function;
  reset: Function;
};

export const SelectItemContext = createContext<ValueContext>({
  selected: [],
  select: () => {},
  reset: () => {},
});
