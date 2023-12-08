import {EnumTypeStatistic} from '@/modules/statistic/statistic.model';

export const TYPE_STATISTIC = [
  {
    name: 'Thống kê thu chi',
    hint: 'Thống kê thu chi , công nợ , hóa đơn',
    type: EnumTypeStatistic.Invoice,
  },
  {
    name: 'Thống kê vật tư - tài sản ',
    hint: 'công cụ dụng cụ, vật tư, tồn kho',
    type: EnumTypeStatistic.Asset,
  },
  {
    name: 'Thống kê công việc - kế hoạch',
    hint: 'Loại công việc: Tuần tra giám sát',
    type: EnumTypeStatistic.WorkManagement,
  },
  {
    name: 'Thống kê doanh thu dịch vụ ',
    hint: 'Mảng kinh doanh dịch vụ riêng,  chi, công nợ ',
    type: EnumTypeStatistic.LocalService,
  },
  {
    name: 'Thống kê cư dân',
    hint: 'Loại công việc: Tuần tra giám sát',
    type: EnumTypeStatistic.Citizen,
  },
  {
    name: 'Thống kê phương tiện',
    hint: 'Loại công việc: Tuần tra giám sát',
    type: EnumTypeStatistic.Vehicle,
  },
  {
    name: 'Thống kê phản ánh',
    hint: 'Thống kê thu chi , công nợ , hóa đơn',
    type: EnumTypeStatistic.CitizenReflect,
  },
  {
    name: 'Thống kê báo cáo ',
    hint: 'Thống kê thu chi , công nợ , hóa đơn',
    type: EnumTypeStatistic.Report,
  },
];
