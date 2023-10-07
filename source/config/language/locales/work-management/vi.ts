import {EWorkStatus} from '@/screens/work-management/services/work.model';

const status = {
  [EWorkStatus.TO_DO]: 'Cần làm',
  [EWorkStatus.CANCELED]: 'Đã hủy',
  [EWorkStatus.COMPLETE]: 'Hoàn thành',
  [EWorkStatus.DOING]: 'Đang làm',
  [EWorkStatus.OVERDUE]: 'Quá hạn',
};

const work = {
  content: 'Nội dung',
  creationTime: 'Thời gian tạo',
  dateExpected: 'Kết thúc mong muốn',
  dateFinish: 'Kết thúc',
  dateStart: 'Bắt đầu',
  note: 'Ghi chú',
  status: 'trạng thái',
  title: 'Tiêu đề',
  workTypeId: 'Loại công việc',
  listWorkDetail: 'Danh sách công việc',
  workHistories: 'Lịch sử công việc',
  workLogTimes: 'Log time',
  recipientUsers: 'Người thực hiện',
  supervisorUsers: 'Người giám sát',
};

const header = {
  create: 'Tạo công việc',
  management: 'Quản lý công việc',
  logtime: 'Log time',
  create_log_time: 'Tạo log time',
};

const workManagement = {
  status,
  work,
  header,
};

export default workManagement;
