import {useQueries} from 'react-query';
import QAApi from './qa.service';

export const useQAData = (id: number) => {
  const result = useQueries([
    {
      queryKey: ['question', id],
      queryFn: () => QAApi.getQAByIdRequest({id}),
    },
    {
      queryKey: ['answer', id],
      queryFn: () => QAApi.getCommentRequest({forumId: id}),
    },
  ]);

  return {
    questionQuery: result[0],
    answerQuery: result[1],
  };
};
