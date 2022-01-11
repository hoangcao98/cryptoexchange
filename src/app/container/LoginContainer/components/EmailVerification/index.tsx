import {
  SubTitle,
  Input,
  ConfirmCodeButton,
  Title,
  Description,
  ErrorMessage,
} from './style';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginSlice } from '../../slice';
import { useEffect } from 'react';
import { selectLogin } from '../../slice/selectors';
//declare type
type UserSubmitForm = {
  code: string;
};
const EmailVerification = ({ email }) => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { actions } = useLoginSlice();
  const dataLogin: any = useSelector(selectLogin);
  //Validate
  const validation = Yup.object().shape({
    code: Yup.string()
      .required('Invalid code')
      .min(6, 'Must be exactly 6 digits')
      .max(6, 'Must be exactly 6 digits'),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSubmitForm>({
    resolver: yupResolver(validation),
  });
  // submit form
  const onSubmitVerify = (data: any) => {
    dispatch(
      actions.verifyEmailLoginRequest({
        ...data,
        email,
      }),
    );
  };
  useEffect(() => {
    if (dataLogin.openFinishToast) {
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataLogin.openFinishToast]);
  return (
    <>
      <Title>Security verification</Title>
      <Description>
        To secure your account, please complete the following verification.
      </Description>
      <SubTitle>Email Verification Code</SubTitle>
      <form onSubmit={handleSubmit(onSubmitVerify)}>
        <div>
          <Input
            data-status={errors.code?.message ? 'error' : 'normal'}
            type="text"
            placeholder="Enter your code"
            {...register('code')}
          />
        </div>
        <ErrorMessage>{errors.code?.message}</ErrorMessage>
        <ConfirmCodeButton id="submit_verification" type="submit">
          Confirm
        </ConfirmCodeButton>
      </form>
    </>
  );
};
export default EmailVerification;
