import { callFetchRole } from "@/services/api";
import { IMeta, IRole } from "@/types/backend";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const fetchRole = createAsyncThunk(
  "track/fetchRole",
  async (query: string) => {
    const response = await callFetchRole(query);
    return response;
  }
);

interface IState {
  isFetching: boolean;
  meta: IMeta;
  data: IRole[];
  query: string;
}

const initialState: IState = {
  isFetching: true,
  meta: {
    pageNumber: 0,
    pageSize: 0,
    totalPages: 0,
  },
  query: "",
  data: [],
};

const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    handleChangeQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRole.pending, (state, action) => {
      state.isFetching = true;
    });

    builder.addCase(fetchRole.rejected, (state, action) => {
      state.isFetching = false;
    });

    builder.addCase(fetchRole.fulfilled, (state, action) => {
      state.isFetching = false;
      state.meta.totalPages = action.payload.result.totalPages;
      state.meta.pageSize = action.payload.result.pageSize;
      state.meta.pageNumber = action.payload.result.pageNumber;
      state.data = action.payload.result.data;
    });
  },
});

export const { handleChangeQuery } = roleSlice.actions;

export default roleSlice.reducer;
