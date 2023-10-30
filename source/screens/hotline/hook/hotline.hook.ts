import {useMutation, useQueryClient} from 'react-query';
import HotlineService from '../services/hotline.service';

export const useCreateOrUpdateHotLine = ({
  onSuccessCallback = () => {},
}: {
  onSuccessCallback?: () => void;
}) => {
  const queryClient = useQueryClient();
  const query = useMutation({
    mutationFn: (params: any) => HotlineService.createOrUpdate(params),
    onSuccess: () => {
      queryClient.refetchQueries(['hotline']).then(() => {
        onSuccessCallback();
      });
    },
  });
  return query;
};

export const useDeleteHotline = ({
  onSuccessCallback = () => {},
}: {
  onSuccessCallback?: () => void;
}) => {
  const queryClient = useQueryClient();
  const query = useMutation({
    mutationFn: (id: number) => HotlineService.delete({id: id}),
    onSuccess: () => {
      queryClient.refetchQueries(['hotline']).then(() => {
        onSuccessCallback();
      });
    },
  });
  return query;
};
