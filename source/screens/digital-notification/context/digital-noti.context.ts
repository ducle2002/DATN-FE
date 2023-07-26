import {createContext} from 'react';

type ValueContext = {
  selected: Array<Number>;
  select: Function;
  reset: Function;
};
export const SelectNotiContext = createContext<ValueContext>({
  selected: [],
  select: () => {},
  reset: () => {},
});
