import axiosClient from '@/utils/axios.client';
import {HOST_SERVER} from '@env';
import {TPagingParams} from 'types/type';
import {
  EQAFormID,
  TAnswer,
  TCreateUpdateCommentParams,
  TQuestion,
} from './qa.model';

class QA {
  endpoint = '/api/services/app/AdminQuestionAnswer/';

  getAllQASocialRequest = async (
    params: TPagingParams & {formId: EQAFormID; keyword: string},
  ) => {
    const url = HOST_SERVER + this.endpoint + 'GetAllQuestionAnswerSocial';
    const {
      data: {result},
    } = await axiosClient.get(url, {params: params});

    return {
      questions: result.data,
      totalCount: result.totalRecords,
    };
  };

  getQAByIdRequest = async (params: {id: number}): Promise<TQuestion> => {
    const url = HOST_SERVER + this.endpoint + 'GetQuestionAnswerById';
    const {
      data: {result},
    } = await axiosClient.get(url, {params: {...params, formId: 1}});
    return result.data;
  };
  getCommentRequest = async (params: {
    forumId: number;
  }): Promise<Array<TAnswer>> => {
    const url = HOST_SERVER + this.endpoint + 'GetAllCommentByQuestionAnswer';
    const {
      data: {result},
    } = await axiosClient.get(url, {params: params});
    return result.data;
  };

  createOrUpdateCommentRequest = async (params: TCreateUpdateCommentParams) => {
    const url =
      HOST_SERVER + this.endpoint + 'CreateOrUpdateCommentQuestionAndAnswer';
    return axiosClient.post(url, params);
  };
}

const QAApi = new QA();

export default QAApi;
