import {createSlice} from "@reduxjs/toolkit";
import {userService} from "./user.service";
import {commonCreateAsyncThunk} from "@/store/thunk";
import {RequestState} from "@/store/state";

interface UserState {
  user: any;
  requestState: RequestState;
}

const initialState: UserState = {
  user: null,
  requestState: {status: "idle", type: ""},
}

// Giữ nguyên thunk cũ
export const getUserDetails = commonCreateAsyncThunk({ type: "getUserDetails", action: userService.getUserList });

// THÊM MỚI: Định nghĩa fetchUsers (dùng chung service getUserDetails nếu cùng 1 API lấy danh sách)
export const fetchUsers = commonCreateAsyncThunk({ type: "fetchUsers", action: userService.getUserList });

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Xử lý cho getUserDetails (cũ)
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.user = action.payload.data;
        state.requestState = {status: "completed", type: "getUserDetails"};
      })
      .addCase(getUserDetails.pending, (state) => {
        state.requestState = {status: "loading", type: "getUserDetails"};
      })
      .addCase(getUserDetails.rejected, (state) => {
        state.requestState = {status: "failed", type: "getUserDetails"};
      })

      // THÊM MỚI: Xử lý cho fetchUsers
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.user = action.payload.data;
        state.requestState = {status: "completed", type: "fetchUsers"};
      })
      .addCase(fetchUsers.pending, (state) => {
        state.requestState = {status: "loading", type: "fetchUsers"};
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.requestState = {status: "failed", type: "fetchUsers"};
      });
  },
});

export const {
  setUser,
} = userSlice.actions;
export default userSlice.reducer;