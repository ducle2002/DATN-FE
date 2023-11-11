import {STATUS_ORDER_LOCAL_SERVICE} from './local-service-management.model';

export const chipWithStatus = (status: number) => {
  switch (status) {
    case STATUS_ORDER_LOCAL_SERVICE.PENDING:
      return {
        label: 'Mới tạo',
        txtColor: 'rgb(108, 115, 127)',
        color: 'rgba(108, 115, 127, 0.1)',
      };
    case STATUS_ORDER_LOCAL_SERVICE.ACCEPT:
      return {
        label: 'Tiếp nhận',
        txtColor: 'rgb(247, 144, 9)',
        color: 'rgba(247, 144, 9, 0.1)',
      };
    case STATUS_ORDER_LOCAL_SERVICE.PROCESSING:
      return {
        label: 'Đang thực hiện',
        txtColor: '#0288d1',
        color: 'rgba(2, 136, 209, 0.1)',
      };
    case STATUS_ORDER_LOCAL_SERVICE.EXCHANGE:
      return {
        label: 'Đang trao đổi',
        txtColor: 'rgb(29, 78, 137)',
        color: 'rgba(29, 78, 137, 0.1)',
      };
    case STATUS_ORDER_LOCAL_SERVICE.UNPAID:
      return {
        label: 'Chưa thanh toán',
        txtColor: 'rgb(247, 144, 9)',
        color: 'rgba(247, 144, 9, 0.1)',
      };
    case STATUS_ORDER_LOCAL_SERVICE.COMPLETE:
      return {
        label: 'Đã hoàn thành',
        txtColor: 'rgb(16, 185, 129)',
        color: 'rgba(16, 185, 129, 0.1)',
      };
    case STATUS_ORDER_LOCAL_SERVICE.CANCEL:
      return {
        label: 'Đã hủy',
        txtColor: 'rgb(240, 68, 56)',
        color: 'rgba(240, 68, 56, 0.1)',
      };
    default:
      return {
        label: 'Đang cập nhật',
        txtColor: '#333',
        color: 'rgba(108, 115, 127, 0.1)',
      };
  }
};
