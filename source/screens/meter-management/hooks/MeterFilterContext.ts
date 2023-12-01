import {createContext} from 'react';

export type TFilter = {
  keyword?: string;
  urbanId?: number;
  buildingId?: number;
  apartmentCode?: string;
  fromMonth?: string;
  toMonth?: string;
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
    fromMonth: undefined,
    toMonth: undefined,
  },
  setFilters: () => {},
});
