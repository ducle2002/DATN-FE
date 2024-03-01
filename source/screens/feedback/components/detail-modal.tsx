import {TouchableWithoutFeedback, View} from 'react-native';
import React from 'react';
import ReactNativeModal from 'react-native-modal';
import FeedbackInfo from './feedback-info';
import {TFeedback} from '@/modules/feedback/feedback.model';
import {useQuery} from 'react-query';
import FeedbackApi from '@/modules/feedback/feedback.service';

type Props = {
  onClose: () => void;
  feedback?: TFeedback;
  navigation: any;
  isVisible: boolean;
};

const DetailModal = ({onClose, feedback, navigation, isVisible}: Props) => {
  useQuery({
    queryFn: () =>
      FeedbackApi.setCommentAsRead({feedbackId: feedback?.id ?? -1}),
    enabled: !!feedback,
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
                    inforFeedback: feedback,
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
