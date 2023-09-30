import auth from './auth/vi';
import title from './title/vi';
import shared from './shared/vi';
import {digitalNoti} from './digital-notification/vi';
import vote from './vote/vi';
import localService from './local-service/vi';
import setting from './setting/vi';
import qa from './qa/vi';
import feedback from './feedback/vi';
import administrative from './administrative/vi';
import chat from './chat/vi';
import materialAsset from './material-asset/vi';
import residentLanguage from './resident/vi';
import water from './water-meter/vi';

const vi = {
  ...title,
  auth,
  shared,
  digitalNoti,
  vote,
  localService,
  setting,
  feedback,
  administrative,
  chat,
  qa,
  materialAsset,
  management: 'Ban quản lý số',
  adminis: 'Hành chính / Dịch vụ số',
  service: 'Dịch vụ tiện ích nội khu',
  inventory: 'Quản lý tài sản vật tư',
  residentLanguage,
  water,
};

export default vi;
