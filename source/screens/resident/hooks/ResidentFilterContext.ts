import React, {createContext} from 'react';
import {EResidentFormId} from '../services/resident.model';

export type TFilter = {
  keyword?: string;
  urbanId?: number;
  buildingId?: number;
  apartmentCode?: number;
  formId: EResidentFormId;
};

export const ResidentFilterContext = createContext<{
  filters: TFilter;
  setFilters: React.Dispatch<React.SetStateAction<TFilter>>;
}>({
  filters: {
    keyword: '',
    urbanId: undefined,
    buildingId: undefined,
    apartmentCode: undefined,
    formId: EResidentFormId.ALL,
  },
  setFilters: () => {},
});
