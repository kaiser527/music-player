import { callFetchPermission } from "@/services/api";
import { IMeta, IPermission } from "@/types/backend";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const fetchPermission = createAsyncThunk(
  "permission/fetchPermission",
  async (query: string) => {
    const response = await callFetchPermission(query);
    return response;
  }
);

interface IState {
  isFetching: boolean;
  meta: IMeta;
  data: IPermission[];
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

const permissionSlice = createSlice({
  name: "permission",
  initialState,
  reducers: {
    handleChangeQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPermission.pending, (state, action) => {
      state.isFetching = true;
    });

    builder.addCase(fetchPermission.rejected, (state, action) => {
      state.isFetching = false;
    });

    builder.addCase(fetchPermission.fulfilled, (state, action) => {
      state.isFetching = false;
      state.meta.totalPages = action.payload.result.totalPages;
      state.meta.pageSize = action.payload.result.pageSize;
      state.meta.pageNumber = action.payload.result.pageNumber;
      state.data = action.payload.result.data;
    });
  },
});

export const { handleChangeQuery } = permissionSlice.actions;

export default permissionSlice.reducer;
