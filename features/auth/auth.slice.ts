import { createSlice } from '@reduxjs/toolkit';
import { authService } from './auth.service';
import { RequestState } from '@/store/state';
import { commonCreateAsyncThunk } from '@/store/thunk';

interface AuthState {
  step: 'phone' | 'otp';
  requestState: RequestState;
}

const initialState: AuthState = {
  step: 'phone',
  requestState: { status: 'idle', type: '' }
};

export const sendOtp: any = commonCreateAsyncThunk({ type: 'sendOtp', action: authService.sendOtp });
export const verifyOtp: any = commonCreateAsyncThunk({ type: 'verifyOtp', action: authService.verifyOtp });
export const resendOtp: any = commonCreateAsyncThunk({ type: 'resendOtp', action: authService.resendOtp });

export const login: any = commonCreateAsyncThunk({ type: 'login', action: authService.login });

export const logout: any = commonCreateAsyncThunk({ type: 'logout', action: authService.logout });

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setStep: (state, action) => {
      state.step = action.payload;
    },
    clearAuthState: (state) => {
      state.requestState = { status: 'idle', type: '' };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOtp.fulfilled, (state, action) => {
        const payload = action.payload as any;
        state.requestState = { status: 'completed', type: 'sendOtp', data: payload?.data };
      })
      .addCase(sendOtp.pending, (state) => {
        state.requestState = { status: 'loading', type: 'sendOtp' };
      })
      .addCase(sendOtp.rejected, (state, action) => {
        const payload = action.payload as any;
        state.requestState = { status: 'failed', type: 'sendOtp', error: payload?.message };
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        const payload = action.payload as any;
        state.requestState = { status: 'completed', type: 'verifyOtp', data: payload?.data };
      })
      .addCase(verifyOtp.pending, (state) => {
        state.requestState = { status: 'loading', type: 'verifyOtp' };
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        const payload = action.payload as any;
        state.requestState = { status: 'failed', type: 'verifyOtp', error: payload?.message };
      })
      .addCase(login.fulfilled, (state, action) => {
        const payload = action.payload as any;
        state.requestState = { status: 'completed', type: 'login', data: payload?.data };
      })
      .addCase(login.pending, (state) => {
        state.requestState = { status: 'loading', type: 'login' };
      })
      .addCase(login.rejected, (state, action) => {
        const payload = action.payload as any;
        state.requestState = { status: 'failed', type: 'login', error: payload?.message };
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.requestState = { status: 'completed', type: 'logout' };
      })
      .addCase(logout.pending, (state) => {
        state.requestState = { status: 'loading', type: 'logout' };
      })
      .addCase(logout.rejected, (state, action) => {
        const payload = action.payload as any;
        state.requestState = { status: 'failed', type: 'logout', error: payload?.message };
      })
      .addCase(resendOtp.fulfilled, (state, action) => {
        const payload = action.payload as any;
        state.requestState = { status: 'completed', type: 'resendOtp', data: payload?.data };
      })
      .addCase(resendOtp.pending, (state) => {
        state.requestState = { status: 'loading', type: 'resendOtp' };
      })
      .addCase(resendOtp.rejected, (state, action) => {
        const payload = action.payload as any;
        state.requestState = { status: 'failed', type: 'resendOtp', error: payload?.message };
      });
  },
});

export const { setStep, clearAuthState } = authSlice.actions;
export default authSlice.reducer;