import { callFetchArtist } from "@/services/api";
import { IUser } from "@/types/backend";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const fetchArtist = createAsyncThunk(
  "user/fetchArtist",
  async (query: string) => {
    const response = await callFetchArtist(query);
    return response;
  }
);

interface IState {
  isFetchingArtist: boolean;
  metaArtist: {
    pageNumber: number;
    pageSize: number;
    totalPages: number;
  };
  artists: IUser[];
  users: IUser[];
  query: string;
}

const initialState: IState = {
  isFetchingArtist: true,
  metaArtist: {
    pageNumber: 0,
    pageSize: 0,
    totalPages: 0,
  },
  artists: [],
  users: [],
  query: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    handleChangeQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
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
  },
});

export const { handleChangeQuery } = userSlice.actions;

export default userSlice.reducer;
