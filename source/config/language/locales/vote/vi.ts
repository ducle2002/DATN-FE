const header = {
  create: 'Tạo khảo sát',
  update: 'Thay đổi',
  detail: 'Chi tiết',
};

const create = {
  create: 'Tạo mới',
  update: 'Cập nhật',
  name: 'Tên khảo sát',
  description: 'Mô tả khảo sát',
  time: 'Thời gian khảo sát',
  to: 'Đến',
  options: 'Danh sách lựa chọn',
  add: 'Thêm',
  delete: 'Xóa',
};

const toastNoti = {
  createSuccess: 'Tạo khảo sát thành công',
  createFail: 'Tạo khảo sát thất bại',
  updateSuccess: 'Cập nhật khảo sát thành công',
  updateFail: 'Cập nhật khảo sát thất bại',
  optionRequired: 'Hãy thêm lựa chọn',
};

const main = {
  status: 'Trạng thái',
};

const status = {
  all: 'Tất cả',
  expired: 'Đã kết thúc',
  inProgress: 'Đang diễn ra',
  comming: 'Sắp diễn ra',
};

const detail = {
  name: 'Tên khảo sát',
  description: 'Nội dung',
  scope: 'Phạm vi khảo sát',
  totalVotes: 'Tổng số người đã tham gia',
  timeVote: 'Thời gian khảo sát',
  result: 'Kết quả khảo sát',
  notParticipate: 'Chưa tham gia',
};

const vote = {
  header,
  toastNoti,
  create,
  main,
  status,
  detail,
};

export default vote;
