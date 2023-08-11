import {useQueries} from 'react-query';
import QAApi from './qa.service';

export const useQAData = (id: number) => {
  const result = useQueries([
    {
      queryKey: ['question', id],
      queryFn: () => QAApi.getQAById({id}),
    },
  ]);

  return {
    questionQuery: result[0],
  };
};
