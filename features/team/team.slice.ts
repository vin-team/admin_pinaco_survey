import {createSlice} from "@reduxjs/toolkit";
import {teamService} from "./team.service";
import {commonCreateAsyncThunk} from "@/store/thunk";
import {RequestState} from "@/store/state";

interface TeamState {
  team: any;
  requestState: RequestState;
}

const initialState: TeamState = {
  team: null,
  requestState: {status: "idle", type: ""},
}

// Giữ nguyên thunk cũ
export const getTeamDetails = commonCreateAsyncThunk({ type: "getTeamDetails", action: teamService.getTeamList });

// THÊM MỚI: Định nghĩa fetchUsers (dùng chung service getTeamDetails nếu cùng 1 API lấy danh sách)
export const fetchUsers = commonCreateAsyncThunk({ type: "fetchUsers", action: teamService.getTeamList });

const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {
    setTeam: (state, action) => {
      state.team = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Xử lý cho getTeamDetails (cũ)
      .addCase(getTeamDetails.fulfilled, (state, action) => {
        state.team = action.payload.data;
        state.requestState = {status: "completed", type: "getTeamDetails"};
      })
      .addCase(getTeamDetails.pending, (state) => {
        state.requestState = {status: "loading", type: "getTeamDetails"};
      })
      .addCase(getTeamDetails.rejected, (state) => {
        state.requestState = {status: "failed", type: "getTeamDetails"};
      })

      // THÊM MỚI: Xử lý cho fetchUsers
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.team = action.payload.data;
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
  setTeam,
} = teamSlice.actions;
export default teamSlice.reducer;