import axiosClient from '@/utils/axios.client';

export enum EQueryCaseStatistic {
  ByYear = 1,
  ByMonth = 2,
  ByWeek = 3,
  ByDay = 4,
  Other = 5,
  ByOther = 6,
}

export enum EFormIdStatistic {
  GetAll = 1,
  GetCompleted = 2,
}

export enum EFormGetCitizenId {
  GetAll = 1,
  GetAccepted = 2,
  GetRejected = 3,
  GetNew = 4,
}

export enum EQueryCaseCitizenStatistics {
  ByYear = 1,
  ByMonth = 2,
  ByWeek = 3,
  ByDay = 4,
  ByAgeAndSex = 5,
  ByCareer = 6,
}
export enum EGenderStatistics {
  Female = 1,
  Male = 2,
}
export enum EBillStatusStatistics {
  Processing = 0,
  Complete = 2,
  Cancel = 4,
  Expired = 3,
}

class Statistic {
  endpoint = '/api/services/app/';

  getStatisticsChat = async (params?: {
    organizationUnitId?: number;
    numberRange: number;
    queryCase?: EQueryCaseStatistic;
    formId?: EFormIdStatistic;
  }) => {
    const url =
      this.endpoint +
      'StatisticsOrganizationUnitChat/GetStatisticsChatOrganization';
    const {
      data: {result},
    } = await axiosClient.get(url, {params: params});
    return result;
  };

  getStatisticsReflect = async (params: {
    organizationUnitId?: number;
    numberRange: number;
    formId: EFormIdStatistic;
    queryCase: EQueryCaseStatistic;
  }) => {
    const url =
      this.endpoint + 'AdminCitizenReflect/GetStatisticsCitizenReflect';
    const {
      data: {result},
    } = await axiosClient.get(url, {params: params});
    return result;
  };

  getStatisticsVote = async (params: {
    organizationUnitId?: number;
    numberRange: number;
    formId: EFormIdStatistic;
    queryCase: EQueryCaseStatistic;
  }) => {
    const url = this.endpoint + 'CityVote/GetStatisticsCityVote';
    const {
      data: {result},
    } = await axiosClient.get(url, {params: params});
    return result;
  };

  getStatisticsUser = async (params: {
    numberRange: number;
    queryCase: EQueryCaseStatistic;
  }) => {
    const url = this.endpoint + 'User/GetUserStatistics';
    const {
      data: {result},
    } = await axiosClient.get(url, {params: params});
    return result;
  };

  getStatisticsCitizen = async (params: {
    organizationUnitId?: number;
    numberRange?: number;
    formId?: EFormGetCitizenId;
    queryCase: EQueryCaseCitizenStatistics;
  }) => {
    const url = this.endpoint + 'Citizen/GetAllCitizenStatistic';
    const {
      data: {result},
    } = await axiosClient.get(url, {params: params});
    return result;
  };

  GetStaticCitizen = async (params: {
    sex?: EGenderStatistics;
    queryCase: EQueryCaseCitizenStatistics;
  }) => {
    const url = this.endpoint + 'CitizenTemp/GetStaticCitizen';
    const {
      data: {result},
    } = await axiosClient.get(url, {params: params});
    return result;
  };
  GetApartmentBillStatistics = async (params: {
    organizationUnitId?: number;
    numberRange: number;
    formId?: EFormIdStatistic;
    queryCase: EQueryCaseStatistic;
  }) => {
    const url = this.endpoint + 'StatisticBill/GetApartmentBillStatistics';
    const {
      data: {result},
    } = await axiosClient.get(url, {params: params});
    return result;
  };

  getStatisticsWork = async (params: {
    organizationUnitId?: number;
    numberRange?: number;
    formId?: EFormIdStatistic;
    queryCase?: EQueryCaseStatistic;
    month?: number;
    year?: number;
    userId?: number;
    status?: number;
  }) => {
    const url = this.endpoint + 'Work/GetWorkStatisticGeneral';
    const {
      data: {result},
    } = await axiosClient.get(url, {params: params});
    return result;
  };

  getTotalStatisticUserBill = async (params: {
    UrbanId?: number;
    BuildingId?: number;
    Period?: string;
    FromDay?: string;
    ToDay?: string;
  }) => {
    const url = this.endpoint + 'StatisticBill/GetTotalStatisticUserBill';
    const {
      data: {result},
    } = await axiosClient.get(url, {params: params});
    return result;
  };
}

const StatisticService = new Statistic();
export default StatisticService;
