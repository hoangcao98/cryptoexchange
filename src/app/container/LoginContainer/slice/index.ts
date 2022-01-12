import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { loginSaga } from './saga';
import { LoginState } from './types';
import { authService } from 'services/authService';

export const initialState: LoginState = {
  responseLogin: {},
  data: {},
  stepLogin: 1,
  openSuccessToast: false,
  openErrorToast: false,
  messageError: '',
  openFinishToast: false,
};

const slice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    loginRequest(state, action: PayloadAction<any>) {},
    loginSuccess(state, action) {
      state.responseLogin = action.payload;
    },
    loginFail(state, action) {},
    handleStepLogin(state, action) {
      state.stepLogin = action.payload;
    },
    handleOpenSuccessToast(state, action) {
      state.openSuccessToast = action.payload;
    },
    handleOpenErrorToast(state, action) {
      state.openErrorToast = action.payload;
    },
    handleMessageError(state, action) {
      state.messageError = action.payload;
    },
    // VerifyEmailLogin
    verifyEmailLoginRequest(state, action: PayloadAction<any>) {},
    verifyEmailLoginSuccess(state, action) {
      state.data = action.payload;
      localStorage.setItem('access_token', action.payload.access_token);
      authService.autoRefreshAccessToken();
    },
    verifyEmailLoginFail(state, action) {},
    handleOpenFinishToast(state, action) {
      state.openFinishToast = action.payload;
    },
  },
});

export const { actions: loginActions } = slice;

export const useLoginSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: loginSaga });
  return { actions: slice.actions };
};
