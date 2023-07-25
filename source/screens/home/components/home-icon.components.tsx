import React from 'react';
import FeedbackIcon from 'assets/icons/feedback.svg';
import NotificationIcon from 'assets/icons/notification.svg';
import ChatIcon from 'assets/icons/chat.svg';
import VoteIcon from 'assets/icons/vote.svg';
import Administrative from 'assets/icons/administrative.svg';

import {SvgProps} from 'react-native-svg';
import {TPermission} from 'types/permissions';

export type HomeIconProp = SvgProps & {
  type: TPermission;
};
const HomeIcon = ({type, ...props}: HomeIconProp) => {
  switch (type) {
    case 'Pages.Management.ChatCitizen':
      return <ChatIcon {...props} />;
    case 'Pages.Management.Internal.CityNotifications':
    case 'Pages.Management.Digital.Notices':
      return <NotificationIcon {...props} />;
    case 'Pages.Management.Citizens.Reflects':
      return <FeedbackIcon {...props} />;
    case 'Pages.Management.Citizens.Vote':
      return <VoteIcon {...props} />;
    case 'Pages.Administrative':
      return <Administrative {...props} />;
  }
};

export default HomeIcon;
