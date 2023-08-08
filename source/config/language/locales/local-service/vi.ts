const status: {[key: string]: string} = {
  all: 'Tất cả',
  expired: 'Hết hạn',
  requesting: 'Mới',
  accepted: 'Đã chấp nhận',
  cancel: 'Đã hủy',
  complete: 'Đã hoàn thành',
  denied: 'Đã từ chối',
};

const booking = {
  creationTime: 'Thời gian tạo',
  customerName: 'Tên khách hàng',
  customerPhoneNumber: 'Số điện thoại',
  buildingCode: 'Mã căn hộ',
  address: 'Địa chỉ',
  bookingDate: 'Ngày đặt',
  bookingTime: 'Thời gian đặt',
  refuseReason: 'Lý do hủy',
  service: 'Dịch vụ',
};

const localService = {
  status,
  booking,
};

export default localService;
