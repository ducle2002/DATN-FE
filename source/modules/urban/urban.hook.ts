import {useQuery} from 'react-query';
import UrbanService from './urban.service';

interface Props {
  onSuccessCallback?: () => void;
}

export const useAllUrban = ({onSuccessCallback = () => {}}: Props) => {
  const query = useQuery({
    queryKey: ['all-urban'],
    queryFn: () => UrbanService.getAll({maxResultCount: 1000}),
    onSuccess: () => {
      onSuccessCallback();
    },
    staleTime: 180000,
  });

  return query;
};
