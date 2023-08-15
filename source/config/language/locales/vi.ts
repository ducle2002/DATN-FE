import auth from './auth/vi';
import title from './title/vi';
import shared from './shared/vi';
import {digitalNoti} from './digital-notification/vi';
import vote from './vote/vi';
import localService from './local-service/vi';
import setting from './setting/vi';
import feedback from './feedback/vi';
import administrative from './administrative/vi';
import chat from './chat/vi';

const vi = {
  auth,
  ...title,
  shared,
  digitalNoti,
  vote,
  localService,
  setting,
  feedback,
  administrative,
  chat,
};

export default vi;
