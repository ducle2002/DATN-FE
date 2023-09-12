import {TPermission} from 'types/type';

export const residentManagementFunction: Array<TPermission> = [
  'Pages.Management.Question_Answer',

  'Pages.Management.Citizens.Vote',
];

export const serviceFunction: Array<TPermission> = [
  'Pages.Services.Local_Amenities.Create_Store',
];

export const administrativeFunction: Array<TPermission> = [
  'Pages.Administrative',
];

export const managementFunction: Array<TPermission> = [
  'Pages.Management.Digital.Notices',
  'Pages.Management.Citizens.Reflects',
  'Pages.Management.Newsfeed',
  'Pages.Management.ChatCitizen',
  'Pages.Management.Citizens.Vote',
  'Pages.Management.Question_Answer',
  'Pages.Management.Hotline',
];
export const operatorFunction: Array<TPermission> = [
  'Pages.SmartCommunity.OperationManagement.Material',
  'Pages.SmartCommunity.OperationManagement.MaterialCategory',
];
