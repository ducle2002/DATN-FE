import * as yup from 'yup';

export const schemaLogTime = yup.object().shape({
  workId: yup.number().required('Trường này không được bỏ trống'),
  workDetailId: yup.number().required('Trường này không được bỏ trống'),
  dateStart: yup.string().required('Trường này không được bỏ trống'),
  dateFinish: yup.string().required('Trường này không được bỏ trống'),
  userId: yup.number().required('Trường này không được bỏ trống'),
  note: yup.string().nullable(),
  imageUrls: yup.array().of(yup.mixed()).required('Cần tải lên minh chứng ảnh'),
});
export const schemaAttachLogTime = yup.object().shape({
  note: yup.string().nullable(),
  imageUrls: yup.array().required('Cần tải lên minh chứng ảnh'),
});
