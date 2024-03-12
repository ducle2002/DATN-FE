import {TouchableWithoutFeedback, View} from 'react-native';
import React from 'react';
import ReactNativeModal from 'react-native-modal';
import FeedbackInfo from './feedback-info';
import {useQuery} from 'react-query';
import FeedbackApi from '@/modules/feedback/feedback.service';

type Props = {
  onClose: () => void;
  id: number;
  navigation: any;
  isVisible: boolean;
};

const DetailModal = ({onClose, id, navigation, isVisible}: Props) => {
  useQuery({
    queryFn: () => FeedbackApi.setCommentAsRead({feedbackId: id ?? -1}),
    enabled: id > 0,
  });

  const {data: feedback} = useQuery({
    queryKey: ['feedback-detail', id],
    queryFn: () => FeedbackApi.getByID({id: id}),
    enabled: id > 0,
  });

  return (
    <ReactNativeModal
      style={{margin: 0}}
      isVisible={isVisible}
      onBackdropPress={onClose}
      backdropOpacity={0.3}>
      <View
        style={{
          marginTop: 'auto',
        }}>
        {!!feedback && (
          <TouchableWithoutFeedback
            style={{
              backgroundColor: 'white',
            }}>
            <FeedbackInfo
              data={feedback}
              onClickChat={() => {
                if (feedback) {
                  navigation.navigate('ChatFeedbackScreen', {
                    id: id,
                  });
                }
                onClose();
              }}
              onClose={onClose}
            />
          </TouchableWithoutFeedback>
        )}
      </View>
    </ReactNativeModal>
  );
};

export default DetailModal;
