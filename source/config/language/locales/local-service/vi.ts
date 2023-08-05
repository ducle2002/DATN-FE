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
};

const localService = {
  status,
  booking,
};

export default localService;
