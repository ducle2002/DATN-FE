import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

export const useChangePasswordValidator = () => {
  const errorRequiredMess = 'Không được bỏ trống trường này';
  const changePasswordSchema = yup
    .object({
      currentPassword: yup.string().required(errorRequiredMess),
      newPassword: yup.string().required(errorRequiredMess),
      confirmPassword: yup
        .string()
        .required(errorRequiredMess)
        .equals([yup.ref('newPassword')], 'Không khớp với mật khẩu đã nhập'),
    })
    .required();
  return yupResolver(changePasswordSchema);
};
