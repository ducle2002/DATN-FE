import {useQuery} from 'react-query';
import ApartmentService from './apartment.service';

export const useListApartments = ({
  urbanId,
  buildingId,
  onSuccessCallback = () => {},
}: {
  urbanId?: number;
  buildingId?: number;
  onSuccessCallback?: () => void;
}) => {
  const query = useQuery({
    queryKey: ['apartment', urbanId, buildingId],
    queryFn: () =>
      ApartmentService.getAllApartment({
        maxResultCount: 1000,
        urbanId: urbanId,
        buildingId: buildingId,
      }),
    onSuccess: () => {
      onSuccessCallback();
    },
    staleTime: 180000,
    enabled: !!urbanId,
  });

  return {...query, apartments: query.data?.apartments ?? []};
};
