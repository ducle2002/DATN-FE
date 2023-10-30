import {useQuery} from 'react-query';
import BuildingService from './building.service';

export const useListBuilding = ({
  urbanId,
  onSuccessCallback = () => {},
}: {
  urbanId?: number;
  onSuccessCallback?: () => void;
}) => {
  const query = useQuery({
    queryKey: ['buildings', urbanId],
    queryFn: () => BuildingService.getAll({urbanId: urbanId}),
    onSuccess: () => {
      onSuccessCallback();
    },
    staleTime: 180000,
    enabled: !!urbanId,
  });
  return {...query, buildings: query.data?.buildings ?? []};
};
