import React from 'react';
import FeedbackIcon from 'assets/icons/feedback.svg';
import NotificationIcon from 'assets/icons/notification.svg';
import ChatIcon from 'assets/icons/chat.svg';
import VoteIcon from 'assets/icons/vote.svg';
import Administrative from 'assets/icons/administrative.svg';
import LocalServiceIcon from 'assets/icons/utilities.svg';

import {SvgProps} from 'react-native-svg';
import {TPermission} from 'types/type';

import Icon from '@/components/icon.component';

import Icon from '@/components/icon.component';

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
    case 'Pages.Management.Question_Answer':
      return (
        <Icon
          type="MaterialCommunityIcons"
          name="chat-question"
          color={'white'}
          size={40}
        />
      );
    case 'Pages.Management.Hotline':
      return (
        <Icon type="Foundation" name="telephone" color={'white'} size={40} />
      );
    case 'Pages.Management.Newsfeed':
      return (
        <Icon
          type="MaterialCommunityIcons"
          name="billboard"
          color={'white'}
          size={40}
        />
      );
    case 'Pages.Services.Local_Amenities.Create_Store':
      return <LocalServiceIcon />;
  }
};

export default HomeIcon;
