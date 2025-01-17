import auth from './auth/vi';
import title from './title/vi';
import shared from './shared/vi';
import {digitalNoti} from './digital-notification/vi';
import vote from './vote/vi';
import localService from './local-service/vi';
import localServiceManagement from './local-service-management/vi';
import setting from './setting/vi';
import qa from './qa/vi';
import feedback from './feedback/vi';
import administrative from './administrative/vi';
import chat from './chat/vi';
import materialAsset from './material-asset/vi';
import residentLanguage from './resident/vi';
import meter from './water-meter/vi';
import workManagement from './work-management/vi';
import {role} from './role/vi';
import chart from './charts/vi';
const vi = {
  ...title,
  auth,
  shared,
  digitalNoti,
  vote,
  localService,
  localServiceManagement,
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
  operator: 'Vận hành',
  residentLanguage,
  meter,
  workManagement,
  role,
  search: 'Tìm kiếm',
  chart,
};

export default vi;
