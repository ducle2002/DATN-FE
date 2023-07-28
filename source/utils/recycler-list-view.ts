/* eslint-disable @typescript-eslint/no-unused-vars */
import {DataProvider, LayoutProvider} from 'recyclerlistview';
export const layoutMaker = () =>
  new LayoutProvider(
    index => 0,
    (type, dim) => {},
  );

export const dataProviderMaker = (data: any) =>
  new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(data);
