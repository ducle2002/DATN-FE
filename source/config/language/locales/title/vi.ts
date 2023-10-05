import {TPermission} from 'types/type';

const title: {[key in TPermission]?: string} = {
  'Pages.Digitals.Notifications.GetAll': 'Thông báo số',
  'Pages.Digitals.Reflects.GetAll': 'Phản ánh số',
  'Pages.Digitals.Surveys.GetAll': 'Khảo sát số',
  'Pages.Digitals.Forums.GetAll': 'Quản trị bảng tin',
  'Pages.Digitals.Communications': 'Giao tiếp số',
  'Pages.Digitals.QnA.GetAll': 'Hỏi đáp',
  'Pages.Digitals.Hotline.GetAll': 'Hotline',
  'Pages.AdministrationService.Configurations': 'Hành chính số',
  'Pages.Assets.AssetCatalog.GetAll': 'Danh mục tài sản',
  'Pages.Assets.AssetParameters.GetAll': 'Danh phân loại',
  'Pages.Citizen.Verifications.GetAll': 'Xác minh cư dân',
  'Pages.LocalAmenities.List': 'Tiện ích',
};

export default title;
