import { callFetchGlobalPlaylist, callFetchUserPlaylist } from "@/services/api";
import { IMeta, IPlaylist } from "@/types/backend";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const fetchGlobalPlaylist = createAsyncThunk(
  "playlist/fetchGlobalPlaylist",
  async () => {
    const response = await callFetchGlobalPlaylist();
    return response;
  }
);

export const fetchUserPlaylist = createAsyncThunk(
  "playlist/fetchUserPlaylist",
  async (query: string) => {
    const response = await callFetchUserPlaylist(query);
    return response;
  }
);

interface IState {
  isFetchingGlobal: boolean;
  isFetchingUser: boolean;
  globalPlaylist: IPlaylist[];
  userPlaylist: IPlaylist[];
  metaUser: IMeta;
  filter: string;
  modalVisible: boolean;
  isDelete: boolean;
  deletePlaylistIds: string[];
  dataInit: IPlaylist;
}

const initialState: IState = {
  isFetchingGlobal: true,
  isFetchingUser: true,
  globalPlaylist: [],
  userPlaylist: [],
  filter: "",
  metaUser: {
    pageNumber: 0,
    pageSize: 0,
    totalPages: 0,
  },
  modalVisible: false,
  isDelete: false,
  deletePlaylistIds: [],
  dataInit: {
    id: "",
    name: "",
    track: [],
  },
};

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    handleChangeFilter: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
    },
    setModalVisible: (state, action: PayloadAction<boolean>) => {
      state.modalVisible = action.payload;
    },
    setIsDelete: (state, action: PayloadAction<boolean>) => {
      state.isDelete = action.payload;
    },
    setDeletePlaylistIds: (state, action: PayloadAction<string[]>) => {
      state.deletePlaylistIds = action.payload;
    },
    setDataInit: (state, action: PayloadAction<IPlaylist>) => {
      state.dataInit.id = action.payload.id;
      state.dataInit.name = action.payload.name;
      state.dataInit.track = action.payload.track;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGlobalPlaylist.pending, (state, action) => {
      state.isFetchingGlobal = true;
    });

    builder.addCase(fetchGlobalPlaylist.rejected, (state, action) => {
      state.isFetchingGlobal = false;
    });

    builder.addCase(fetchGlobalPlaylist.fulfilled, (state, action) => {
      state.isFetchingGlobal = false;
      state.globalPlaylist = action.payload.result;
    });

    builder.addCase(fetchUserPlaylist.pending, (state, action) => {
      state.isFetchingUser = true;
    });

    builder.addCase(fetchUserPlaylist.rejected, (state, action) => {
      state.isFetchingUser = false;
    });

    builder.addCase(fetchUserPlaylist.fulfilled, (state, action) => {
      state.isFetchingUser = false;
      state.metaUser.totalPages = action.payload.result.totalPages;
      state.metaUser.pageSize = action.payload.result.pageSize;
      state.metaUser.pageNumber = action.payload.result.pageNumber;
      state.userPlaylist = action.payload.result.data;
    });
  },
});

export const {
  handleChangeFilter,
  setModalVisible,
  setDeletePlaylistIds,
  setIsDelete,
  setDataInit,
} = playlistSlice.actions;

export default playlistSlice.reducer;
