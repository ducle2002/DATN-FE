import {TPermission} from 'types/type';

export const residentManagementFunction: Array<TPermission> = [
  'Pages.Citizen.Verifications.GetAll',
];

export const serviceFunction: Array<TPermission> = [
  'Pages.LocalAmenities.List',
];

export const administrativeFunction: Array<TPermission> = [
  'Pages.AdministrationService.Configurations',
  'Pages.Citizen.Verifications.GetAll',
];

export const managementFunction: Array<TPermission> = [
  'Pages.Digitals.Notifications.GetAll',
  'Pages.Digitals.Reflects.GetAll',
  'Pages.Digitals.Forums.GetAll',
  'Pages.Digitals.Communications',
  'Pages.Digitals.Surveys.GetAll',
  'Pages.Digitals.QnA.GetAll',
  'Pages.Digitals.Hotline.GetAll',
];
export const operatorFunction: Array<TPermission> = [
  'Pages.Operations.TaskManagement.GetAll',
  'Pages.Assets.AssetCatalog.GetAll',
  'Pages.Meter.List.GetAll',
];

export const residentFunction: Array<TPermission> = [];

export const appFeatures: TPermission[] = [
  'Pages.Digitals.Notifications.GetAll',
  'Pages.Digitals.Reflects.GetAll',
  'Pages.Digitals.Surveys.GetAll',
  'Pages.Digitals.Communications',
  'Pages.Digitals.QnA.GetAll',
  'Pages.Digitals.Hotline.GetAll',
  'Pages.LocalAmenities.List',
  'Pages.AdministrationService.Configurations',
  'Pages.Citizen.Verifications.GetAll',
  'Pages.Operations.TaskManagement.GetAll',
  'Pages.Assets.AssetCatalog.GetAll',
  'Pages.LocalAmenities.List.GetAll',
  'Pages.Digitals.Forums.GetAll',
  'Pages.Meter.List.GetAll',
];
