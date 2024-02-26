import {
  EResidentFormId,
  EResidentState,
} from '@/screens/resident/services/resident.model';

const resident = {
  apartmentCode: 'Mã căn hộ',
  buildingCode: 'Tòa nhà',
  dateOfBirth: 'Ngày sinh',
  gender: 'Giới tính',
  fullName: 'Họ tên',
  phoneNumber: 'Số điện thoại',
  email: 'Địa chỉ mail',
  identityNumber: 'Số định danh cá nhân',
  relationship: 'Quan hệ với chủ hộ',
  nationality: 'Quốc tịch',
  residentInformation: 'Thông tin cư dân khai báo',
  urban: 'Khu đô thị',
  building: 'Tòa nhà',
  identityImages: 'Hình ảnh CCCD',
  homeAddress: 'Quê quán',
};

const relationship: {[key: number]: string} = {
  1: 'Chủ hộ',
  2: 'Vợ',
  3: 'Chồng',
  4: 'Con gái',
  5: 'Con trai',
  6: 'Cùng gia đình',
  7: 'Cha',
  8: 'Mẹ',
  9: 'Ông',
  10: 'Bà',
  11: 'Khách',
};
const formId = {
  [EResidentFormId.ALL]: 'Tất cả',
  [EResidentFormId.NEW]: 'Mới',
  [EResidentFormId.CANCELLED]: 'Đã hủy',
  [EResidentFormId.MUST_EDIT]: 'Yêu cầu chỉnh sửa',
  [EResidentFormId.VERIFIED]: 'Đã xác minh',
};

const state = {
  [EResidentState.CANCELLED]: 'Đã hủy',
  [EResidentState.MATCHED]: 'Đã khớp',
  [EResidentState.MISS_MATCHED]: 'Không khớp',
  [EResidentState.MUST_EDIT]: 'Yêu cầu chỉnh sửa',
  [EResidentState.NEW]: 'Mới tạo',
  [EResidentState.VERIFIED]: 'Đã xác minh',
};

const residentLanguage = {
  resident,
  state,
  formId,
  relationship,
};

export default residentLanguage;
