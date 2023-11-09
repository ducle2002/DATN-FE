import title from './title/en';
import setting from './setting/en';
import feedback from './feedback/en';
import administrative from './administrative/en';
import chat from './chat/en';
import auth from './auth/en';
import vote from './vote/en';
import shared from './shared/en';
import qa from './qa/en';
import localService from './local-service/en';
import localServiceManagement from './local-service-management/en';

import {digitalNoti} from './digital-notification/en';
import materialAsset from './material-asset/en';
import residentLanguage from './resident/en';
import {role} from './role/en';
const en = {
  ...title,
  setting,
  feedback,
  administrative,
  chat,
  auth,
  vote,
  qa,
  localService,
  localServiceManagement,
  shared,
  digitalNoti,
  materialAsset,
  management: 'Digital Management Office',
  adminis: 'Digital Administration',
  service: 'Internal Amenities Services',
  inventory: 'Asset and Material Management',
  residentLanguage,
  role,
};

export default en;
