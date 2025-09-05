import { callFetchArtist, callFetchUser } from "@/services/api";
import { IMeta, IUser } from "@/types/backend";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const fetchArtist = createAsyncThunk(
  "user/fetchArtist",
  async (query: string) => {
    const response = await callFetchArtist(query);
    return response;
  }
);

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (query: string) => {
    const response = await callFetchUser(query);
    return response;
  }
);

interface IState {
  isFetchingArtist: boolean;
  isFetchingUser: boolean;
  metaArtist: IMeta;
  metaUser: IMeta;
  artists: IUser[];
  users: IUser[];
  query: string;
  filter: string;
}

const initMeta = {
  pageNumber: 0,
  pageSize: 0,
  totalPages: 0,
};

const initialState: IState = {
  isFetchingArtist: true,
  isFetchingUser: true,
  metaArtist: initMeta,
  metaUser: initMeta,
  artists: [],
  users: [],
  query: "",
  filter: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    handleChangeQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    handleChangeFilter: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchArtist.pending, (state, action) => {
      state.isFetchingArtist = true;
    });

    builder.addCase(fetchArtist.rejected, (state, action) => {
      state.isFetchingArtist = false;
    });

    builder.addCase(fetchArtist.fulfilled, (state, action) => {
      state.isFetchingArtist = false;
      state.metaArtist.totalPages = action.payload.result.totalPages;
      state.metaArtist.pageSize = action.payload.result.pageSize;
      state.metaArtist.pageNumber = action.payload.result.pageNumber;
      state.artists = action.payload.result.data;
    });

    builder.addCase(fetchUser.pending, (state, action) => {
      state.isFetchingUser = true;
    });

    builder.addCase(fetchUser.rejected, (state, action) => {
      state.isFetchingUser = false;
    });

    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.isFetchingUser = false;
      state.metaUser.totalPages = action.payload.result.totalPages;
      state.metaUser.pageSize = action.payload.result.pageSize;
      state.metaUser.pageNumber = action.payload.result.pageNumber;
      state.users = action.payload.result.data;
    });
  },
});

export const { handleChangeQuery, handleChangeFilter } = userSlice.actions;

export default userSlice.reducer;
