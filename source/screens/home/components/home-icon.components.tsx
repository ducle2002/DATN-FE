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

export type HomeIconProp = SvgProps & {
  type: TPermission;
};
const HomeIcon = ({type, ...props}: HomeIconProp) => {
  switch (type) {
    case 'Pages.Digitals.Communications':
      return <ChatIcon {...props} />;
    case 'Pages.Digitals.Notifications.GetAll':
      return <NotificationIcon {...props} />;
    case 'Pages.Digitals.Reflects.GetAll':
      return <FeedbackIcon {...props} />;
    case 'Pages.Digitals.Surveys.GetAll':
      return <VoteIcon {...props} />;
    case 'Pages.AdministrationService.Configurations':
      return <Administrative {...props} />;
    case 'Pages.Digitals.QnA.GetAll':
      return (
        <Icon
          type="MaterialCommunityIcons"
          name="chat-question"
          color={'white'}
          size={40}
        />
      );
    case 'Pages.Digitals.Hotline.GetAll':
      return (
        <Icon type="Foundation" name="telephone" color={'white'} size={40} />
      );
    case 'Pages.Digitals.Forums.GetAll':
      return (
        <Icon
          type="MaterialCommunityIcons"
          name="billboard"
          color={'white'}
          size={40}
        />
      );
    case 'Pages.LocalAmenities.List':
      return <LocalServiceIcon />;
    case 'Pages.Assets.AssetCatalog.GetAll':
      return (
        <Icon type="FontAwesome5" name="toolbox" size={35} color={'white'} />
      );
    case 'Pages.Assets.AssetParameters.GetAll':
      return (
        <Icon type="MaterialIcons" name="inventory" size={35} color={'white'} />
      );
    case 'Pages.Citizen.Verifications.GetAll':
      return <Icon type="Ionicons" name="person" size={35} color={'white'} />;
    case 'Pages.Meter.List.GetAll':
      return (
        <Icon type="Ionicons" name="speedometer" size={35} color={'white'} />
      );
    case 'Pages.Operations.TaskManagement.GetAll':
      return (
        <Icon
          type="MaterialIcons"
          name="assignment"
          size={35}
          color={'white'}
        />
      );
    case 'Pages.LocalService.List':
      return (
        <Icon
          type="MaterialIcons"
          name="design-services"
          size={35}
          color={'white'}
        />
      );
  }
};

export default HomeIcon;
