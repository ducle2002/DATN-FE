import {
  EResidentFormId,
  EResidentState,
} from '@/screens/resident/services/resident.model';

const resident = {
  apartmentCode: 'Mã căn hộ',
  buildingCode: 'Mã khu đô thị',
  dateOfBirth: 'Ngày sinh',
  gender: 'Giới tính',
  fullName: 'Họ tên',
  phoneNumber: 'Số điện thoại',
  email: 'Địa chỉ mail',
  identityNumber: 'Số định danh cá nhân',
  relationship: 'Quan hệ với chủ hộ',
  nationality: 'Quốc tịch',
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
};

export default residentLanguage;
