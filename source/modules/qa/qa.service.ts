import axiosClient from '@/utils/axios.client';
import {HOST_SERVER} from '@env';
import {TPagingParams} from 'types/type';
import {EQAFormID, TQuestion} from './qa.model';

class QA {
  endpoint = '/api/services/app/AdminQuestionAnswer/';

  getAllQASocial = async (params: TPagingParams & {formId: EQAFormID}) => {
    const url = HOST_SERVER + this.endpoint + 'GetAllQuestionAnswerSocial';
    const {
      data: {result},
    } = await axiosClient.get(url, {params: params});

    return {
      questions: result.data,
      totalCount: result.totalRecords,
    };
  };

  getQAById = async (params: {id: number}): Promise<TQuestion> => {
    const url = HOST_SERVER + this.endpoint + 'GetQuestionAnswerById';
    const {
      data: {result},
    } = await axiosClient.get(url, {params: {...params, formId: 1}});
    return result.data;
  };
}

const QAApi = new QA();

export default QAApi;
