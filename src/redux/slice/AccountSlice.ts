import { IUser } from "@/types/backend";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { callFetchAccount } from "services/api";

export const fetchAccount = createAsyncThunk(
  "account/fetchAccount",
  async () => {
    const response = await callFetchAccount();
    return response.result;
  }
);

interface IState {
  isAuthenticated: boolean;
  isLoading: boolean;
  isRefreshToken: boolean;
  errorRefreshToken: string;
  user: IUser;
}

const user = {
  id: "",
  email: "",
  username: "",
  image: "",
  role: {
    name: "",
    description: "",
    isActive: false,
    permission: [],
  },
  track: [],
  playlist: [],
};

const initialState: IState = {
  isAuthenticated: false,
  isLoading: true,
  isRefreshToken: false,
  errorRefreshToken: "",
  user,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setUserLoginInfo: (state, action: PayloadAction<IUser>) => {
      state.isAuthenticated = true;
      state.isLoading = false;
      state.user.id = action?.payload?.id;
      state.user.email = action.payload.email;
      state.user.image = action?.payload?.image;
      state.user.accountType = action?.payload?.accountType;
      state.user.username = action?.payload?.username;
      state.user.role = action?.payload?.role;
      state.user.role.permission = action?.payload?.role?.permission;
      state.user.track = action?.payload?.track;
      state.user.playlist = action?.payload?.playlist;
    },
    setLogoutAction: (state, action) => {
      AsyncStorage.removeItem("access_token");
      state.isAuthenticated = false;
      state.user = user;
    },
    resetAccountState: (state) => {
      state.isRefreshToken = true;
    },
    setRefreshTokenAction: (state, action) => {
      state.isRefreshToken = action.payload?.status ?? false;
      state.errorRefreshToken = action.payload?.message ?? "";
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAccount.pending, (state, action) => {
      if (action.payload) {
        state.isAuthenticated = false;
        state.isLoading = true;
      }
    });

    builder.addCase(fetchAccount.fulfilled, (state, action) => {
      if (action.payload) {
        state.isAuthenticated = true;
        state.isLoading = false;
        state.user.id = action?.payload?.user?.id;
        state.user.email = action.payload.user?.email;
        state.user.accountType = action?.payload?.user?.accountType;
        state.user.username = action?.payload?.user?.username;
        state.user.image = action.payload.user?.image;
        state.user.role = action?.payload?.user?.role;
        state.user.role.permission = action?.payload?.user?.role?.permission;
        state.user.track = action?.payload?.user?.track;
        state.user.playlist = action?.payload?.user?.playlist;
      }
    });

    builder.addCase(fetchAccount.rejected, (state, action) => {
      if (action.payload) {
        state.isAuthenticated = false;
        state.isLoading = false;
      }
    });
  },
});

export const {
  resetAccountState,
  setRefreshTokenAction,
  setUserLoginInfo,
  setLogoutAction,
} = accountSlice.actions;

export default accountSlice.reducer;
