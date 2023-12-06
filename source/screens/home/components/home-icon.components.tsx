import React from 'react';
import FeedbackIcon from 'assets/icons/feedback.svg';
import NotificationIcon from 'assets/icons/notification.svg';
import ChatIcon from 'assets/icons/chat.svg';
import VoteIcon from 'assets/icons/vote.svg';
import Administrative from 'assets/icons/administrative.svg';
import LocalUtilitiesIcon from 'assets/icons/utilities.svg';
import LocalServiceIcon from '@assets/icons/local-service.svg';
import QnAIcon from '@assets/icons/q&a.svg';
import CitizenIcon from '@assets/icons/citizen-verification.svg';
import TaskManagementIcon from '@assets/icons/task-management.svg';
import AssetIcon from '@assets/icons/asset.svg';
import NewFeedIcon from '@assets/icons/new-feed.svg';
import ChartIcon from '@assets/icons/chart.svg';
import {SvgProps} from 'react-native-svg';
import {TPermission} from 'types/type';
import Icon from '@/components/icon.component';

export type HomeIconProp = SvgProps & {
  type: TPermission;
};
const HomeIcon = ({type, ...props}: HomeIconProp) => {
  switch (type) {
    case 'Pages.Digitals.Communications':
      return <ChatIcon width={35} height={35} {...props} />;
    case 'Pages.Digitals.Notifications.GetAll':
      return <NotificationIcon {...props} />;
    case 'Pages.Digitals.Reflects.GetAll':
      return <FeedbackIcon {...props} />;
    case 'Pages.Digitals.Surveys.GetAll':
      return <VoteIcon width={35} height={35} {...props} />;
    case 'Pages.AdministrationService.Configurations':
      return <Administrative width={35} height={35} {...props} />;
    case 'Pages.Digitals.QnA.GetAll':
      return <QnAIcon color={'white'} width={35} height={35} {...props} />;
    case 'Pages.Digitals.Hotline.GetAll':
      return (
        <Icon type="Foundation" name="telephone" color={'white'} size={40} />
      );
    case 'Pages.Digitals.Forums.GetAll':
      return <NewFeedIcon width={35} height={35} {...props} />;
    case 'Pages.LocalAmenities.List':
      return <LocalUtilitiesIcon width={35} height={35} {...props} />;
    case 'Pages.LocalAmenities.List.GetAll':
      return <LocalServiceIcon width={35} height={35} {...props} />;
    case 'Pages.Assets.AssetCatalog.GetAll':
      return <AssetIcon width={35} height={35} {...props} color={'white'} />;
    case 'Pages.Assets.AssetParameters.GetAll':
      return (
        <Icon type="MaterialIcons" name="inventory" size={35} color={'white'} />
      );
    case 'Pages.Citizen.Verifications.GetAll':
      return <CitizenIcon width={35} height={35} {...props} />;
    case 'Pages.Meter.List.GetAll':
      return (
        <Icon type="Ionicons" name="speedometer" size={35} color={'white'} />
      );
    case 'Pages.Operations.TaskManagement.GetAll':
      return <TaskManagementIcon width={35} height={35} {...props} />;
    case 'Pages.LocalService.List':
      return (
        <Icon
          type="MaterialIcons"
          name="design-services"
          size={35}
          color={'white'}
        />
      );
    case 'Pages.Reporting':
      return <ChartIcon width={35} height={35} />;
  }
};

export default HomeIcon;
