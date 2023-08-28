import {TPermission} from 'types/type';

export const communicateFunction: Array<TPermission> = [
  'Pages.Management.ChatCitizen',
  'Pages.Management.Digital.Notices',
  'Pages.Management.Hotline',
];

export const residentManagementFunction: Array<TPermission> = [
  'Pages.Management.Question_Answer',
  'Pages.Management.Newsfeed',
  'Pages.Management.Citizens.Vote',
  'Pages.Management.Citizens.Reflects',
];

export const serviceFunction: Array<TPermission> = [
  'Pages.Administrative',
  'Pages.Services.Local_Amenities.Create_Store',
];
