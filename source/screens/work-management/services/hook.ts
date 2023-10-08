import {useQuery} from 'react-query';
import WorkTypeApi from './work-type.service';

export const useWorkType = () => {
  const {data} = useQuery({
    queryKey: ['work-type'],
    queryFn: () => WorkTypeApi.getAllNotPaging(),
  });

  return {...data};
};
