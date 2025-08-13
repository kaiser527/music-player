import { ITrack } from "@/types/backend";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IState {
  track: ITrack[];
  filter: string;
  isFavoriteQueue: boolean;
}

const initialState: IState = {
  track: [],
  filter: "",
  isFavoriteQueue: false,
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    handleChangeFilter: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
    },
    handleAddTrack: (state, action: PayloadAction<ITrack>) => {
      const index = state.track.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index === -1) {
        state.track.push(action.payload);
      }
    },
    handleRemoveTrack: (state, action: PayloadAction<ITrack>) => {
      const index = state.track.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index > -1) {
        state.track = state.track.filter(
          (item) => item.id !== action.payload.id
        );
      }
    },
    setIsFavoriteQueue: (state, action: PayloadAction<boolean>) => {
      state.isFavoriteQueue = action.payload;
    },
  },
});

export const {
  handleChangeFilter,
  setIsFavoriteQueue,
  handleAddTrack,
  handleRemoveTrack,
} = favoriteSlice.actions;

export default favoriteSlice.reducer;
