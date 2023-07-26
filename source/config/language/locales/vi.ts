import auth from './auth/vi';
import title from './title/vi';
import shared from './shared/vi';
import {digitalNoti} from './digital-notification/vi';

const vi = {
  auth,
  ...title,
  shared,
  digitalNoti,
};

export default vi;
