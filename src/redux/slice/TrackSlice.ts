import { callFetchTrackById, callFetchTrackPaginate } from "@/services/api";
import { IMeta, ITrack } from "@/types/backend";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const fetchTrack = createAsyncThunk(
  "track/fetchTrack",
  async (query: string) => {
    const response = await callFetchTrackPaginate(query);
    return response;
  }
);

export const fetchTrackById = createAsyncThunk(
  "track/fetchTrackById",
  async (id: string) => {
    const response = await callFetchTrackById(id);
    return response;
  }
);

interface IState {
  isFetching: boolean;
  isFetchingSingle: boolean;
  meta: IMeta;
  data: ITrack[];
  singleTrack: ITrack;
  query: string;
  activeQueueId: string;
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
  singleTrack: {
    id: "",
    title: "",
    artwork: "",
    url: "",
    user: {
      id: "",
      email: "",
      username: "",
      image: "",
    },
  },
  query: "",
  activeQueueId: "",
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

    builder.addCase(fetchTrackById.pending, (state, action) => {
      state.isFetchingSingle = true;
      state.singleTrack = {
        id: "",
        title: "",
        artwork: "",
        url: "",
        user: {
          id: "",
          email: "",
          username: "",
          image: "",
        },
      };
    });

    builder.addCase(fetchTrackById.rejected, (state, action) => {
      state.isFetchingSingle = false;
      state.singleTrack = {
        id: "",
        title: "",
        artwork: "",
        url: "",
        user: {
          id: "",
          email: "",
          username: "",
          image: "",
        },
      };
    });

    builder.addCase(fetchTrackById.fulfilled, (state, action) => {
      if (action.payload && action.payload.result) {
        state.isFetchingSingle = false;
        state.singleTrack = action.payload.result;
      }
    });
  },
});

export const { handleChangeQuery, setActiveQueueId } = trackSlice.actions;

export default trackSlice.reducer;
