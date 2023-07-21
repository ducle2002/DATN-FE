import React from 'react';
import FeedbackIcon from 'assets/icons/feebback.svg';
import NotificationIcon from 'assets/icons/notification.svg';
import ChatIcon from 'assets/icons/chat.svg';
import {SvgProps} from 'react-native-svg';
import {permissionsType} from 'types/permissions';

export type HomeIconProp = SvgProps & {
  type: permissionsType;
};
const HomeIcon = ({type, ...props}: HomeIconProp) => {
  switch (type) {
    case 'Pages.Management.ChatCitizen':
      return <ChatIcon {...props} />;
    case 'Pages.Management.Internal.CityNotifications':
      return <NotificationIcon {...props} />;
    case 'Pages.Management.Citizens.Reflects':
      return <FeedbackIcon {...props} />;
  }
};

export default HomeIcon;
