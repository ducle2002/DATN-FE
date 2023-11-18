import {createContext} from 'react';

export type TFilter = {
  keyword?: string;
  urbanId?: number;
  buildingId?: number;
  apartmentCode?: string;
};

export const MeterFilterContext = createContext<{
  filters: TFilter;
  setFilters: React.Dispatch<React.SetStateAction<TFilter>>;
}>({
  filters: {
    keyword: '',
    urbanId: undefined,
    buildingId: undefined,
    apartmentCode: undefined,
  },
  setFilters: () => {},
});
