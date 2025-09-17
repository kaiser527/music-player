import { IUser } from "@/types/backend";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { callFetchAccount } from "services/api";

export const fetchAccount = createAsyncThunk(
  "account/fetchAccount",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await callFetchAccount();
      return response.result;
    } catch (err: any) {
      if (err?.type === "REFRESH_FAILED") {
        dispatch(
          setRefreshTokenAction({
            status: true,
            message: "An error occurred while refreshing token",
          })
        );
      }
      return rejectWithValue(err);
    }
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
    },
    setLogoutAction: (state, action) => {
      AsyncStorage.multiRemove(["access_token", "refresh_token"]);
      state.isAuthenticated = false;
      state.user = user;
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

export const { setRefreshTokenAction, setUserLoginInfo, setLogoutAction } =
  accountSlice.actions;

export default accountSlice.reducer;
