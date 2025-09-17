import { callFetchTrackPaginate } from "@/services/api";
import { IMeta, ITrack } from "@/types/backend";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const fetchTrack = createAsyncThunk(
  "track/fetchTrack",
  async (query: string) => {
    const response = await callFetchTrackPaginate(query);
    return response;
  }
);

interface IState {
  isFetching: boolean;
  isFetchingSingle: boolean;
  meta: IMeta;
  data: ITrack[];
  query: string;
  activeQueueId: string;
  titleFilter: string;
}

const initialState: IState = {
  isFetching: true,
  isFetchingSingle: true,
  meta: {
    pageNumber: 0,
    pageSize: 0,
    totalPages: 0,
  },
  data: [],
  query: "",
  activeQueueId: "",
  titleFilter: "",
};

const trackSlice = createSlice({
  name: "track",
  initialState,
  reducers: {
    handleChangeQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setActiveQueueId: (state, action: PayloadAction<string>) => {
      state.activeQueueId = action.payload;
    },
    handleChangeTitleFilter: (state, action: PayloadAction<string>) => {
      state.titleFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTrack.pending, (state, action) => {
      state.isFetching = true;
    });

    builder.addCase(fetchTrack.rejected, (state, action) => {
      state.isFetching = false;
    });

    builder.addCase(fetchTrack.fulfilled, (state, action) => {
      state.isFetching = false;
      state.meta.totalPages = action.payload.result.totalPages;
      state.meta.pageSize = action.payload.result.pageSize;
      state.meta.pageNumber = action.payload.result.pageNumber;
      state.data = action.payload.result.data;
    });
  },
});

export const { handleChangeQuery, setActiveQueueId, handleChangeTitleFilter } =
  trackSlice.actions;

export default trackSlice.reducer;
